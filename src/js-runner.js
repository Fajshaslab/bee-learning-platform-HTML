/* JavaScript practice runtime: display only, NEVER an assessment authority.
   All student code runs inside sandbox.html with an opaque origin. */
let current = null
let count = 0
const MAX_SOURCE = 100000
const MAX_MESSAGES = 80
export const DOM_LESSONS = new Set(['m7-l3', 'm7-l4', 'm8-l3'])
export function runMode(lesson, files) {
  return DOM_LESSONS.has(lesson?.id) || /\b(?:document|window|addEventListener|alert)\b/.test(String(files?.js ?? '')) ? 'dom' : 'worker'
}
export function stopJavaScript({clear=false}={}) {
  if (!current) return
  clearTimeout(current.timer)
  const {frame, output} = current
  current = null
  frame.onload = null
  // Navigating away drops listeners and the running exercise document.
  frame.src = './sandbox.html#stopped'
  if (clear && output?.isConnected) output.textContent = 'Uitvoering gestopt. Pas je code aan en klik opnieuw op Voer JavaScript uit.'
}
function show(output, kind, message) {
  if (!output?.isConnected) return
  const row = document.createElement('div')
  row.className = 'js-line js-line-' + (kind === 'error' ? 'error' : kind === 'warn' ? 'warn' : 'log')
  row.textContent = String(message).slice(0,2000)
  output.appendChild(row)
  output.scrollTop = output.scrollHeight
}
export function runJavaScript(lesson, files, frame, output) {
  stopJavaScript()
  if (!frame || !output || !files || !lesson) return
  output.replaceChildren()
  if (['html','css','js'].some(k => typeof files[k] !== 'string' || files[k].length > MAX_SOURCE)) {
    show(output,'error','De code is te groot om veilig uit te voeren. Gebruik maximaal 100.000 tekens per bestand.')
    return
  }
  const id = `${++count}:${crypto.randomUUID()}`
  const mode = runMode(lesson,files)
  const data = {type:'bee-run',id,mode,html:files.html,css:files.css,js:files.js}
  const run = {id,frame,output,messages:0,done:false,timer:null,mode}
  current = run
  show(output,'log', mode === 'dom' ? 'Pagina gestart. Klik in de preview om gebeurtenissen te testen.' : 'JavaScript starten…')
  frame.onload = () => {
    if (current !== run) return
    frame.contentWindow?.postMessage(data,'*') // sandboxed iframe has opaque origin
  }
  frame.src = `./sandbox.html#run-${count}`
  run.timer = setTimeout(() => {
    if (current !== run) return
    if (!run.done) show(output,'error', mode==='worker'
      ? 'Tijdslimiet bereikt (3 seconden). Controleer of je code in een eindeloze lus blijft hangen.'
      : 'Er is nog geen voltooiingsmelding. Stop de uitvoering als de code blijft hangen.')
    if (mode==='worker') stopJavaScript()
  }, mode==='worker'?3800:8000)
}
window.addEventListener('message', event => {
  const run = current
  if (!run || event.origin !== 'null' || event.source !== run.frame.contentWindow) return
  const d = event.data
  if (!d || d.type !== 'bee-js-result' || d.id !== run.id || !['log','info','warn','error','done'].includes(d.kind)) return
  if (d.kind === 'done') {
    run.done=true
    if (run.mode==='worker') clearTimeout(run.timer)
    if (!run.messages) show(run.output,'info','Uitgevoerd zonder console-uitvoer. Probeer console.log(...) om een waarde te bekijken.')
    return
  }
  if (run.messages++ >= MAX_MESSAGES) {
    if (run.messages === MAX_MESSAGES+1) show(run.output,'warn','Maximaal 80 consoleberichten getoond.')
    return
  }
  show(run.output,d.kind,typeof d.text==='string'?d.text:'[Onbekend bericht]')
})
