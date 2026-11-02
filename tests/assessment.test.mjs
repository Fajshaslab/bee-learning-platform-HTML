import test from 'node:test'
import assert from 'node:assert/strict'
import {allLessons,findLesson} from '../data/curriculum.js'
import {assessLesson} from '../src/assessment.js'
import {readFileSync} from 'node:fs'

const files=(html='',css='',js='')=>({html,css,js})
const valid=id=>findLesson(id)

test('uitgewerkte voorbeelden van alle 40 lessen slagen ook na strengere beoordeling',()=>{
 for(const l of allLessons){
  const val=l.guide.example
  const f=l.rule.startsWith('css:')?files(l.initial.html,val):l.rule.startsWith('js:')?files(l.initial.html,'',val):files(val)
  assert.equal(assessLesson(l,f).ok,true,`Voorbeeld mag niet worden afgekeurd: ${l.id}`)
 }
})
for(const [id,description,code] of [
 ['m1-l1','ongeldige afsluiting',files('<h1>Hallo<p>Hoi</p>')],
 ['m1-l1','lege kop en tekst',files('<h1> </h1><p> </p>')],
 ['m1-l1','tags uitsluitend in HTML-commentaar',files('<!--<h1>Hallo</h1><p>Hoi</p>-->')],
 ['m1-l4','link zonder href',files('<h1>Hallo</h1><a>Bezoek voorbeeldwebsite</a>')],
 ['m1-l4','link naar verkeerde site',files('<h1>Hallo</h1><a href="https://not-example.com">Bezoek de website</a>')],
 ['m1-l4','link met onduidelijke tekst',files('<h1>Hallo</h1><a href="https://example.com">Klik hier</a>')],
 ['m2-l4','alt ontbreekt',files('<img src="foto.png">')],
 ['m2-l4','alt inhoudsloos',files('<img src="foto.png" alt="foto">')],
 ['m2-l2','listitem buiten ul',files('<ul> </ul><li>Los item</li>')],
 ['m3-l2','input buiten form',files('<form> </form><input>')],
 ['m3-l3','label for komt niet overeen met input id',files('<label for="naam">Naam</label><input id="email">')],
 ['m4-l1','kleur staat alleen in commentaar',files('','/* h1 { color: red; } */')],
 ['m4-l1','kleur staat op verkeerde selector',files('','body { color: red; }')],
 ['m5-l1','container gebruikt geen flex',files('','.container { display: grid; }')],
 ['m5-l3','grid gebruikt geen grid',files('','.grid { display: flex; }')],
 ['m5-l4','lege media query',files('','@media (max-width: 600px) {}')],
 ['m6-l1','console log alleen in JS commentaar',files('','','// console.log("Fake")')],
 ['m6-l1','console log alleen in JS string',files('','','const fake = "console.log(123)";')],
 ['m6-l2','const zonder waarde',files('','','const fake = ;')],
 ['m6-l3','een los true trefwoord',files('','','true;')],
 ['m6-l4','if zonder body',files('','','if (true) {}')],
 ['m7-l1','lege array',files('','','const items = []')],
 ['m7-l2','leeg object',files('','','const persoon = {}')],
 ['m7-l3','selector ontbreekt',files('','','document.querySelector()')],
 ['m7-l4','geen eventlistener',files('','','// knop.addEventListener("click", () => {})')],
 ['m7-l5','console log zonder variabele',files('','','const totaal = 5; console.log("klaar")')],
]) {
 test(`foutieve oplossing afgekeurd: ${id} (${description})`,()=>{
  assert.equal(assessLesson(valid(id),code).ok,false)
 })
}
test('geldige code met alternatieve aanhalingstekens en CSS-selectorcombinatie mag wel',()=>{
 assert.equal(assessLesson(valid('m1-l4'),files('<h1>Welkom</h1><a href=https://example.com>Bekijk de voorbeeldwebsite</a>')).ok,true)
 assert.equal(assessLesson(valid('m3-l3'),files("<label for='x'>Voornaam</label><input id='x'>")).ok,true)
 assert.equal(assessLesson(valid('m4-l1'),files('','h1, h2 { color: royalblue; }')).ok,true)
 assert.equal(assessLesson(valid('m6-l1'),files('','','console.log("https://example.com");')).ok,true)
})
test('Supabase-migratie verandert geen voortgang en bevat alleen-doen-als-valid-stap',()=>{
 const sql=readFileSync(new URL('../supabase/migrations/20261102_strengere_beoordeling.sql',import.meta.url),'utf8')
 assert.match(sql,/public\.bee_validate_exercise\(p_lesson_id,v_rule,p_html,p_css,p_js\)/)
 assert.match(sql,/revoke all on function public\.bee_validate_exercise.*from public,anon,authenticated/)
 assert.match(sql,/where p\.user_id=v_user/)
 assert.doesNotMatch(sql.replace(/^--.*$/gm,''),/\bdrop\s+table\b|\bdelete\s+from\s+public\.(student_drafts|lesson_completions|module_completions)\b/i)
})
