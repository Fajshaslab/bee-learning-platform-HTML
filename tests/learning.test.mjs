import test from 'node:test'
import assert from 'node:assert/strict'
import { modules, allLessons, findLesson, findModule } from '../data/curriculum.js'
import {getNext,getAccess,moduleState,localSourceCheck,makePreview,escapeHtml,emptyProgress} from '../src/learning.js'

test('exact acht modules, veertig unieke lessen',()=>{assert.equal(modules.length,8);assert.equal(allLessons.length,40);assert.equal(new Set(allLessons.map(x=>x.id)).size,40)})
test('acht modulechecks met vijf vragen per module',()=>{assert.ok(modules.every(m=>m.check.length===5));assert.equal(modules.flatMap(m=>m.check).length,40)})
test('alle modules bevatten inhoud, beginbestanden, hints en uitleg',()=>{for(const l of allLessons){assert.ok(l.theory.length>=3);assert.ok(l.hints.length>=3);assert.ok(l.initial&&typeof l.initial.html==='string');assert.ok(l.rule);assert.equal(l.durationMinutes,60)}})
test('beginscherm volgt eerste onafgeronde les',()=>{assert.equal(getNext(emptyProgress()).lesson.id,'m1-l1')})
test('alleen eerste les open zonder voortgang',()=>{assert.deepEqual([...getAccess(emptyProgress())],['m1-l1']);assert.equal(moduleState(modules[1],emptyProgress()),'locked')})
test('de volgende les opent na afronden van een les',()=>{const p={lessons:['m1-l1'],checks:[]};assert.equal(getNext(p).lesson.id,'m1-l2');assert.ok(getAccess(p).has('m1-l2'))})
test('modulecheck volgt na alle vijf lessen',()=>{const p={lessons:modules[0].lessons.map(l=>l.id),checks:[]};assert.equal(getNext(p).type,'check');assert.equal(getNext(p).module.id,'m1');assert.equal(moduleState(modules[1],p),'locked')})
test('volgende module opent pas na modulecheck',()=>{const p={lessons:modules[0].lessons.map(l=>l.id),checks:['m1']};assert.equal(getNext(p).lesson.id,'m2-l1');assert.ok(getAccess(p).has('m2-l1'))})
test('volledige route eindigt op afronding',()=>{assert.equal(getNext({lessons:allLessons.map(l=>l.id),checks:modules.map(m=>m.id)}).type,'complete')})
test('HTML herkent de vereiste elementen',()=>{const l=findLesson('m2-l1');assert.equal(localSourceCheck(l,{html:'<h1>Hallo</h1><p>Wereld</p>',css:'',js:''}),true);assert.equal(localSourceCheck(l,{html:'<h1>Hallo</h1>',css:'',js:''}),false)})
test('CSS herkent geldige kleurdeclaratie',()=>{const l=findLesson('m4-l1');assert.equal(localSourceCheck(l,{html:'',css:'h1 { color: blue; }',js:''}),true);assert.equal(localSourceCheck(l,{html:'',css:'h1 { padding: 12px; }',js:''}),false)})
test('JavaScript-code wordt alleen geanalyseerd en niet uitgevoerd',()=>{const l=findLesson('m6-l1');assert.equal(localSourceCheck(l,{html:'',css:'',js:'console.log("Hallo")'}),true);assert.equal(localSourceCheck(l,{html:'',css:'',js:'// console.log("Hallo")'}),false)})
test('preview bevat expliciete script en netwerkblokkering',()=>{const s=makePreview('<h1>Hallo</h1>','h1{color:red}');assert.ok(s.includes("script-src 'none'"));assert.ok(s.includes("connect-src 'none'"));assert.ok(s.includes('<h1>Hallo</h1>'))})
test('style sluiten in CSS wordt escaped',()=>{assert.ok(!makePreview('','</style><script>bad()</script>').includes('</style><script>'))})
test('ongewenste gebruikersinhoud wordt escaped in applicatie-html',()=>{assert.equal(escapeHtml('<img src=x onerror="x">'),'&lt;img src=x onerror=&quot;x&quot;&gt;')})
test('module- en leszoekfuncties werken',()=>{assert.equal(findModule('m8').number,8);assert.equal(findLesson('m8-l5').id,'m8-l5')})
