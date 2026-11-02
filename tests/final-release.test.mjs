import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { modules } from '../data/curriculum.js'

const read = rel => readFileSync(new URL('../' + rel, import.meta.url), 'utf8')
const sql = read('supabase/schema.sql')
const main = read('src/main.js')
const sw = read('service-worker.js')
const build = read('scripts/build.mjs')

test('alle 40 lessen hebben onderwerpgebonden uitleg en een verdiepingsopdracht', () => {
 const lessons = modules.flatMap(module => module.lessons)
 assert.equal(lessons.length, 40)
 for (const lesson of lessons) {
  assert.equal(lesson.theory.length, 3)
  assert.ok(lesson.theory[0].text.length >= 100, lesson.id)
  assert.ok(lesson.theory[1].text.length >= 48, lesson.id)
  assert.ok(lesson.theory[2].text.length >= 48, lesson.id)
  assert.ok(lesson.extension.length > 50)
  assert.ok(lesson.reflection.length > 40)
 }
 assert.equal(new Set(lessons.map(l => l.theory[0].text)).size, 40)
})

test('40 modulecheckvragen toetsen concrete concepten in plaats van generieke omschrijvingen', () => {
 const questions = modules.flatMap(module => module.check)
 assert.equal(questions.length, 40)
 assert.equal(new Set(questions.map(q => q.question)).size, 40)
 for (const question of questions) {
  assert.ok(!question.question.startsWith('Welke omschrijving hoort bij'), question.id)
  assert.equal(question.options.length, 3)
  assert.ok(question.options[question.answer].length >= 1)
 }
})

test('serverfunctie accountverwijdering verwijdert uitsluitend auth.uid en heeft beperkte execute-rechten', () => {
 assert.match(sql, /create or replace function public\.delete_my_account\(\)/)
 assert.match(sql, /v_user uuid := auth\.uid\(\)/)
 assert.match(sql, /delete from auth\.users where id = v_user/)
 assert.match(sql, /revoke all on function public\.delete_my_account\(\) from public, anon/)
 assert.match(sql, /grant execute on function public\.delete_my_account\(\) to authenticated/)
})

test('offline applicatieshell cached enkel dezelfde origin en gebruikt versienummer', () => {
 assert.match(sw, /const VERSION = 'bee-shell-/)
 assert.match(sw, /url\.origin !== ROOT\.origin/)
 assert.match(sw, /if \(req\.method !== 'GET'\)/)
 assert.match(sw, /cache\.addAll\(ASSETS\)/)
 assert.match(sw, /caches\.delete\(key\)/)
 assert.ok(!sw.includes('/rest/v1/'))
 assert.ok(!sw.includes('access_token'))
 assert.match(build, /'service-worker\.js'/)
})

test('sessieverloop houdt mislukte concepten exporteerbaar in plaats van stil te wissen', () => {
 assert.match(main, /state\.expiredDraft=snapshot&&!saved\?snapshot:null/)
 assert.match(main, /data-action="export-expired"/)
 assert.match(main, /auth\.logout\(\)/)
})

test('ontgrendeling wordt niet uitsluitend afgeleid uit URL', () => {
 assert.match(main, /if\(!access\.has\(id\)\)/)
 assert.match(sql, /Eerdere lessen zijn nog niet afgerond/)
 assert.match(sql, /Eerdere modulecheck nog niet afgerond/)
})

test('productiepagina heeft een basis-CSP en een scriptloos previewframe', () => {
 assert.match(read('index.html'), /Content-Security-Policy/)
 assert.match(read('index.html'), /object-src 'none'/)
 assert.match(main, /sandbox=""/)
 assert.match(read('src/learning.js'), /script-src 'none'/)
})

test('server publiceert geen tests of SQL-bestanden op de ontwikkelhost', () => {
 const server = read('scripts/serve.mjs')
 assert.match(server, /publicPaths\.has\(requested\)/)
 assert.doesNotMatch(server.split('const publicPaths = new Set(')[1].split(')')[0], /supabase|tests/)
})

test('een account heeft zichtbare settings-link en online/offline-status', () => {
 assert.match(main, /\['settings','Account','lock'\]/)
 assert.match(main, /id="network-status"/)
 assert.match(main, /window\.addEventListener\('offline'/)
 assert.match(main, /window\.addEventListener\('online'/)
})
