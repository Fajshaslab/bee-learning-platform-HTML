import { assessLesson } from './assessment.js'
import { modules, allLessons } from '../data/curriculum.js'

export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
export const lessonModule = id => modules.find(m => m.lessons.some(l => l.id === id))
export function getAccess(progress) {
  const lessonDone = new Set(progress.lessons || [])
  const checkDone = new Set(progress.checks || [])
  const accessible = new Set()
  let blocked = false
  for (const m of modules) {
    for (const lesson of m.lessons) {
      if (!blocked) accessible.add(lesson.id)
      if (!lessonDone.has(lesson.id)) blocked = true
    }
    if (!blocked && !checkDone.has(m.id)) blocked = true
  }
  return accessible
}
export function getNext(progress) {
  const done = new Set(progress.lessons || []), checks = new Set(progress.checks || [])
  for (const module of modules) {
    for (const lesson of module.lessons) if (!done.has(lesson.id)) return {type:'lesson',module,lesson}
    if (!checks.has(module.id)) return {type:'check',module}
  }
  return {type:'complete'}
}
export function moduleState(module, progress) {
  const checks = new Set(progress.checks||[])
  if (checks.has(module.id)) return 'completed'
  const previous = modules[module.number-2]
  return !previous || checks.has(previous.id) ? 'available' : 'locked'
}
export function localSourceCheck(lesson, code) {
  return assessLesson(lesson, code).ok
}
export function makePreview(html,css) {
  // No script permissions: iframe sandbox="" and restrictive CSP are BOTH required.
  const safeCss=String(css).replace(/<\/style/gi,'<\\/style')
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'none'; connect-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; object-src 'none'; form-action 'none'; base-uri 'none'; frame-src 'none'"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:16px;font:16px/1.5 Arial,sans-serif;color:#17191c;background:white}${safeCss}</style></head><body>${String(html)}</body></html>`
}
export const emptyProgress = () => ({lessons:[],checks:[]})
export const allLessonCount = allLessons.length
