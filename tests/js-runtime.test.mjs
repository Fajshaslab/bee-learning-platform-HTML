import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {allLessons,findLesson} from '../data/curriculum.js'
const file=path=>readFileSync(new URL(path,import.meta.url),'utf8')
const main=file('../src/main.js'), sandbox=file('../sandbox.html')
const runner=file('../src/js-runner.js'), workerTests=file('../tests/e2e/test_learning_journey.py')

test('alle 11 JavaScript-lessen hebben een gerichte uitvoerknop en console',()=>{
 const js=allLessons.filter(x=>x.rule.startsWith('js:'))
 assert.equal(js.length,11)
 assert.match(main,/data-action="run-js"/)
 assert.match(main,/id="js-console"/)
 assert.match(main,/id="js-preview-frame"/)
 assert.match(main,/sandbox="allow-scripts"/)
 assert.match(main,/data-action="stop-js"/)
 assert.match(main,/Je code uitvoeren is niet hetzelfde als de les behalen/)
 for(const lesson of js){
  assert.ok(lesson.guide.example.trim(),lesson.id)
  assert.ok(lesson.initial.js.includes('Voer JavaScript uit'),lesson.id)
 }
 assert.match(workerTests,/test_04_full_40_lessons_and_8_module_checks/)
})
test('JavaScript-runner leest alleen berichten uit zijn eigen geïsoleerde iframe',()=>{
 assert.match(runner,/event\.origin !== 'null'/)
 assert.match(runner,/event\.source !== run\.frame\.contentWindow/)
 assert.match(runner,/d\.id !== run\.id/)
 assert.match(runner,/MAX_MESSAGES = 80/)
 assert.match(runner,/output\.replaceChildren\(\)/)
 assert.match(runner,/row\.textContent/)
 assert.doesNotMatch(runner, /output\.innerHTML/)
})
test('oefenpagina kan niet inloggen of een netwerkverbinding openen',()=>{
 assert.match(sandbox,/connect-src 'none'/)
 assert.match(sandbox,/form-action 'none'/)
 assert.match(sandbox,/object-src 'none'/)
 assert.match(sandbox,/frame-src 'none'/)
 assert.match(sandbox,/worker-src blob:/)
 assert.match(sandbox,/event\.source !== parent/)
 assert.match(sandbox,/new Function\(data\.js\)/)
 assert.match(sandbox,/new Worker\(url\)/)
 assert.match(sandbox,/worker\.terminate\(\)/)
 assert.doesNotMatch(main, /sandbox="[^"]*allow-same-origin/)
})
test('DOM-herhaling heeft echt een knop waarop de leerling kan klikken',()=>{
 const example=findLesson('m8-l3')
 assert.match(example.initial.html,/<button/)
 assert.match(example.guide.steps.join(' '),/Klik op Voer JavaScript uit/)
 assert.match(example.guide.expected,/console/)
})
test('geen wijziging aan de officiële lesbeoordeling of database is nodig',()=>{
 assert.doesNotMatch(runner, /submit_lesson|submit_module_check|save_student_draft/)
 assert.doesNotMatch(sandbox, /submit_lesson|submit_module_check|save_student_draft/)
})
