import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'}
const port = Number(process.env.PORT || 5173)
http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://localhost')
  let requested
  try { requested = decodeURIComponent(u.pathname) } catch { res.writeHead(400); res.end('Bad request'); return }
  // Only serve the public application, never .git, tests, private notes or SQL.
  const publicPaths = new Set(['/','/index.html','/config.js','/service-worker.js','/assets/styles.css','/src/main.js','/src/auth.js','/src/storage.js','/src/learning.js','/src/assessment.js','/data/curriculum.js','/data/lesson-guides.js'])
  if (!publicPaths.has(requested)) {res.writeHead(404);res.end('Niet gevonden');return}
  let file = path.resolve(root, '.' + requested)
  if (!(file === root || file.startsWith(root + path.sep))) {res.writeHead(403);res.end();return}
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file,'index.html')
    const data = await readFile(file)
    res.writeHead(200, {'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'})
    res.end(data)
  } catch {res.writeHead(404);res.end('Niet gevonden')}
}).listen(port, '127.0.0.1', () => console.log(`BEE draait op http://localhost:${port}/`))
