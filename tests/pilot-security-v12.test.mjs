import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const sql = readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8')
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8')
const pilot = readFileSync(new URL('../scripts/pilot-live-check.mjs', import.meta.url), 'utf8')

// Tests inspect contracts, not the live RLS engine or browser.
test('SQL eist eigendom van studentresultaten via RLS',()=>{
  for (const table of ['lesson_completions','module_completions','student_drafts']) {
    assert.match(sql,new RegExp(`create policy "[^"]+ own" on public\\.${table}`))
    assert.match(sql,new RegExp(`on public\\.${table} for select to authenticated using \\(user_id=\\(select auth\\.uid\\(\\)\\)\\)`))
  }
})
test('SQL verleent geen directe schrijfrechten voor officiële voltooiing',()=>{
  assert.match(sql,/revoke all on public\.lesson_catalog,public\.module_questions,public\.lesson_completions,public\.module_completions,public\.student_drafts from public,anon,authenticated/)
  assert.match(sql,/grant select on public\.lesson_catalog,public\.lesson_completions,public\.module_completions,public\.student_drafts to authenticated/)
})
test('SQL security definer functies beperken execute tot authenticated',()=>{
  for(const fn of ['submit_lesson','submit_module_check','save_student_draft','delete_my_account']) {
    assert.match(sql,new RegExp(`create or replace function public\\.${fn}\\(`))
    assert.match(sql,new RegExp(`revoke all on function public\\.${fn}\\(`))
    assert.match(sql,new RegExp(`grant execute on function public\\.${fn}\\(`))
  }
  assert.equal((sql.match(/security definer set search_path = ''/g)||[]).length,4)
})
test('SQL rejects NULL verwachte revisie en gebruikt NULL-veilige conflictvergelijking',()=>{
  assert.match(sql,/if p_expected_version is null or p_expected_version < 0 then/)
  assert.match(sql,/v_current\.version is distinct from p_expected_version/)
})
test('SQL registreert geen modulecheck met ontbrekende of extra antwoorden',()=>{
  assert.match(sql,/jsonb_typeof\(p_answers\)<>'object'/)
  assert.match(sql,/count\(\*\) from jsonb_object_keys\(p_answers\)\) <> 5/)
})
test('navigeren en officiële lesregistratie stoppen wanneer lokale opslag mislukt',()=>{
  assert.match(main,/Navigatie gestopt: lokaal concept niet opgeslagen/)
  assert.match(main,/Les niet geregistreerd: lokaal opslaan is mislukt/)
})
test('live pilot script vereist twee testaccounts en doet negatieve cross-user controles',()=>{
  assert.match(pilot,/BEE_TEST_A_EMAIL/)
  assert.match(pilot,/BEE_TEST_B_EMAIL/)
  assert.match(pilot,/Account B kan de voortgang van A niet lezen/)
  assert.match(pilot,/Account A kan concept van B niet lezen/)
  assert.match(pilot,/NULL-revisie kan de conflictcontrole niet omzeilen/)
})
test('live pilot script zonder toegangsinformatie faalt voordat enige request wordt gedaan',()=>{
  const script = new URL('../scripts/pilot-live-check.mjs', import.meta.url)
  const env = Object.fromEntries(Object.entries(process.env).filter(([key])=>!key.startsWith('BEE_')))
  const result=spawnSync(process.execPath,[script.pathname],{env,encoding:'utf8'})
  assert.equal(result.status,2)
  assert.match(result.stderr,/Ontbrekende omgevingsvariabelen/)
})
