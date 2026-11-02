import test from 'node:test'
import assert from 'node:assert/strict'
import { Script } from 'node:vm'
import { readFileSync } from 'node:fs'
import { modules } from '../data/curriculum.js'
import { lessonGuides } from '../data/lesson-guides.js'

const lessons = modules.flatMap(m => m.lessons)
const source = rel => readFileSync(new URL('../' + rel, import.meta.url), 'utf8')

test('alle 40 lessen hebben unieke leerdoelen, voorkennis en zeven didactische onderdelen', () => {
 assert.equal(lessons.length, 40)
 assert.equal(Object.keys(lessonGuides).length, 40)
 for (const lesson of lessons) {
  const g = lesson.guide
  assert.ok(g, `Uitleg ontbreekt voor ${lesson.id}`)
  assert.ok(g.goal.length >= 40, `${lesson.id}: leerdoel ontbreekt`)
  assert.ok(g.prior.length >= 25, `${lesson.id}: voorkennis ontbreekt`)
  assert.ok(g.concepts.length >= 2, `${lesson.id}: begrippen ontbreken`)
  assert.ok(g.example.length >= 25, `${lesson.id}: codevoorbeeld ontbreekt`)
  assert.ok(g.explanation.length >= 3, `${lesson.id}: regeluitleg ontbreekt`)
  assert.ok(g.steps.length >= 3, `${lesson.id}: oefenstappen ontbreken`)
  assert.ok(g.expected.length >= 35, `${lesson.id}: verwacht resultaat ontbreekt`)
  assert.ok(g.pitfall.length >= 35, `${lesson.id}: valkuil ontbreekt`)
  assert.ok(g.questions.length >= 2, `${lesson.id}: zelfcontrole ontbreekt`)
  assert.equal(lesson.hints.length, 3, `${lesson.id}: hints ontbreken`)
  assert.equal(g.language, lesson.advanced?'js':lesson.rule.startsWith('css:')?'css':'html')
 }
 assert.equal(new Set(lessons.map(l => l.guide.example)).size,40,'Codevoorbeelden zijn niet uniek')
})

test('linkles legt a, href, doel-URL, aanhalingstekens en beschrijvende linktekst uit vóór opdracht', () => {
 const g=lessonGuides['m1-l4']
 const theory=g.concepts.join(' ')+g.explanation.join(' ')
 assert.match(theory,/a-element/)
 assert.match(theory,/href/)
 assert.match(theory,/URL/)
 assert.match(theory,/aanhalingstekens/)
 assert.match(theory,/beschrijvende/)
 assert.match(g.example,/<a href="https:\/\/example\.com">[^<]+<\/a>/)
 assert.ok(g.steps.length >= 4)
})

test('HTML-voorbeelden bevatten reële HTML-tags en CSS-voorbeelden regels', () => {
 for(const lesson of lessons){
  const {example,language}=lesson.guide
  if(language==='html') assert.match(example,/<[a-z][^>]*>/i, lesson.id)
  if(language==='css') assert.match(example, /\{[\s\S]*:[\s\S]*;/,lesson.id)
 }
})

test('JavaScript-voorbeelden bevatten geldige JavaScript-syntax', () => {
 for(const lesson of lessons.filter(l => l.guide.language==='js')) {
  assert.doesNotThrow(()=>new Script(lesson.guide.example),lesson.id)
 }
})

test('lesweergave toont uitleg en codevoorbeeld voordat de opdracht verschijnt', () => {
 const main=source('src/main.js')
 assert.match(main,/renderLessonGuide\(lesson\)/)
 assert.match(main,/EERST BEGRIJPEN, DAN OEFENEN/)
 assert.ok(main.indexOf('${renderLessonGuide(lesson)}') < main.indexOf('PRAKTIJKOPDRACHT'))
 assert.match(main,/class="guide-code"/)
 assert.match(main, /\$\{e\(g\.example\)\}/)
})

test('lesgids is publiek beschikbaar via ontwikkelserver en wordt offline gecached', () => {
 assert.match(source('scripts/serve.mjs'),/\/data\/lesson-guides\.js/)
 assert.match(source('service-worker.js'),/lesson-guides\.js/)
 assert.match(source('scripts/build.mjs'),/'data'/)
})

test('linkopdracht accepteert geen a zonder href en geen onduidelijke tekst', async () => {
 const {localSourceCheck} = await import('../src/learning.js')
 const linkLesson = lessons.find(l=>l.id==='m1-l4')
 const check = html => localSourceCheck(linkLesson,{html,css:'',js:''})
 assert.equal(check('<h1>Hallo</h1><a>Klik hier</a>'),false)
 assert.equal(check('<h1>Hallo</h1><a href="https://example.com">Klik hier</a>'),false)
 assert.equal(check('<h1>Hallo</h1><a href="https://anders.nl">Lees meer over Anders</a>'),false)
 assert.equal(check('<h1>Hallo</h1><a href="https://example.com">Lees de voorbeeldwebsite</a>'),true)
})

test('img-opdracht herkent src en betekenisvolle alt, niet alleen de img-tag', async () => {
 const {localSourceCheck} = await import('../src/learning.js')
 const lesson=lessons.find(l=>l.id==='m2-l4')
 const check=html=>localSourceCheck(lesson,{html,css:'',js:''})
 assert.equal(check('<img src="foto.jpg">'),false)
 assert.equal(check('<img src="foto.jpg" alt="">'),false)
 assert.equal(check('<img src="foto.jpg" alt="Een foto van een berg">'),true)
})
