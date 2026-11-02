import test from 'node:test'
import assert from 'node:assert/strict'
import { CONFIG } from '../config.js'
import * as auth from '../src/auth.js'

// These are fake HTTP responses, NOT a test of Supabase RLS or a live Auth service.
test('Auth-contract: confirmed login, token refresh, idle timeout, recovery and global sign-out', async (t) => {
  const originalNow = Date.now
  const originalFetch = globalThis.fetch
  const originalStorage = globalThis.localStorage
  const originalLocation = globalThis.location
  const originalHistory = globalThis.history
  const originalUrl = CONFIG.supabaseUrl
  const originalKey = CONFIG.supabaseAnonKey
  const store = new Map()
  let now = 1_800_000_000_000
  let activeId = 'student-a'
  let confirmed = true
  let tokenRefreshed = 0
  let globalLogouts = 0
  const callLog = []

  Date.now = () => now
  CONFIG.supabaseUrl = 'https://mock-project.supabase.co'
  CONFIG.supabaseAnonKey = 'mock-public-publishable-key-12345'
  globalThis.localStorage = {
    setItem(k,v) {store.set(k,v)},
    getItem(k) {return store.get(k) ?? null},
    removeItem(k) {store.delete(k)},
  }
  globalThis.location = {
    hash: '#/login',
    pathname: '/index.html',
    search: '',
    href: 'https://bee.example/index.html#/login',
  }
  globalThis.history = {
    replaceState(_state,_title,url) {
      globalThis.location.hash = '#' + url.split('#')[1]
    },
  }
  globalThis.fetch = async (url, options = {}) => {
    const str = String(url)
    callLog.push({url:str,method:options.method || 'GET',body:options.body})
    let data
    let status = 200
    if (str.includes('grant_type=password')) {
      data = {access_token:'login-token-' + activeId, refresh_token:'refresh-' + activeId, expires_in:3600, user:{id:activeId,email_confirmed_at:confirmed?'2026-10-01':null}}
    } else if (str.includes('grant_type=refresh_token')) {
      tokenRefreshed++
      data = {access_token:'new-token-' + tokenRefreshed,refresh_token:'refresh-new-' + tokenRefreshed,expires_in:3600}
    } else if (str.endsWith('/auth/v1/user') && options.method==='PUT') {
      data = {id:activeId,email_confirmed_at:'2026-10-01'}
    } else if (str.endsWith('/auth/v1/user')) {
      data = {id:activeId,email_confirmed_at:'2026-10-01'}
    } else if (str.includes('/auth/v1/logout')) {
      if (str.includes('scope=global')) globalLogouts++
      data = {}
    } else {
      data = {}
    }
    return {ok:status<400,status,async json(){return data}}
  }

  try {
    await t.test('niet-geverifieerde login wordt geweigerd', async()=>{
      confirmed = false
      await assert.rejects(auth.login('a@test.example','12345678'), /Bevestig eerst/)
      assert.equal(auth.getSession(),null)
      confirmed = true
    })
    await t.test('geverifieerde login bewaart bijbehorende gebruiker',async()=>{
      await auth.login('a@test.example','12345678')
      assert.equal(auth.getSession().user.id,'student-a')
      assert.ok(store.has('bee.auth.session'))
    })
    await t.test('tokenrefresh verlengt NOOIT de inactiviteitsklok',async()=>{
      const originalLastActivity=auth.getSession().lastActivity
      now += 61*60*1000
      assert.match(await auth.ensureToken(),/^new-token-/)
      assert.equal(auth.getSession().lastActivity,originalLastActivity)
      assert.equal(auth.getInactivityMinutes(),61)
    })
    await t.test('na 120 minuten inactiviteit ook tijdens refresh uitloggen',async()=>{
      now += 60*60*1000
      await assert.rejects(auth.ensureToken(), /inactiviteit/)
      assert.equal(auth.getSession(),null)
    })
    await t.test('andere gebruiker mag geen oude identiteit overnemen',async()=>{
      activeId='student-b'
      await auth.login('b@test.example','12345678')
      assert.equal(auth.getSession().user.id,'student-b')
    })
    await t.test('recovery-redirect ontvangt tokens en verwijdert fragment',async()=>{
      await auth.logout()
      activeId='student-a'
      globalThis.location.hash='#access_token=recovery-token&refresh_token=recovery-refresh&expires_in=3600&type=recovery'
      await auth.initializeAuth()
      assert.equal(auth.isRecovery(),true)
      assert.equal(auth.getSession().user.id,'student-a')
      assert.equal(globalThis.location.hash,'#/login')
    })
    await t.test('wachtwoord wijzigen trekt globale refreshsessies in',async()=>{
      await auth.updatePassword('new-super-safe-password')
      assert.equal(auth.getSession(),null)
      assert.equal(globalLogouts,1)
      assert.ok(callLog.some(call=>call.method==='PUT'&&call.url.endsWith('/auth/v1/user')))
    })
    await t.test('foutieve bevestigingslink wordt afgehandeld',async()=>{
      globalThis.location.hash='#error=access_denied&error_description=Link%20verlopen'
      await assert.rejects(auth.initializeAuth(), /Link verlopen/)
      assert.equal(globalThis.location.hash,'#/login')
    })
  } finally {
    Date.now=originalNow
    globalThis.fetch=originalFetch
    globalThis.localStorage=originalStorage
    globalThis.location=originalLocation
    globalThis.history=originalHistory
    CONFIG.supabaseUrl=originalUrl
    CONFIG.supabaseAnonKey=originalKey
  }
})
