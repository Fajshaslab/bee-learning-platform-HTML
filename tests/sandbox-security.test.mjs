import {readFileSync} from 'node:fs'
import {test} from 'node:test'
import assert from 'node:assert/strict'

const sandbox = readFileSync(new URL('../sandbox.html', import.meta.url),'utf8')
const app = readFileSync(new URL('../src/main.js', import.meta.url),'utf8')
const runner = readFileSync(new URL('../src/js-runner.js', import.meta.url),'utf8')
const sql = readFileSync(new URL('../supabase/migrations/20261102_strengere_beoordeling.sql', import.meta.url),'utf8')

test('JavaScript sandbox refuses all privileged (non-opaque) origins', () => {
 assert.match(sandbox,/globalThis\.origin\s*!==\s*'null'/)
 assert.match(sandbox,/\breturn\b/)
})
test('JavaScript sandbox requires messages from its correct parent origin', () => {
 assert.match(sandbox,/event\.source\s*!==\s*parent/)
 assert.match(sandbox,/event\.origin\s*!==\s*expectedParentOrigin/)
})
test('Student JavaScript iframe never has allow-same-origin', () => {
 assert.match(app, /id="js-preview-frame"[^>]*sandbox="allow-scripts"/)
 assert.doesNotMatch(app,/id="js-preview-frame"[^>]*allow-same-origin/)
 assert.match(runner,/event\.origin\s*!==\s*'null'/)
})
test('Sandbox CSP denies external network access', () => {
 assert.match(sandbox,/connect-src 'none'/)
 assert.match(sandbox,/form-action 'none'/)
 assert.match(sandbox,/object-src 'none'/)
})
test('Server lesson completion calls an isolated validator', () => {
 assert.match(sql,/revoke all on function public\.bee_validate_exercise[^;]*from public,anon,authenticated/i)
 assert.match(sql,/if not public\.bee_validate_exercise\(/)
})
