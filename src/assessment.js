// BEE oefenbeoordeling v3.0 — uitsluitend statische structurele controle.
// Geen JavaScript uitvoeren. Server voert dezelfde minimale eisen zelfstandig uit.
// Niet bedoeld als automatische beoordeling van tekstinhoud of echte JavaScript-uitvoer.
const stripHtmlComments = s => String(s ?? '').replace(/<!--[\s\S]*?-->/g, '')
const stripCssComments = s => String(s ?? '').replace(/\/\*[\s\S]*?\*\//g, '')
// Masker stringwaarden en comments, maar behoud de quotes en code-structuur.
// Daardoor is bijvoorbeeld const x = "console.log(123)" geen geldige console.log-oefening.
function stripJsComments(value) {
  const src = String(value ?? '')
  let out = ''
  for (let i=0; i<src.length;) {
    const c=src[i], next=src[i+1]
    if (c==='/' && next==='/') {
      while (i<src.length && src[i]!=='\n') i++
      continue
    }
    if (c==='/' && next==='*') {
      i+=2
      while (i<src.length && !(src[i]==='*' && src[i+1]==='/')) i++
      i+=2
      continue
    }
    if (c==='"' || c==="'" || c==='`') {
      const quote=c
      i++
      while (i<src.length) {
        if (src[i]==='\\') {i+=2;continue}
        if (src[i]===quote) {i++;break}
        i++
      }
      out+=quote+'tekst'+quote
      continue
    }
    out+=c
    i++
  }
  return out
}
const textOnly = s => s.replace(/<[^>]*>/g, '').replace(/&(?:nbsp|#160);/gi, ' ').trim()
const quoteAttr = (attrs, name) => {
  const re = new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\x60]+))`, 'i')
  const m = re.exec(attrs)
  return m ? (m[1] ?? m[2] ?? m[3]) : null
}
function elements(html, tag) {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}\\s*>`, 'gi')
  return [...html.matchAll(re)].filter(m => ['h1','h2','p','li','td','th','label','a'].includes(tag) ? Boolean(textOnly(m[1])) : Boolean(m[1].trim()))
}
function contains(html, tag) {
  const re = new RegExp(`<${tag}\\b`, 'i')
  return re.test(html)
}
function validLink(html, hostname = null) {
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi
  return [...html.matchAll(re)].some(match => {
    const href = quoteAttr(match[1], 'href')
    if (!href) return false
    let parsed
    try { parsed = new URL(href) } catch { return false }
    if (!['https:', 'http:'].includes(parsed.protocol) || !parsed.hostname) return false
    if (hostname && parsed.hostname.toLowerCase() !== hostname) return false
    const label = textOnly(match[2])
    return label.length >= 8 && !/^(klik hier|hier|meer|link|website|click here)$/i.test(label)
  })
}
function validImage(html) {
  return [...html.matchAll(/<img\b([^>]*?)\/?\s*>/gi)].some(([, attrs]) => {
    const src = quoteAttr(attrs, 'src')
    const alt = quoteAttr(attrs, 'alt')
    return Boolean(src?.trim() && alt?.trim() && alt.trim().length >= 4 && !/^(foto|image|afbeelding)$/i.test(alt.trim()))
  })
}
function htmlCheck(lesson, html) {
  const id = lesson.id
  const rule = lesson.rule
  const tags = rule.split(',')
  if (!tags.every(tag => tag === 'input' ? /<input\b[^>]*>/i.test(html) : elements(html, tag).length)) return false
  if (id === 'm1-l4') return validLink(html, 'example.com')
  if (id === 'm2-l3') return validLink(html)
  if (id === 'm2-l4') return validImage(html) // treated above separately
  if (id === 'm1-l5' || id === 'm2-l2' || id === 'm2-l5' || id === 'm8-l5') {
    if (id === 'm1-l5' && !elements(html, 'p').length) return false
    if (!/<ul\b[^>]*>[\s\S]*?<li\b[^>]*>\s*[^<\s][\s\S]*?<\/li\s*>[\s\S]*?<\/ul\s*>/i.test(html)) return false
  }
  if (id === 'm3-l1' && !/<main\b[^>]*>[\s\S]*?<section\b[^>]*>[\s\S]*?<\/section\s*>[\s\S]*?<\/main\s*>/i.test(html)) return false
  if (id === 'm3-l2' && !/<form\b[^>]*>[\s\S]*?<input\b[^>]*>[\s\S]*?<\/form\s*>/i.test(html)) return false
  if (id === 'm3-l3') {
    const ids = [...html.matchAll(/<input\b([^>]*)>/gi)].map(m => quoteAttr(m[1], 'id')).filter(Boolean)
    if (![...html.matchAll(/<label\b([^>]*)>([\s\S]*?)<\/label\s*>/gi)].some(m => ids.includes(quoteAttr(m[1], 'for')) && Boolean(textOnly(m[2])))) return false
  }
  if (id === 'm3-l4' && !/<table\b[^>]*>[\s\S]*?<tr\b[^>]*>[\s\S]*?<th\b[^>]*>\s*[^<\s][\s\S]*?<\/th\s*>[\s\S]*?<\/tr\s*>[\s\S]*?<tr\b[^>]*>[\s\S]*?<td\b[^>]*>\s*[^<\s][\s\S]*?<\/td\s*>[\s\S]*?<\/tr\s*>[\s\S]*?<\/table\s*>/i.test(html)) return false
  if (id === 'm3-l5' && !/<article\b[^>]*>[\s\S]*?<h2\b[^>]*>[\s\S]*?<\/h2\s*>[\s\S]*?<p\b[^>]*>[\s\S]*?<\/p\s*>[\s\S]*?<\/article\s*>/i.test(html)) return false
  return true
}
function cssCheck(rule, css) {
  const fields = rule.split(':')
  if (fields.length === 2) {
    return /@media\s*\([^)]*(?:max-width|min-width|width)[^)]*\)\s*\{[\s\S]*?\{\s*[^{}]+:[^{}]+\}/i.test(css)
  }
  const selector = fields[1], property = fields[2]
  // Multiple selectors in one rule (h1, h2) are valid. Ignore empty declarations.
  const escapedProp = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!m[1].split(',').some(s => s.trim() === selector)) continue
    const decl = new RegExp(`(?:^|;)\\s*${escapedProp}\\s*:\\s*([^;{}]+)`, 'i').exec(m[2])
    if (!decl) continue
    const value = decl[1].trim().toLowerCase()
    if (!value || /^(?:initial|unset|revert|inherit|none|invalid|undefined|todo|xxx|placeholder)$/.test(value)) continue
    if (property === 'display' && !/^(flex|inline-flex|grid|inline-grid)$/.test(value)) continue
    if (selector === '.container' && property === 'display' && !/flex/.test(value)) continue
    if (selector === '.grid' && property === 'display' && !/grid/.test(value)) continue
    if (property === 'flex-direction' && !/^(row|column|row-reverse|column-reverse)$/.test(value)) continue
    if (['padding','gap'].includes(property) && !/\d|\b(?:var|calc|clamp)\(/.test(value)) continue
    if (property === 'border' && !/\b(?:solid|dashed|dotted|double|groove|ridge|inset|outset)\b/.test(value)) continue
    if (property === 'color' || property === 'background-color') {
      if (!/^(?:#[0-9a-f]{3,8}|(?:rgb|hsl|oklch|lab|color)\s*\(|[a-z]+$|var\s*\()/i.test(value)) continue
    }
    return true
  }
  return false
}
function jsCheck(kind, js, id) {
  // Comments never count as working code. Also exclude pure string literals that mention API names.
  if (!js.trim()) return false
  if (kind === 'console.log') {
    const logs = [...js.matchAll(/\bconsole\s*\.\s*log\s*\(\s*([^)]*\S[^)]*)\s*\)/g)]
    if (id === 'm7-l5') {
      const vars = [...js.matchAll(/\b(?:const|let|var)\s+([a-z_$][\w$]*)\s*=\s*[^;\n]+/gi)].map(x=>x[1])
      return logs.some(log => vars.some(v => new RegExp(`\\b${v}\\b`).test(log[1])))
    }
    return logs.length > 0
  }
  if (kind === 'const') return /\bconst\s+[a-z_$][\w$]*\s*=\s*[^;\s\n][^;\n]*/i.test(js)
  if (kind === 'boolean') return /\b(?:const|let|var)\s+[a-z_$][\w$]*\s*=\s*(?:true|false)\b/i.test(js)
  if (kind === 'if') return /\bif\s*\(\s*[^)\s][^)]*\)\s*\{\s*\S[\s\S]*?\}/i.test(js)
  if (kind === 'function') return /\bfunction\s+[a-z_$][\w$]*\s*\([^)]*\)\s*\{\s*\S[\s\S]*?\}/i.test(js) || /(?:\b(?:const|let)\s+[\w$]+\s*=\s*)?(?:\([^)]*\)|[a-z_$][\w$]*)\s*=>\s*(?:\{\s*\S[\s\S]*?\}|\S+)/i.test(js)
  if (kind === 'array') return /\b(?:const|let|var)\s+[a-z_$][\w$]*\s*=\s*\[\s*[^\]\s][\s\S]*?\]/i.test(js)
  if (kind === 'object') return /\b(?:const|let|var)\s+[a-z_$][\w$]*\s*=\s*\{\s*[\w$'"-]+\s*:\s*[^}\s][\s\S]*?\}/i.test(js)
  if (kind === 'querySelector') return /\bdocument\s*\.\s*querySelector\s*\(\s*(['"`])[^'"`\n]+\1\s*\)/i.test(js)
  if (kind === 'addEventListener') return /\.\s*addEventListener\s*\(\s*(['"`])[a-z]+\1\s*,\s*(?:function\b|\([^)]*\)\s*=>|[a-z_$][\w$]*)/i.test(js)
  return false
}
export function assessLesson(lesson, files) {
  if (!lesson || !files) return {ok:false, message:'Er is geen geldige les of code geladen.'}
  const html = stripHtmlComments(files.html)
  const css = stripCssComments(files.css)
  const js = stripJsComments(files.js)
  let ok
  if (lesson.rule.startsWith('css:')) ok = cssCheck(lesson.rule, css)
  else if (lesson.rule.startsWith('js:')) ok = jsCheck(lesson.rule.slice(3), js, lesson.id)
  else if (lesson.id === 'm2-l4') ok = validImage(html)
  else ok = htmlCheck(lesson, html)
  const feedback = ok
    ? 'De vereiste code-onderdelen zijn gevonden. De controle beoordeelt niet of de inhoud inhoudelijk klopt of de JavaScript-code daadwerkelijk werkt.'
    : lesson.rule.startsWith('css:') ? 'Controleer de juiste CSS-selector, eigenschap en een geldige waarde. Een vermelding in commentaar telt niet.'
      : lesson.rule.startsWith('js:') ? 'Schrijf een volledige JavaScript-instructie, niet alleen een trefwoord of commentaar.'
        : 'Controleer de HTML-structuur, zichtbare inhoud, eventuele attributen en de volgorde van geneste elementen.'
  return {ok, message:feedback}
}
