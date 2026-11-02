/* Prevent accidental publication of privileged database credentials. */
import { readFile } from 'node:fs/promises'
const source = await readFile(new URL('../config.js', import.meta.url), 'utf8')
const sourceCode = source.split('\n').filter(line => !line.trim().startsWith('//')).join('\n')
if (/sb_secret_|service[_-]role|postgres(?:ql)?:\/\//i.test(sourceCode)) {
  console.error('ONGELDIGE CONFIGURATIE: mogelijke geheime database-/service-role-key in config.js. Publiceer dit niet.')
  process.exit(1)
}
// JWT anon keys use role=anon. Never put an admin JWT in client code.
for (const possible of sourceCode.match(/eyJ[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+/g) || []) {
  try {
    const payload = JSON.parse(Buffer.from(possible.split('.')[1], 'base64url').toString())
    if (payload.role && payload.role !== 'anon') {
      console.error('ONGELDIGE CONFIGURATIE: JWT heeft geen anon-rol.')
      process.exit(1)
    }
  } catch (err) { if (err instanceof SyntaxError) continue; throw err }
}
console.log('Configcontrole: geen herkenbare service-role-key aangetroffen. Gebruik uitsluitend een publieke anon/publishable-key.')
