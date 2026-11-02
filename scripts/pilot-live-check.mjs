/*
 * BEE Learning Platform — LIVE Supabase pilot smoke check.
 * Only for TWO FRESH, VERIFIED, DEDICATED TEST ACCOUNTS in a test Supabase project.
 * Uses only the PUBLIC publishable/anon key and the two users' own credentials.
 * Does not create accounts or change any real student's data.
 * Creates one completed test lesson and one test draft: do not use existing accounts.
 */
const required = [
  'BEE_SUPABASE_URL', 'BEE_SUPABASE_ANON_KEY',
  'BEE_TEST_A_EMAIL', 'BEE_TEST_A_PASSWORD',
  'BEE_TEST_B_EMAIL', 'BEE_TEST_B_PASSWORD',
]

const missing = required.filter((name) => !process.env[name])
if (missing.length) {
  console.error('Ontbrekende omgevingsvariabelen:', missing.join(', '))
  console.error('Lees docs/PILOT_SUPABASE_LIVE_TEST.md. Gebruik alleen NIEUWE testaccounts.')
  process.exit(2)
}

const url = process.env.BEE_SUPABASE_URL.replace(/\/+$/, '')
if (!/^https:\/\//.test(url)) {
  console.error('Alleen een HTTPS-Supabase-URL is toegestaan.')
  process.exit(2)
}
const apiKey = process.env.BEE_SUPABASE_ANON_KEY
const report = []

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function request(path, { token, method = 'GET', body } = {}) {
  let response
  try {
    response = await fetch(`${url}${path}`, {
      method,
      headers: {
        apikey: apiKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
  } catch {
    throw new Error(`Geen verbinding met API op ${path}. Controleer URL en netwerk.`)
  }
  const payload = await response.json().catch(() => null)
  return { ok: response.ok, status: response.status, data: payload }
}

async function signIn(label, email, password) {
  const r = await request('/auth/v1/token?grant_type=password', {
    method: 'POST', body: { email, password },
  })
  assert(r.ok && r.data?.access_token, `Login van testaccount ${label} mislukt (HTTP ${r.status}).`)
  assert(r.data.user?.email_confirmed_at, `Testaccount ${label} heeft geen bevestigde e-mail.`)
  return { id: r.data.user.id, token: r.data.access_token }
}

async function expectOk(name, path, settings, verify = () => true) {
  const r = await request(path, settings)
  assert(r.ok && verify(r.data), `${name}: onverwacht antwoord (HTTP ${r.status}).`)
  report.push(['GOED', name])
  return r.data
}

async function expectDenied(name, path, settings) {
  const r = await request(path, settings)
  assert(!r.ok, `${name}: operatie had geweigerd moeten worden (HTTP ${r.status}).`)
  report.push(['GOED', name])
}

async function run() {
  console.log('BEE LIVE PILOT — uitsluitend voor nieuw aangemaakte TESTACCOUNTS.')
  console.log('Er worden een testles en een testconcept opgeslagen. Geen echte studentaccounts gebruiken.')
  const a = await signIn('A', process.env.BEE_TEST_A_EMAIL, process.env.BEE_TEST_A_PASSWORD)
  const b = await signIn('B', process.env.BEE_TEST_B_EMAIL, process.env.BEE_TEST_B_PASSWORD)
  assert(a.id && b.id && a.id !== b.id, 'Gebruik twee verschillende testaccounts.')
  report.push(['GOED', 'Twee geverifieerde, verschillende accounts kunnen inloggen'])

  // Safety preflight: never change existing progress for either test account.
  for (const [label, user] of [['A', a], ['B', b]]) {
    const lessons = await request('/rest/v1/lesson_completions?select=lesson_id', { token: user.token })
    const modules = await request('/rest/v1/module_completions?select=module_id', { token: user.token })
    const drafts = await request('/rest/v1/student_drafts?select=exercise_id', { token: user.token })
    assert(lessons.ok && modules.ok && drafts.ok, `Voortgang van account ${label} kon niet worden gelezen.`)
    assert(lessons.data.length === 0 && modules.data.length === 0 && drafts.data.length === 0,
      `Account ${label} heeft al gegevens. Maak twee NIEUWE testaccounts; er is niets aangepast.`)
  }
  report.push(['GOED', 'Beide accounts hebben vooraf lege voortgang en concepten'])

  const catalog = await expectOk('Geverifieerde gebruiker kan lescatalogus lezen',
    '/rest/v1/lesson_catalog?select=lesson_id', { token: a.token }, (data) => data.length === 40)
  assert(catalog.length === 40, 'Lesinhoud onvolledig')

  await expectDenied('Anonieme gebruiker kan lesvoortgang niet lezen',
    '/rest/v1/lesson_completions?select=lesson_id')
  await expectDenied('Antwoordsleutels zijn niet direct leesbaar',
    '/rest/v1/module_questions?select=correct_answer', { token: a.token })
  await expectDenied('Directe voortgangsinvoer wordt geweigerd',
    '/rest/v1/lesson_completions', {
      token: a.token, method: 'POST',
      body: { user_id: b.id, lesson_id: 'm2-l1' },
    })
  await expectDenied('Vergrendelde les kan niet via RPC worden voltooid',
    '/rest/v1/rpc/submit_lesson', {
      token: a.token, method: 'POST',
      body: { p_lesson_id: 'm8-l5', p_html: '<h1>test</h1><ul><li>x</li></ul>', p_css: '', p_js: '' },
    })
  await expectDenied('Vergrendeld concept kan niet via RPC worden opgeslagen',
    '/rest/v1/rpc/save_student_draft', {
      token: a.token, method: 'POST',
      body: { p_exercise_id: 'm8-l5', p_html: 'test', p_css: '', p_js: '', p_expected_version: 0 },
    })
  await expectDenied('Voortijdige modulecheck wordt door de server geweigerd',
    '/rest/v1/rpc/submit_module_check', {
      token: a.token, method: 'POST',
      body: { p_module_id: 'm1', p_answers: {} },
    })

  await expectOk('Eerste toegankelijke les wordt voor account A opgeslagen',
    '/rest/v1/rpc/submit_lesson', {
      token: a.token, method: 'POST',
      body: { p_lesson_id: 'm1-l1', p_html: '<h1>Hallo</h1><p>Ik test.</p>', p_css: '', p_js: '' },
    }, (data) => data?.ok === true)

  await expectOk('Account A kan eigen voortgang lezen',
    '/rest/v1/lesson_completions?select=lesson_id', { token: a.token },
    (data) => data.some(row => row.lesson_id === 'm1-l1'))
  await expectOk('Account B kan de voortgang van A niet lezen',
    `/rest/v1/lesson_completions?select=lesson_id&user_id=eq.${encodeURIComponent(a.id)}`,
    { token: b.token }, (data) => Array.isArray(data) && data.length === 0)

  await expectOk('Account B mag eerste eigen concept opslaan',
    '/rest/v1/rpc/save_student_draft', {
      token: b.token, method: 'POST',
      body: { p_exercise_id: 'm1-l1', p_html: '<h1>B test</h1>', p_css: '', p_js: '', p_expected_version: 0 },
    }, (data) => data?.ok === true && data?.version === 1)
  await expectOk('Account A kan concept van B niet lezen',
    `/rest/v1/student_drafts?select=exercise_id&user_id=eq.${encodeURIComponent(b.id)}`,
    { token: a.token }, (data) => Array.isArray(data) && data.length === 0)
  await expectOk('Verouderde revisie geeft conflict in plaats van overschrijven',
    '/rest/v1/rpc/save_student_draft', {
      token: b.token, method: 'POST',
      body: { p_exercise_id: 'm1-l1', p_html: '<h1>OUDE DATA</h1>', p_css: '', p_js: '', p_expected_version: 0 },
    }, (data) => data?.ok === false && data?.conflict === true && data?.version === 1)
  await expectDenied('NULL-revisie kan de conflictcontrole niet omzeilen',
    '/rest/v1/rpc/save_student_draft', {
      token: b.token, method: 'POST',
      body: { p_exercise_id: 'm1-l1', p_html: '<h1>FOUTE NULL REVISIE</h1>', p_css: '', p_js: '', p_expected_version: null },
    })
  await expectOk('Serverconcept B bleef na conflict onveranderd',
    '/rest/v1/student_drafts?select=html,version&exercise_id=eq.m1-l1',
    { token: b.token }, (data) => data.length === 1 && data[0].html === '<h1>B test</h1>' && data[0].version === 1)

  console.log('\nLIVE PILOT CONTROLES:')
  for (const [status, label] of report) console.log(`  ${status}: ${label}`)
  console.log(`\n${report.length} live API-controles geslaagd.`)
  console.log('LET OP: dit is een gerichte smoke-test, geen volledige security-audit of aftekening van 846 scenario’s.')
}

try { await run() }
catch (error) {
  console.error('\nLIVE PILOT MISLUKT:', error.message)
  console.error('Behandel dit project nog NIET als geschikt voor echte studenten.')
  process.exitCode = 1
}
