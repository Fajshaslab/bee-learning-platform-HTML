import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {modules, allLessons} from '../data/curriculum.js'

const sql = readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8')
const app = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8')
const auth = readFileSync(new URL('../src/auth.js', import.meta.url), 'utf8')

function sqlAnswers() {
  const rows = [...sql.matchAll(/\('(?:m[1-8])','(m[1-8]-q[1-5])',(\d)\)/g)]
  return new Map(rows.map(([, questionId, answer]) => [questionId, Number(answer)]))
}

test('modulecheckantwoorden zijn verdeeld over de drie antwoordposities', () => {
  const answers = modules.flatMap(module => module.check.map(question => question.answer))
  assert.deepEqual([...new Set(answers)].sort(), [0,1,2])
  for(const module of modules) assert.ok(new Set(module.check.map(question=>question.answer)).size >= 2)
})

test('elke vraag wijst naar een bestaand antwoord, met unieke opties', () => {
  for(const module of modules) for(const question of module.check) {
    assert.equal(question.options.length, 3)
    assert.ok(question.answer >= 0 && question.answer < 3)
    assert.equal(new Set(question.options).size, 3)
  }
})

test('SQL-vragen en browserinhoud hebben exact dezelfde correcte antwoordindices', () => {
  const fromSql = sqlAnswers()
  assert.equal(fromSql.size, 40)
  for(const module of modules) for(const question of module.check) {
    assert.equal(fromSql.get(question.id), question.answer, question.id)
  }
})

test('SQL blokkeert modulechecks met foutief aantal vragen', () => {
  assert.match(sql, /count\(\*\) from public\.module_questions where module_id=p_module_id\) <> 5/)
})

test('SQL blokkeert conceptopslag voor vergrendelde lessen', () => {
  const draftFunction = sql.split('create or replace function public.save_student_draft(')[1]
  assert.ok(draftFunction)
  assert.match(draftFunction, /Eerdere lessen zijn nog niet afgerond/)
  assert.match(draftFunction, /Eerdere modulecheck nog niet afgerond/)
  assert.match(draftFunction, /email_confirmed_at is not null/)
})

test('auth kent lokaal uitloggen en globale intrekking na wachtwoordwijziging', () => {
  assert.match(auth, /export async function logout\(scope\s*=\s*'local'\)/)
  assert.match(auth, /await logout\('global'\)/)
})

test('HTML/CSS-voorbeeld blijft scriptloos in het sandboxframe', () => {
  assert.match(app, /sandbox=""/)
  assert.equal(allLessons.length, 40)
})
