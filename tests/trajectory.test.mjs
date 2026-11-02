import test from 'node:test'
import assert from 'node:assert/strict'
import { modules, allLessons } from '../data/curriculum.js'
import { emptyProgress, getAccess, getNext, localSourceCheck, moduleState, makePreview } from '../src/learning.js'

function exampleSolution(lesson) {
  if (lesson.id === 'm1-l4') return {html:'<h1>Mijn link</h1><a href="https://example.com">Bekijk de voorbeeldwebsite</a>', css:'', js:''}
  if (lesson.id === 'm2-l3') return {html:'<a href="https://example.com">Lees informatie op de voorbeeldwebsite</a>', css:'', js:''}
  if (lesson.id === 'm2-l4') return {html:'<img src="voorbeeld.jpg" alt="Een groene heuvel bij zonsopkomst">', css:'', js:''}
  if (lesson.rule.startsWith('css:')) {
    const [,selector,property] = lesson.rule.split(':')
    const css = property ? `${selector} { ${property}: ${property === 'display' ? 'flex':'red'}; }` : `${selector} screen and (max-width: 400px) { body { color: blue; } }`
    return {html:'<h1>Voorbeeld</h1><div class="container grid"><p>Voorbeeld</p></div>',css,js:''}
  }
  if (lesson.rule.startsWith('js:')) {
    const kind=lesson.rule.slice(3)
    const snippets={
      'console.log':'console.log("Hallo BEE");',
      'const':'const antwoord = 42;',
      'boolean':'const actief = true;',
      'if':'if (true) { console.log("BEE"); }',
      'function':'function oefening() { return 42; }',
      'array':'const lijst = [1, 2, 3];',
      'object':'const student = { naam: "BEE" };',
      'querySelector':'document.querySelector("h1");',
      'addEventListener':'document.body.addEventListener("click", () => {});',
    }
    if (!snippets[kind]) throw new Error(`Ontbrekende JS-oplossing: ${lesson.id} (${kind})`)
    return {html:'<h1>JavaScript</h1>',css:'',js:snippets[kind]}
  }
  return {html:lesson.rule.split(',').map(tag => tag==='input'?'<input type="text">':tag==='img'?'<img src="voorbeeld.jpg" alt="Een voorbeeld">':`<${tag}>BEE</${tag}>`).join('\n'),css:'',js:''}
}

test('de leerroute bevat precies 8 opeenvolgende modules en 40 lessen', () => {
  assert.equal(modules.length,8)
  assert.equal(allLessons.length,40)
  assert.deepEqual(modules.map(m=>m.number),[1,2,3,4,5,6,7,8])
  assert.equal(new Set(allLessons.map(l=>l.id)).size,40)
})

for (const lesson of allLessons) {
  test(`les ${lesson.id} (${lesson.title}): voorbeeldcode wordt herkend en lege code niet`, () => {
    const code=exampleSolution(lesson)
    assert.equal(localSourceCheck(lesson,code), true, `${lesson.id} accepteert niet de aangeboden voorbeeldoplossing`)
    assert.equal(localSourceCheck(lesson,{html:'',css:'',js:''}),false,`${lesson.id} accepteert lege code`)
    assert.ok(lesson.guide?.steps?.length>=3)
    assert.ok(lesson.guide?.example)
    assert.ok(lesson.guide?.expected)
  })
}

for (const m of modules) {
  test(`modulecheck ${m.id}: precies vijf geldige vragen met antwoordsleutels`,()=>{
    assert.equal(m.lessons.length,5)
    assert.equal(m.check.length,5)
    assert.equal(new Set(m.check.map(q=>q.id)).size,5)
    for (const q of m.check) {
      assert.ok(q.question.length>=12)
      assert.ok(q.options.length>=3)
      assert.ok(Number.isInteger(q.answer) && q.answer>=0 && q.answer<q.options.length)
    }
  })
}

test('volledige route schakelt na iedere les en check alleen het volgende onderdeel vrij',()=>{
 const progress=emptyProgress()
 assert.equal(getNext(progress).type,'lesson')
 for(const module of modules){
  for(const lesson of module.lessons){
   assert.equal(getNext(progress).lesson.id,lesson.id)
   assert.ok(getAccess(progress).has(lesson.id))
   const next=allLessons[allLessons.findIndex(l=>l.id===lesson.id)+1]
   if(next)assert.equal(getAccess(progress).has(next.id),false,`Volgende les ${next.id} te vroeg beschikbaar`)
   progress.lessons.push(lesson.id)
  }
  assert.equal(getNext(progress).type,'check')
  assert.equal(getNext(progress).module.id,module.id)
  assert.equal(moduleState(module,progress),'available')
  const nextModule=modules[module.number]
  if(nextModule){
   assert.equal(moduleState(nextModule,progress),'locked')
   assert.equal(getAccess(progress).has(nextModule.lessons[0].id),false)
  }
  progress.checks.push(module.id)
  assert.equal(moduleState(module,progress),'completed')
 }
 assert.equal(getNext(progress).type,'complete')
 assert.equal(progress.lessons.length,40)
 assert.equal(progress.checks.length,8)
})

test('ingesloten voorbeeld voert geen scripts uit: sandbox en CSP zijn vereist',()=>{
 const preview=makePreview('<script>window.top.pwned=1</script>','')
 assert.match(preview,/script-src 'none'/)
 assert.match(preview,/connect-src 'none'/)
 assert.match(preview,/form-action 'none'/)
})
