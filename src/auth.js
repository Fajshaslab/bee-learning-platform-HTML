import { CONFIG } from '../config.js'

const KEY = 'bee.auth.session'
const IDLE_LIMIT_MS = 120 * 60 * 1000

export const isConfigured = () => Boolean(/^https:\/\//.test(CONFIG.supabaseUrl) && CONFIG.supabaseAnonKey.length > 15)

let session = null
let recovery = false

function tokenHeaders(token) {
  return {
    apikey: CONFIG.supabaseAnonKey,
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

function remember(value) {
  session = value
  if (value) localStorage.setItem(KEY, JSON.stringify(value))
  else localStorage.removeItem(KEY)
}

async function jsonFetch(url, options = {}) {
  let response
  try {
    response = await fetch(url, options)
  } catch {
    throw new Error('Geen verbinding met de server. Probeer het later opnieuw.')
  }
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.msg || data.message || data.error_description || data.error || `Serverfout ${response.status}`)
  }
  return data
}

function setTokens(data, { preserveActivity = false, inheritUser = false } = {}) {
  if (!data.access_token) throw new Error('Geen toegangstoken ontvangen')
  const prior = session
  const expiresAt = Date.now() + Number(data.expires_in || 3600) * 1000
  remember({
    access_token: data.access_token,
    refresh_token: data.refresh_token || (inheritUser ? prior?.refresh_token : null),
    expiresAt,
    lastActivity: preserveActivity && prior?.lastActivity ? prior.lastActivity : Date.now(),
    user: data.user || (inheritUser ? prior?.user : null) || null,
  })
}

function endIdleSession() {
  if (session && Date.now() - Number(session.lastActivity || 0) >= IDLE_LIMIT_MS) {
    remember(null)
    return true
  }
  return false
}

export async function initializeAuth() {
  if (!isConfigured()) return null
  recovery = false

  // Supabase's client-only implicit redirect returns tokens in the URL fragment.
  // Remove that fragment immediately so it is not left in browser history.
  const callback = new URLSearchParams(location.hash.replace(/^#/, ''))
  if (callback.has('access_token')) {
    recovery = callback.get('type') === 'recovery'
    setTokens({
      access_token: callback.get('access_token'),
      refresh_token: callback.get('refresh_token'),
      expires_in: Number(callback.get('expires_in') || 3600),
    })
    history.replaceState(null, '', `${location.pathname}${location.search}#/login`)
  } else if (callback.has('error')) {
    history.replaceState(null, '', `${location.pathname}${location.search}#/login`)
    throw new Error(callback.get('error_description') || 'De bevestigings- of herstellink is niet geldig.')
  } else {
    try { session = JSON.parse(localStorage.getItem(KEY) || 'null') }
    catch { session = null }
  }

  if (endIdleSession()) return null

  if (session) {
    try {
      await ensureToken()
      const user = await jsonFetch(`${CONFIG.supabaseUrl}/auth/v1/user`, { headers: tokenHeaders(session.access_token) })
      remember({ ...session, user })
    } catch {
      remember(null)
    }
  }
  return session
}

export const isRecovery = () => recovery
export const getSession = () => session
export const isVerified = () => Boolean(session?.user?.email_confirmed_at)

export function touchActivity() {
  if (!session || endIdleSession()) return
  session.lastActivity = Date.now()
  localStorage.setItem(KEY, JSON.stringify(session))
}

export function getInactivityMinutes() {
  return session ? Math.floor((Date.now() - Number(session.lastActivity || 0)) / 60000) : 0
}

export async function ensureToken() {
  if (!session) throw new Error('Niet ingelogd')
  if (endIdleSession()) throw new Error('Sessie verlopen door inactiviteit')
  if (Date.now() < session.expiresAt - 90000) return session.access_token
  if (!session.refresh_token) throw new Error('Sessie verlopen')

  const data = await jsonFetch(`${CONFIG.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: tokenHeaders(),
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  })
  // Refreshing a token is not user activity. Never reset the 120-minute idle clock.
  if (endIdleSession()) throw new Error('Sessie verlopen door inactiviteit')
  setTokens(data, { preserveActivity: true, inheritUser: true })
  return session.access_token
}

export async function register(email, password) {
  if (!isConfigured()) throw new Error('Supabase is nog niet geconfigureerd.')
  return jsonFetch(`${CONFIG.supabaseUrl}/auth/v1/signup?redirect_to=${encodeURIComponent(location.href.split('#')[0])}`, {
    method: 'POST', headers: tokenHeaders(), body: JSON.stringify({ email, password }),
  })
}

export async function login(email, password) {
  if (!isConfigured()) throw new Error('Supabase is nog niet geconfigureerd.')
  const data = await jsonFetch(`${CONFIG.supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: 'POST', headers: tokenHeaders(), body: JSON.stringify({ email, password }),
  })
  setTokens(data) // A new account must never inherit the previous account's identity.
  if (!isVerified()) {
    remember(null)
    throw new Error('Bevestig eerst je e-mailadres.')
  }
  return session
}

export async function logout(scope = 'local') {
  if (!['local', 'global'].includes(scope)) throw new TypeError('Ongeldige logout-scope')
  let serverConfirmed = !session
  if (session) {
    try {
      await jsonFetch(`${CONFIG.supabaseUrl}/auth/v1/logout?scope=${scope}`, {
        method: 'POST', headers: tokenHeaders(await ensureToken()),
      })
      serverConfirmed = true
    } catch { serverConfirmed = false }
  }
  remember(null)
  recovery = false
  return serverConfirmed
}

export async function requestReset(email) {
  return jsonFetch(`${CONFIG.supabaseUrl}/auth/v1/recover?redirect_to=${encodeURIComponent(location.href.split('#')[0])}`, {
    method: 'POST', headers: tokenHeaders(), body: JSON.stringify({ email }),
  })
}

export async function updatePassword(password) {
  const token = await ensureToken()
  const user = await jsonFetch(`${CONFIG.supabaseUrl}/auth/v1/user`, {
    method: 'PUT', headers: tokenHeaders(token), body: JSON.stringify({ password }),
  })
  const globallyRevoked = await logout('global')
  if (!globallyRevoked) {
    throw new Error('Wachtwoord gewijzigd en lokaal uitgelogd, maar intrekking van sessies op andere apparaten kon niet worden bevestigd. Neem contact op met de beheerder.')
  }
  return user
}

export async function changeEmail(email) {
  const token = await ensureToken()
  return jsonFetch(`${CONFIG.supabaseUrl}/auth/v1/user`, {
    method: 'PUT', headers: tokenHeaders(token), body: JSON.stringify({ email }),
  })
}

export async function rest(path, { method = 'GET', body } = {}) {
  const token = await ensureToken()
  return jsonFetch(`${CONFIG.supabaseUrl}/rest/v1/${path}`, {
    method,
    headers: { ...tokenHeaders(token), ...(method === 'POST' ? { Prefer: 'return=representation' } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  })
}

export const rpc = (name, body) => rest(`rpc/${name}`, { method: 'POST', body })

export async function loadProgress() {
  const [lessons, checks] = await Promise.all([
    rest('lesson_completions?select=lesson_id'),
    rest('module_completions?select=module_id'),
  ])
  return { lessons: lessons.map(x => x.lesson_id), checks: checks.map(x => x.module_id) }
}

export async function readRemoteDraft(id) {
  const rows = await rest(`student_drafts?exercise_id=eq.${encodeURIComponent(id)}&select=html,css,js,version,updated_at`)
  return rows[0] || null
}
