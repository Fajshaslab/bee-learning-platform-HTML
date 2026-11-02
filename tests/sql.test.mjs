import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const sql=readFileSync(new URL('../supabase/schema.sql',import.meta.url),'utf8')
test('alle studenttabellen hebben RLS',()=>{for(const t of ['lesson_completions','module_completions','student_drafts'])assert.ok(sql.includes(`alter table public.${t} enable row level security`))})
test('studenttabellen geven alleen leesrechten aan authenticated',()=>{assert.ok(sql.includes('grant select on public.lesson_catalog,public.lesson_completions,public.module_completions,public.student_drafts to authenticated'))})
test('voltooiing gaat via aparte functies',()=>{assert.ok(sql.includes('create or replace function public.submit_lesson'));assert.ok(sql.includes('create or replace function public.submit_module_check'))})
test('SQL voorkomt direct overschrijven van syncconflicten',()=>{assert.ok(sql.includes('v_current.version is distinct from p_expected_version'));assert.ok(sql.includes('pg_advisory_xact_lock'))})
