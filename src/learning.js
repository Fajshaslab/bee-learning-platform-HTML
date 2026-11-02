import { modules, allLessons } from '../data/curriculum.js'

export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
export const lessonModule = id => modules.find(m => m.lessons.some(l => l.id === id))
export function getAccess(progress) {
  const lessonDone = new Set(progress.lessons || [])
  const checkDone = new Set(progress.checks || [])
  const accessible = new Set()
  let blocked = false
  for (const m of modules) {
    for (const lesson of m.lessons) {
      if (!blocked) accessible.add(lesson.id)
      if (!lessonDone.has(lesson.id)) blocked = true
    }
    if (!blocked && !checkDone.has(m.id)) blocked = true
  }
  return accessible
}
export function getNext(progress) {
  const done = new Set(progress.lessons || []), checks = new Set(progress.checks || [])
  for (const module of modules) {
    for (const lesson of module.lessons) if (!done.has(lesson.id)) return {type:'lesson',module,lesson}
    if (!checks.has(module.id)) return {type:'check',module}
  }
  return {type:'complete'}
}
export function moduleState(module, progress) {
  const checks = new Set(progress.checks||[])
  if (checks.has(module.id)) return 'completed'
  const previous = modules[module.number-2]
  return !previous || checks.has(previous.id) ? 'available' : 'locked'
}
// Oefencontrole voor een beschrijvende link: vereist bestemming én linktekst.
// Dit blijft een technische herkenningscontrole; geen pedagogische eindbeoordeling.
function hasDescriptiveLink(markup, requiredHost = null) {
  for (const match of String(markup).matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi)) {
    const attributes = match[1]
    const hrefMatch = /\bhref\s*=\s*(["'])(.*?)\1/i.exec(attributes)
    if (!hrefMatch) continue
    let target
    try { target = new URL(hrefMatch[2]) } catch { continue }
    if (target.protocol !== 'https:' && target.protocol !== 'http:') continue
    if (requiredHost && target.hostname !== requiredHost) continue
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    if (text.length < 8 || /^(klik hier|hier|meer|link)$/i.test(text)) continue
    return true
  }
  return false
}
function hasAccessibleImage(markup) {
  return [...String(markup).matchAll(/<img\b([^>]*?)\/?>/gi)].some(([, attrs]) => {
    const src = /\bsrc\s*=\s*(["'])(.*?)\1/i.exec(attrs)
    const alt = /\balt\s*=\s*(["'])(.*?)\1/i.exec(attrs)
    return src && src[2].trim() && alt && alt[2].trim()
  })
}
export function localSourceCheck(lesson, code) {
  // De HTML-linkopdrachten eisen meer dan alleen de aanwezigheid van <a>.
  if (lesson.id === 'm1-l4') {
    return /<h1\b[^>]*>[\s\S]*?<\/h1\s*>/i.test(code.html)
      && hasDescriptiveLink(code.html, 'example.com')
  }
  if (lesson.id === 'm2-l3') return hasDescriptiveLink(code.html)
  if (lesson.id === 'm2-l4') return hasAccessibleImage(code.html)

  const source = lesson.rule.startsWith('css:') ? code.css : lesson.rule.startsWith('js:') ? code.js : code.html
  if (lesson.rule.startsWith('css:')) {
    const fields = lesson.rule.split(':')
    if (fields.length === 2) return source.includes(fields[1])
    const rule = fields[1].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
    const property = fields[2].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
    const block = new RegExp(`${rule}\\s*\\{([^}]*)\\}`, 'i').exec(source)
    return Boolean(block && new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*[^;}]`, 'i').test(block[1]))
  }
  if (lesson.rule.startsWith('js:')) {
    const kind = lesson.rule.slice(3)
    const js = source.replace(/\/\/[^\n]*/g,'')
    const tests = { 'console.log':/console\s*\.\s*log\s*\(/,'const':/\bconst\s+\w+\s*=/,'boolean':/\b(true|false)\b/,'if':/\bif\s*\(/,'function':/\bfunction\s+\w+\s*\(|=>/,'array':/\[[^\]]*\]/,'object':/\b(?:const|let)\s+\w+\s*=\s*\{/,'querySelector':/document\s*\.\s*querySelector\s*\(/,'addEventListener':/\.\s*addEventListener\s*\(/}
    return Boolean(tests[kind]?.test(js))
  }
  return lesson.rule.split(',').every(tag=>new RegExp(`<${tag}\\b[^>]*>`, 'i').test(source))
}
export function makePreview(html,css) {
  // No script permissions: iframe sandbox="" and restrictive CSP are BOTH required.
  const safeCss=String(css).replace(/<\/style/gi,'<\\/style')
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'none'; connect-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; object-src 'none'; form-action 'none'; base-uri 'none'; frame-src 'none'"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:16px;font:16px/1.5 Arial,sans-serif;color:#17191c;background:white}${safeCss}</style></head><body>${String(html)}</body></html>`
}
export const emptyProgress = () => ({lessons:[],checks:[]})
export const allLessonCount = allLessons.length
