import test from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import net from 'node:net'
import { once } from 'node:events'

async function freePort() {
 const server = net.createServer()
 server.listen(0, '127.0.0.1')
 await once(server, 'listening')
 const port = server.address().port
 await new Promise(resolve => server.close(resolve))
 return port
}

async function waitForSite(url) {
 for (let attempt=0;attempt<35;attempt++) {
  try {const response=await fetch(url);if(response.ok)return}
  catch { /* Server is still starting. */ }
  await new Promise(resolve=>setTimeout(resolve,100))
 }
 throw new Error('Ontwikkelserver werd niet bereikbaar')
}

test('ontwikkelserver levert de applicatie en weigert private bestanden', async () => {
 const port=await freePort()
 const server=spawn(process.execPath,[new URL('../scripts/serve.mjs',import.meta.url).pathname],{
  env:{...process.env,PORT:String(port)},stdio:'ignore',windowsHide:true,
 })
 try {
  const origin=`http://127.0.0.1:${port}`
  await waitForSite(origin+'/')
  const routes = [
   ['/',200],['/index.html',200],['/src/main.js',200],
   ['/src/assessment.js',200],['/src/js-runner.js',200],['/sandbox.html',200],['/data/curriculum.js',200],['/data/lesson-guides.js',200],['/service-worker.js',200],
   ['/supabase/schema.sql',404],['/tests/sql.test.mjs',404],
   ['/README.md',404],['/.gitignore',404],['/scripts/pilot-live-check.mjs',404],
  ]
  for(const [path,status] of routes){
   const response=await fetch(origin+path)
   assert.equal(response.status,status,`${path} moet HTTP ${status} geven`)
  }
 } finally {
  server.kill()
 }
})
