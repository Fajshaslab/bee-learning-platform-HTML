import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {allLessons,findLesson} from '../data/curriculum.js'
import {assessLesson,explainFailure} from '../src/assessment.js'

const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8')
const css=readFileSync(new URL('../assets/styles.css',import.meta.url),'utf8')

test('alle 40 lessen geven bij een lege oplossing een bruikbare foutmelding',()=>{
 for(const lesson of allLessons){
  const result=assessLesson(lesson,{html:'',css:'',js:''})
  assert.equal(result.ok,false,lesson.id)
  assert.ok(result.message.length>=45,lesson.id)
  assert.notEqual(result.message,'undefined',lesson.id)
 }
})
test('links zonder href krijgen concrete uitleg',()=>{
 const l=findLesson('m1-l4')
 const r=assessLesson(l,{html:'<a>Bekijk de voorbeeldwebsite</a>',css:'',js:''})
 assert.equal(r.ok,false)
 assert.match(r.message,/href/)
 assert.match(r.message,/example.com/)
})
test('CSS- en JavaScript-oefeningen krijgen hun eigen editoruitleg',()=>{
 assert.match(explainFailure(findLesson('m5-l1')),/style\.css/)
 assert.match(explainFailure(findLesson('m6-l1')),/script\.js/)
 assert.match(main,/state\.tab=l\.rule\.startsWith\('css:'\)\?'css':l\.rule\.startsWith\('js:'\)\?'js':'html'/)
})
test('snel naar praktijkopdracht via een knop en veilige lokale reset',()=>{
 assert.match(main,/data-action="go-practice"/)
 assert.match(main,/id="practice-assignment"/)
 assert.match(main,/state\.files=structuredClone\(findLesson\(state\.lesson\)\.initial\)/)
 assert.match(main,/if\(!await saveLocal\(\)\)return/)
 assert.match(main,/Je online concept is niet aangepast/)
 assert.match(css,/\.lesson-intro-bar/)
})
