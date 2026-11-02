import { assessLesson } from './assessment.js'
import { CONFIG } from '../config.js'
import { modules, allLessons, findModule, findLesson } from '../data/curriculum.js'
import { escapeHtml as e, getNext, getAccess, moduleState, localSourceCheck, makePreview, emptyProgress } from './learning.js'
import { getDraft, putDraft, getDemoProgress, putDemoProgress, removeDraft } from './storage.js'
import * as auth from './auth.js'

const app = document.getElementById('app')
const state = {
  mode:'guest', progress:emptyProgress(), files:null, lesson:null, expiredDraft:null,
  tab:'html', status:'', hint:0, feedback:'', busy:false, message:'', error:'',
  timer:null, version:0, remoteDraft:null, conflict:null, pendingAnswers:{},
  loginError:'', authFields:{}, showPasswordWarning:false, editRevision:0,
}
const path=()=>decodeURIComponent(location.hash.slice(1).split('?')[0]||'/login')
const link=(href,text,cls='')=>`<a class="${cls}" href="#${href}">${e(text)}</a>`
const icon=(name)=>({book:'▤',lesson:'⌘',check:'✓',lock:'◧',arrow:'→',home:'⌂'}[name]||'•')
const statusText=()=>state.mode==='demo'?'DEMONSTRATIE — geen officiële voortgang':'STUDENTENACCOUNT'
const scope=()=>state.mode==='demo'?'demo':`user:${auth.getSession()?.user?.id||'unknown'}`
const setMessage=(text,error=false)=>{state.message=text;state.error=error?text:'';const el=document.querySelector('#global-message');if(el){el.textContent=text;el.className='notice '+(error?'error':'info');el.hidden=!text}}
function head(title,desc=''){
 document.title=`${title} | BEE Learning Platform`
 return `<div class="page-heading"><span class="eyebrow">${e(statusText())}</span><h1>${e(title)}</h1>${desc?`<p>${e(desc)}</p>`:''}</div>`
}
function layout(body,current=''){
 const next=getNext(state.progress)
 return `<a href="#main" class="skip">Direct naar inhoud</a><div class="shell"><header class="topbar"><div class="top-inner"><a class="brand" href="#/dashboard"><span>BEE</span><small>LEARNING PLATFORM</small></a><span class="mode-chip">${e(statusText())}</span><span class="network-status" id="network-status" aria-live="polite">${navigator.onLine?'Online':'Offline'}</span><button class="link-button" data-action="logout">${state.mode==='demo'?'Demo verlaten':'Uitloggen'}</button></div></header><div class="app-layout"><nav class="sidebar" aria-label="Hoofdnavigatie">
 ${[['dashboard','Dashboard','home'],['modules','Modules','book'],[next.type==='check'?'check/'+next.module.id:next.type==='lesson'?'lesson/'+next.lesson.id:'complete','Verder leren','lesson'],...(state.mode==='account'?[['settings','Account','lock']]:[])].map(([route,label,ic])=>`<a class="nav-item ${current===label?'selected':''}" href="#/${route}"><span aria-hidden="true">${icon(ic)}</span>${label}</a>`).join('')}
 ${state.mode==='account'?'<button class="button secondary stay-signed-in" id="stay-signed-in" data-action="extend-session" hidden>Ingelogd blijven</button>':''}<div class="sidebar-small">${state.mode==='demo'?'Deze omgeving gebruikt alleen lokale demonstratiegegevens.':'Les- en modulevolgorde wordt servermatig gecontroleerd.'}</div></nav><main id="main" tabindex="-1" class="main-content">${body}<div id="global-message" class="notice info" hidden role="status"></div></main></div></div>`
}
function percentDone(){return Math.round(((state.progress.lessons?.length||0)+(state.progress.checks?.length||0))/(40+8)*100)}
function dashboard(){
 const next=getNext(state.progress), pct=percentDone()
 const label=next.type==='lesson'?next.lesson.title:next.type==='check'?`Modulecheck: ${next.module.title}`:'Alle modules afgerond'
 return layout(head('Dashboard','Jouw persoonlijke leerroute, in één overzicht.')+`<section class="cards dashboard-cards"><article class="card feature"><div class="eyebrow">JOUW VOLGENDE STAP</div><h2>Verder leren</h2><strong class="next-name">${e(label)}</strong><p>${next.type==='complete'?'Je hebt alle geregistreerde onderdelen doorlopen.':next.type==='check'?'Rond eerst de verplichte modulecheck af.':'Pak je eerstvolgende onafgeronde les op.'}</p>${link(next.type==='lesson'?'/lesson/'+next.lesson.id:next.type==='check'?'/check/'+next.module.id:'/complete',next.type==='complete'?'Afronding bekijken':'Verder leren','button primary')}</article>
 <article class="card"><div class="eyebrow">JOUW VOORTGANG</div><h2>${pct}%</h2><div class="progress" role="progressbar" aria-label="Voortgang" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div><p>${state.progress.lessons.length} van 40 lessen · ${state.progress.checks.length} van 8 modulechecks</p><p class="muted">${state.mode==='demo'?'Dit is geen officiële studentenregistratie.':'Deze resultaten zijn opgehaald uit jouw account.'}</p></article></section>
 <section><div class="section-head"><h2>De acht modules</h2>${link('/modules','Alle modules bekijken')}</div><div class="module-grid">${modules.map(m=>moduleCard(m,true)).join('')}</div></section>`, 'Dashboard')
}
function moduleCard(m,compact=false){
 const s=moduleState(m,state.progress),done=m.lessons.filter(l=>state.progress.lessons.includes(l.id)).length
 return `<article class="card module-card ${s}"><div class="module-top"><span class="module-no">${String(m.number).padStart(2,'0')}</span><span class="status ${s}">${s==='completed'?'Afgerond':s==='available'?'Beschikbaar':'Vergrendeld'}</span></div><h3>${e(m.title)}</h3><p>${e(m.description)}</p><div class="module-meta">${done}/${m.lessons.length} lessen${compact?'':' · Verplichte modulecheck'}</div>${compact?'':`<div class="lesson-items">${m.lessons.map((l,i)=>{const available=getAccess(state.progress).has(l.id);const done=state.progress.lessons.includes(l.id);return `<div class="lesson-item"><span>${done?'✓':available?'○':'◧'}</span><span>${e(l.title)}</span>${available?link('/lesson/'+l.id,'Open','tiny-link'):'<span class="muted">Gesloten</span>'}</div>`}).join('')}</div>`}${s==='available'&&done===5?link('/check/'+m.id,'Modulecheck openen','button secondary'):''}</article>`
}
function modulesPage(){return layout(head('Moduleoverzicht','Een vaste volgorde: eerst alle lessen, dan de verplichte modulecheck.')+`<div class="notice info">${state.mode==='demo'?'Statussen hieronder zijn uitsluitend jouw lokale demonstratievoortgang.':'De server beslist of een les of modulecheck beschikbaar is.'} Eerdere lessen blijven opnieuw te bekijken.</div><div class="module-grid">${modules.map(m=>moduleCard(m)).join('')}</div>`,'Modules')}
function loginPage(){
 const configured=auth.isConfigured()
 document.title='Inloggen | BEE Learning Platform'
 return `<main class="login-page"><section class="login-card"><div class="login-brand"><strong>BEE-IDEAS</strong><span>LEEROMGEVING</span></div><h1>Inloggen</h1><p class="guidance">Log in en ga verder met je lessen.</p>
 ${configured?`<form id="login-form" novalidate><div class="field-list"><div class="field-group"><div class="field-shell"><input id="email" name="email" type="email" autocomplete="email" placeholder=" " aria-describedby="email-error" required><label for="email">E-mailadres</label></div><p class="field-error" id="email-error"></p></div><div class="field-group"><div class="field-shell"><input id="password" name="password" type="password" autocomplete="current-password" placeholder=" " aria-describedby="password-error" required><label for="password">Wachtwoord</label></div><p class="field-error" id="password-error"></p></div></div><div class="password-help">${link('/reset','Wachtwoord vergeten?')}</div><button class="button primary full" type="submit">Inloggen</button></form><p class="login-footer">Nog geen account? ${link('/register','Registreren')}</p>`:`<div class="notice info"><strong>Direct uitproberen</strong><p>De lokale oefenmodus werkt zonder account. Voor echte studentenaccounts moet eerst Supabase worden ingesteld.</p></div>`}
 <button class="button ${configured?'secondary':'primary'} full" data-action="start-demo">Open demonstratie</button><p class="demo-caption">${configured?'Echte voortgang vereist een geverifieerd account.':'Dit is nog geen gedeployd studentenplatform.'}</p><div id="global-message" hidden role="alert"></div></section></main>`
}
function authPage(kind){
 const register=kind==='register',reset=kind==='reset',newpass=kind==='new-password'
 const title=register?'Registreren':reset?'Wachtwoord herstellen':'Nieuw wachtwoord'
 document.title=`${title} | BEE Learning Platform`
 return `<main class="login-page"><section class="login-card"><div class="login-brand"><strong>BEE-IDEAS</strong><span>LEEROMGEVING</span></div><h1>${title}</h1><p class="guidance">${register?'Maak je account aan. Bevestig daarna je e-mailadres.':reset?'Ontvang een e-mail om je wachtwoord te herstellen.':'Kies een nieuw wachtwoord en log daarna opnieuw in.'}</p><form id="auth-form" data-kind="${kind}"><label class="stack-label">${newpass?'Nieuw wachtwoord':'E-mailadres'}<input name="${newpass?'password':'email'}" type="${newpass?'password':'email'}" autocomplete="${newpass?'new-password':'email'}" required minlength="${newpass?8:1}" /></label>${register?'<label class="stack-label">Wachtwoord (minimaal 8 tekens)<input type="password" name="password" autocomplete="new-password" minlength="8" required></label>':''}<button class="button primary full" type="submit">${register?'Registreren':reset?'Herstellink verzenden':'Wachtwoord wijzigen'}</button></form><p class="login-footer">${link('/login','Terug naar inloggen')}</p><div id="global-message" hidden role="status"></div></section></main>`
}
function renderLessonGuide(lesson){
 const g=lesson.guide
 return `<section class="card guided-learning" aria-labelledby="lesson-guide-heading">
 <div class="eyebrow">EERST BEGRIJPEN, DAN OEFENEN</div>
 <h2 id="lesson-guide-heading">Stap voor stap: zo werkt deze les</h2>
 <div class="guide-intro"><p><strong>Leerdoel:</strong> ${e(g.goal)}</p><p><strong>Wat je al moet weten:</strong> ${e(g.prior)}</p></div>
 <h3>1. Begrippen die je nodig hebt</h3>
 <ol class="guide-concepts">${g.concepts.map(concept=>`<li>${e(concept)}</li>`).join('')}</ol>
 <h3>2. Uitgewerkt voorbeeld</h3>
 <p class="guide-context">Bestudeer dit voorbeeld vóór je iets in de editor wijzigt. Het is een voorbeeld van de schrijfwijze, geen tekst die je blind hoeft over te nemen.</p>
 <div class="guide-code-header">${e(g.language.toUpperCase())} — voorbeeldcode</div>
 <pre class="guide-code"><code>${e(g.example)}</code></pre>
 <h3>3. Wat doet ieder onderdeel?</h3>
 <ol class="guide-explanation">${g.explanation.map(line=>`<li>${e(line)}</li>`).join('')}</ol>
 <h3>4. Doe dit nu zelf in de editor</h3>
 <ol class="guide-steps">${g.steps.map(step=>`<li>${e(step)}</li>`).join('')}</ol>
 <div class="guide-result"><h3>5. Wat moet je zien of kunnen uitleggen?</h3><p>${e(g.expected)}</p></div>
 <div class="guide-warning"><h3>Veelgemaakte fout</h3><p>${e(g.pitfall)}</p></div>
 <h3>Check je begrip</h3><ol class="guide-questions">${g.questions.map(q=>`<li>${e(q)}</li>`).join('')}</ol>
 <p class="muted small">Deze uitleg is voor absolute beginners en werkt volledig in de browser. JavaScript-voorbeelden worden in deze versie niet uitgevoerd. Een broncodecontrole is geen bewijs dat je de stof beheerst.</p>
 </section>`
}

function lessonPage(id){
 const lesson=findLesson(id),access=getAccess(state.progress)
 if(!lesson)return layout(head('Les niet gevonden'))
 if(!access.has(id))return layout(head('Les vergrendeld')+`<div class="card"><p>Rond de eerdere lessen en verplichte modulecheck eerst af.</p>${link('/modules','Terug naar modules','button secondary')}</div>`)
 const module=modules.find(m=>m.lessons.some(l=>l.id===id))
 if(state.lesson!==id||!state.files)return layout(head('Les laden…')+`<div class="card">Lokaal concept wordt opgehaald.</div>`)
 const code=state.files,completed=state.progress.lessons.includes(id)
 return layout(head(lesson.title,`${module.title} · ${lesson.durationMinutes} minuten gepland · ${completed?'Les geregistreerd':'Nog niet afgerond'}`)+`<div class="lesson-stack"><section class="card"><div class="eyebrow">THEORIE EN UITLEG</div><h2>Wat ga je leren?</h2><p>${e(lesson.introduction)}</p>${lesson.theory.map(t=>`<div class="theory-block"><h3>${e(t.heading)}</h3><p>${e(t.text)}</p></div>`).join('')}</section>
 ${renderLessonGuide(lesson)}
 <section class="card"><div class="eyebrow">VERDIEPING EN ZELFCONTROLE</div><h2>Na de eerste oplossing</h2><p>${e(lesson.extension||'Vergelijk je oplossing met de opdracht en verbeter de leesbaarheid.')}</p><p><strong>Reflectievraag:</strong> ${e(lesson.reflection||'Wat heb je geleerd?')}</p></section><section class="card assignment"><div class="eyebrow">PRAKTIJKOPDRACHT</div><h2>Zelf proberen</h2><p>${e(lesson.task)}</p><div class="notice info">${lesson.advanced?'JavaScript wordt hier alleen bewerkt, niet uitgevoerd.':'De HTML/CSS-preview werkt direct tijdens het typen.'} Officiële afronding vereist verbinding en servercontrole.</div></section>
 <div class="workspace"><section class="card editor-box"><div class="section-head"><div><div class="eyebrow">EDITOR</div><h2>Jouw code</h2></div><span class="save-indicator" id="save-indicator" role="status">${e(state.status)}</span></div><div class="tabs" role="group" aria-label="Bestand kiezen">${[['html','index.html'],['css','style.css'],['js','script.js']].map(([key,label])=>`<button data-action="tab" data-tab="${key}" class="tab ${state.tab===key?'active':''}" aria-pressed="${state.tab===key}">${label}</button>`).join('')}</div><label class="visually-hidden" for="editor">Code-editor voor ${e(state.tab)}</label><textarea id="editor" spellcheck="false" aria-label="${e(state.tab.toUpperCase())} codebewerking" autocapitalize="off" autocomplete="off" autocorrect="off">${e(code[state.tab])}</textarea><p class="muted small">Bewerken met regelnummers en syntaxkleuren zit niet in deze zelfstandige versie. Tab verlaat de editor normaal.</p></section>
 <section class="card result-box"><div class="eyebrow">LIVE PREVIEW</div><h2>Jouw resultaat</h2><iframe id="preview-frame" title="Afgeschermde voorbeeldpagina" sandbox="" referrerpolicy="no-referrer" srcdoc="${e(makePreview(code.html,code.css))}"></iframe><p class="muted small">Het iframe voert geen JavaScript uit en heeft geen toegang tot het hoofdplatform.</p></section></div>
 <section class="card"><div class="eyebrow">HINTS EN FEEDBACK</div><h2>Controleer jezelf</h2><div class="actions"><button class="button secondary" data-action="hint">Toon hint (${state.hint}/${lesson.hints.length})</button><button class="button primary" data-action="check-code">Controleer mijn code</button>${!completed?`<button class="button secondary" data-action="complete-lesson">${state.mode==='demo'?'Demo-les markeren':'Les officieel registreren'}</button>`:'<span class="status completed">Les afgerond</span>'}</div>${state.hint?`<ol class="hints">${lesson.hints.slice(0,state.hint).map(h=>`<li>${e(h)}</li>`).join('')}</ol>`:''}<div id="feedback" role="status">${e(state.feedback)}</div></section>
 <section class="card"><div class="eyebrow">CONCEPTBEHEER</div><h2>Conceptopslag</h2><p id="storage-detail" class="muted">${state.mode==='demo'?'Alleen deze browser, demonstratiemodus.':'Lokaal concept met optionele account-synchronisatie.'}</p><div class="actions"><button class="button secondary" data-action="save-draft">Lokaal opslaan</button>${state.mode==='account'?'<button class="button secondary" data-action="sync">Synchroniseer concept</button>':''}<button class="button secondary" data-action="export">Export JSON</button><label class="button secondary file-label">Import JSON<input id="import-file" type="file" accept=".json,application/json" hidden></label><button class="button ghost" data-action="reset-draft">Begin opnieuw</button></div>${state.conflict?'<div class="notice warn"><strong>Opslagconflict</strong><p>Het serverconcept is op een ander apparaat veranderd. We overschrijven niets automatisch.</p><button class="button secondary" data-action="use-server">Laad serverversie</button><button class="button secondary" data-action="keep-local">Bewaar mijn lokale versie apart als JSON</button></div>':''}</section>
 <div class="lesson-footer">${link('/modules','Terug naar modules','button secondary')}${completed&&getNext(state.progress).type==='lesson'&&getNext(state.progress).lesson.id!==id?link('/lesson/'+getNext(state.progress).lesson.id,'Volgende les','button primary'):completed&&getNext(state.progress).type==='check'?link('/check/'+getNext(state.progress).module.id,'Naar de modulecheck','button primary'):''}</div></div>`,'Verder leren')
}
function moduleCheckPage(id){
 const m=findModule(id)
 if(!m)return layout(head('Modulecheck niet gevonden'))
 const done=m.lessons.every(l=>state.progress.lessons.includes(l.id)),prior=m.number===1||state.progress.checks.includes('m'+(m.number-1))
 if(!done||!prior)return layout(head('Modulecheck nog niet beschikbaar')+`<article class="card"><p>Rond eerst alle lessen en eerdere modulechecks af.</p>${link('/modules','Terug naar modules','button secondary')}</article>`)
 const complete=state.progress.checks.includes(id)
 return layout(head(`Modulecheck — ${m.title}`,'Verplicht vóór de volgende module.')+`<section class="card"><div class="eyebrow">${state.mode==='demo'?'LOKALE DEMO — GEEN OFFICIEEL RESULTAAT':'MODULECHECK — SERVERCONTROLE'}</div><p>Beantwoord alle vijf vragen. Je kunt antwoorden wijzigen en opnieuw proberen.</p>${complete?'<div class="notice success">Deze modulecheck is al afgerond.</div>':`<form id="check-form">${m.check.map((q,i)=>`<fieldset class="question"><legend><strong>${i+1}. ${e(q.question)}</strong></legend>${q.options.map((o,j)=>`<label class="option"><input type="radio" name="${e(q.id)}" value="${j}" ${state.pendingAnswers[q.id]===j?'checked':''} required><span>${e(o)}</span></label>`).join('')}</fieldset>`).join('')}<button class="button primary" type="submit">${state.mode==='demo'?'Controleer demo-antwoorden':'Modulecheck indienen'}</button></form>`}${complete?link('/dashboard','Naar dashboard','button primary'):''}</section>`)
}
function completePage(){const done=getNext(state.progress).type==='complete';return layout(head('Afronding')+`<div class="card completion"><div class="eyebrow">${done?'LEERTRAJECT DOORLOPEN':'NOG NIET AFGEROND'}</div><h2>${done?'Alle acht modules afgerond':'Je bent nog onderweg'}</h2><p>${done?(state.mode==='demo'?'Je hebt de demonstratieroute doorlopen. Dit is geen officieel diploma of certificaat.':'Alle modules en modulechecks zijn geregistreerd. Laat de resultaten door je begeleider controleren.'): 'Voltooi alle lessen en verplichte modulechecks voordat dit scherm de afsluiting toont.'}</p>${link('/dashboard','Terug naar dashboard','button secondary')}</div>`)}
function settingsPage(){return layout(head('Accountinstellingen')+`<article class="card"><h2>Account en beveiliging</h2>${state.mode==='account'?`<p>Je kunt een nieuwe e-mail laten verifiëren of je account definitief verwijderen.</p><form id="email-form"><label class="stack-label">Nieuw e-mailadres<input type="email" name="email" required autocomplete="email"></label><button class="button secondary">Verificatie aanvragen</button></form><hr><h3>Account definitief verwijderen</h3><p>Deze actie verwijdert je account, officiële voortgang en online concepten. Exporteer eerst de code die je wilt bewaren.</p><button class="button ghost" data-action="delete-account">Verwijder mijn account definitief</button><p class="muted">De wijziging van je e-mailadres vereist bevestiging. Herstelcodes en volledige sessie-intrekking bij e-mailwijziging zijn nog niet geïmplementeerd.</p>`:'<p>Voor echte accountinstellingen moet je met een geverifieerd studentenaccount inloggen. Dit is de lokale demonstratie.</p>'}</article>`)}
function sessionExpiredPage(){return `<main class="login-page"><section class="login-card"><h1>Sessie verlopen</h1><p class="guidance">Je inlogsessie is beëindigd na 120 minuten inactiviteit. Officiële voltooiing is niet meer mogelijk zonder opnieuw in te loggen.</p>${state.expiredDraft?`<div class="notice warn">Je laatste code is in het geheugen behouden. Exporteer deze nu voordat je het tabblad sluit.</div><button class="button primary full" data-action="export-expired">Exporteer mijn laatste code</button>`:'<p>Je lokaal opgeslagen concept blijft beschikbaar op dit apparaat.</p>'}<p class="login-footer">${link('/login','Opnieuw inloggen')}</p></section></main>`}

async function loadLesson(id){
 const l=findLesson(id);if(!l)return
 state.lesson=id;state.files=null;state.feedback='';state.hint=0;state.tab='html';state.conflict=null;state.status='Laden…';render()
 try{
  const cached=await getDraft(scope(),id)
  let remote=null
  if(state.mode==='account'&&navigator.onLine){try{remote=await auth.readRemoteDraft(id)}catch{/* Lokaal kan wel verder. */}}
  if(state.lesson!==id)return
  if(cached){
   state.files=cached.files;state.version=cached.remoteVersion||0
   state.status='Alleen lokaal opgeslagen'
   if(remote&&remote.version!==state.version){
    state.conflict={ok:false,conflict:true,version:remote.version,server:{html:remote.html,css:remote.css,js:remote.js}}
    state.status='Let op: serverconcept verschilt van lokaal concept'
   }
  }else if(remote){
   state.files={html:remote.html,css:remote.css,js:remote.js};state.version=remote.version
   await putDraft(scope(),id,state.files,state.version)
   state.status='Serverconcept lokaal geladen'
  }else{
   state.files=structuredClone(l.initial);state.version=0;state.status='Nieuwe begincode'
  }
  render()
 }catch(err){state.files=structuredClone(l.initial);state.status='Browseropslag niet beschikbaar — exporteer handmatig';render();setMessage(err.message,true)}
}
function chooseRoute(){
 const route=path(), protectedPage=route.startsWith('/dashboard')||route.startsWith('/modules')||route.startsWith('/lesson/')||route.startsWith('/check/')||route==='/complete'||route==='/settings'
 if(protectedPage&&state.mode==='guest'){location.hash='#/login';return}
 if(route==='/login'||route==='/')app.innerHTML=loginPage()
 else if(['/register','/reset','/new-password'].includes(route))app.innerHTML=authPage(route.slice(1))
 else if(route==='/dashboard')app.innerHTML=dashboard()
 else if(route==='/modules')app.innerHTML=modulesPage()
 else if(route.startsWith('/lesson/')){
  const id=route.split('/')[2];if(id!==state.lesson){loadLesson(id);return}app.innerHTML=lessonPage(id)
 }
 else if(route.startsWith('/check/'))app.innerHTML=moduleCheckPage(route.split('/')[2])
 else if(route==='/complete')app.innerHTML=completePage()
 else if(route==='/settings')app.innerHTML=settingsPage()
 else if(route==='/session-expired')app.innerHTML=sessionExpiredPage()
 else{location.hash='#/login';return}
 const main=document.querySelector('#main');if(main)main.focus({preventScroll:true})
}
function render(){chooseRoute()}
// Serialize IndexedDB writes so slow earlier saves never overwrite newer edits.
let draftSaveQueue = Promise.resolve()
async function saveLocal(){
 if(!state.lesson||!state.files)return false
 clearTimeout(state.timer)
 const lessonId=state.lesson, saveScope=scope()
 const files={...state.files}, version=state.version, revision=state.editRevision
 const operation=draftSaveQueue.catch(()=>undefined).then(
  ()=>putDraft(saveScope,lessonId,files,version)
 )
 draftSaveQueue=operation
 try{
  await operation
  if(state.lesson===lessonId&&state.editRevision===revision){
   state.status='Alleen lokaal opgeslagen op dit apparaat'
   const indicator=document.querySelector('#save-indicator')
   if(indicator)indicator.textContent=state.status
  }
  return true
 }catch(err){
  if(state.lesson===lessonId){
   state.status='Opslaan mislukt — exporteer je code'
   const indicator=document.querySelector('#save-indicator')
   if(indicator)indicator.textContent=state.status
   setMessage(err.message,true)
  }
  return false
 }
}
// Remote saves are serialized; never silently overwrite another device's revision.
let remoteSyncQueue=Promise.resolve()
function syncRemote({alreadySaved=false}={}){
 const job=remoteSyncQueue.catch(()=>undefined).then(()=>syncRemoteNow({alreadySaved}))
 remoteSyncQueue=job
 return job
}
async function syncRemoteNow({alreadySaved=false}={}){
 if(state.mode!=='account'||!state.files)return
 if(!navigator.onLine){setMessage('Offline: concept blijft lokaal. Synchronisatie kan later.',true);return}
 if(!alreadySaved && !await saveLocal())return
 const lessonId=state.lesson
 const files={...state.files}
 const revision=state.editRevision
 try{
  const response=await auth.rpc('save_student_draft',{p_exercise_id:lessonId,p_html:files.html,p_css:files.css,p_js:files.js,p_expected_version:state.version})
  if(state.lesson!==lessonId)return
  if(!response.ok&&response.conflict){state.conflict=response;render();setMessage('Er is een conflict. Kies bewust welke versie je wilt bewaren.',true);return}
  if(!response.ok)throw new Error(response.message||'Synchroniseren mislukt')
  state.version=response.version
  await saveLocal()
  if(revision===state.editRevision){
   state.status='Online bevestigd en lokaal opgeslagen'
   const indicator=document.querySelector('#save-indicator');if(indicator)indicator.textContent=state.status
  } else {
   setMessage('Nieuwe wijzigingen wachten op synchronisatie.')
   // The user typed during the preceding request. Sync the latest state, too.
   void syncRemote({alreadySaved:true})
  }
 }catch(err){setMessage('Online synchronisatie mislukt. Lokale concept is behouden: '+err.message,true)}
}
async function enterMode(mode,keepRoute=false){
 state.mode=mode;state.progress=mode==='demo'?getDemoProgress():await auth.loadProgress()
 if(!state.progress.lessons||!state.progress.checks)state.progress=emptyProgress()
 state.lesson=null;state.files=null;if(!keepRoute||!location.hash||location.hash==='#/login')location.hash='#/dashboard';render()
}
async function completeLesson(){
 if(!state.lesson||!state.files)return
 const lesson=findLesson(state.lesson)
 const beoordeling=assessLesson(lesson,state.files)
 if(!beoordeling.ok){setMessage(beoordeling.message,true);return}
 if(state.mode==='demo'){
  if(!state.progress.lessons.includes(lesson.id))state.progress.lessons.push(lesson.id)
  putDemoProgress(state.progress);render();setMessage('Demo-les gemarkeerd (niet officieel).');return
 }
 if(!navigator.onLine){setMessage('Offline kun je alleen conceptwerk bewaren, niet officieel afronden.',true);return}
 try{const r=await auth.rpc('submit_lesson',{p_lesson_id:lesson.id,p_html:state.files.html,p_css:state.files.css,p_js:state.files.js});if(!r.ok)throw new Error(r.message);state.progress=await auth.loadProgress();render();setMessage('Les geregistreerd door de server.')}
 catch(err){setMessage('Les niet geregistreerd: '+err.message,true)}
}
async function handleAuthForm(form){
 const kind=form.dataset.kind, fd=new FormData(form)
 try{
  if(kind==='register'){
   if(String(fd.get('password')).length<8)throw new Error('Minimaal 8 tekens nodig')
   await auth.register(String(fd.get('email')).trim(),String(fd.get('password')))
   setMessage('Registratie ontvangen. Controleer je e-mail en bevestig je account.');return
  }
  if(kind==='reset'){await auth.requestReset(String(fd.get('email')).trim());setMessage('Als dit account bestaat, is een herstellink verstuurd.');return}
  if(kind==='new-password'){await auth.updatePassword(String(fd.get('password')));location.hash='#/login';render();setMessage('Wachtwoord bijgewerkt. Log opnieuw in.');return}
 }catch(err){setMessage(err.message,true)}
}
app.addEventListener('submit',async ev=>{
 const form=ev.target
 if(form.id==='login-form'){
  ev.preventDefault();const fd=new FormData(form)
  const email=String(fd.get('email')).trim(),password=String(fd.get('password'))
  document.querySelector('#email-error').textContent=!email?'Vul je e-mailadres in.':!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?'Vul een geldig e-mailadres in.':''
  document.querySelector('#password-error').textContent=!password?'Vul je wachtwoord in.':''
  if(!email||!password||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){(document.querySelector('#email-error').textContent?document.querySelector('#email'):document.querySelector('#password')).focus();return}
  try{await auth.login(email,password);await enterMode('account')}catch(err){setMessage(err.message,true)}
 }else if(form.id==='auth-form'){ev.preventDefault();await handleAuthForm(form)}
 else if(form.id==='check-form'){
  ev.preventDefault();const m=findModule(path().split('/')[2]);const fd=new FormData(form),answers=Object.fromEntries(m.check.map(q=>[q.id,Number(fd.get(q.id))]))
  if(m.check.some(q=>fd.get(q.id)===null)){setMessage('Beantwoord alle vragen.',true);return}
  state.pendingAnswers=answers
  if(state.mode==='demo'){
   if(m.check.some(q=>answers[q.id]!==q.answer)){setMessage('Nog niet alle antwoorden zijn correct. Probeer opnieuw.',true);return}
   if(!state.progress.checks.includes(m.id))state.progress.checks.push(m.id)
   putDemoProgress(state.progress);render();setMessage('Demo-modulecheck behaald; dit is geen officieel resultaat.')
  }else{
   if(!navigator.onLine){setMessage('Offline kun je geen officiële modulecheck afronden.',true);return}
   try{const r=await auth.rpc('submit_module_check',{p_module_id:m.id,p_answers:answers});if(!r.ok)throw new Error(r.message);state.progress=await auth.loadProgress();render();setMessage('Modulecheck door server geregistreerd.')}catch(err){setMessage(err.message,true)}
  }
 }else if(form.id==='email-form'){ev.preventDefault();try{await auth.changeEmail(new FormData(form).get('email'));setMessage('Controleer je mailbox om de wijziging te bevestigen.')}catch(err){setMessage(err.message,true)}}
})
app.addEventListener('input',ev=>{
 if(ev.target.id!=='editor'||!state.files)return
 state.files[state.tab]=ev.target.value
 state.editRevision+=1
 state.status='Wijzigingen wachten op lokale opslag…'
 const ind=document.querySelector('#save-indicator');if(ind)ind.textContent=state.status
 if(state.tab!=='js'){const iframe=document.querySelector('#preview-frame');if(iframe)iframe.srcdoc=makePreview(state.files.html,state.files.css)}
 clearTimeout(state.timer);state.timer=setTimeout(async()=>{
  const saved=await saveLocal()
  if(saved&&state.mode==='account'&&navigator.onLine)void syncRemote({alreadySaved:true})
},700)
})
app.addEventListener('change',async ev=>{
 if(ev.target.id!=='import-file')return
 const file=ev.target.files?.[0];if(!file)return
 if(file.size>300000){setMessage('Exportbestand is te groot',true);return}
 try{const data=JSON.parse(await file.text())
  if(data.type!=='bee-development-preview-export'||data.lessonId!==state.lesson||['html','css','js'].some(k=>typeof data[k]!=='string'||data[k].length>100000))throw new Error('Geen geldig exportbestand voor deze les')
  if(!confirm('Huidige code vervangen door het geïmporteerde concept?'))return
  state.files={html:data.html,css:data.css,js:data.js};await saveLocal();render();setMessage('Concept geïmporteerd en lokaal bewaard.')
 }catch(err){setMessage(err.message,true)}
})
app.addEventListener('click',async ev=>{
 const button=ev.target.closest('[data-action]');if(!button)return
 const action=button.dataset.action
 if(action==='start-demo'){await enterMode('demo');return}
 if(action==='export-expired'&&state.expiredDraft){
  const data={type:'bee-development-preview-export',lessonId:state.expiredDraft.lessonId,exportedAt:new Date().toISOString(),...state.expiredDraft.files}
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'})
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`bee-expired-${state.expiredDraft.lessonId}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return
 }
 if(action==='delete-account'){
  if(state.mode!=='account')return
  if(state.lesson&&state.files&&!await saveLocal()){setMessage('Accountverwijdering gestopt: exporteer je code eerst.',true);return}
  const confirmation=window.prompt('Dit is onomkeerbaar. Typ ACCOUNT VERWIJDEREN om je account en online gegevens te wissen.')
  if(confirmation!=='ACCOUNT VERWIJDEREN')return
  if(!window.confirm('Laatste bevestiging: je account en online voortgang echt verwijderen?'))return
  try{
   const result=await auth.rpc('delete_my_account',{})
   if(!result.ok)throw new Error('Server heeft de verwijdering niet bevestigd')
   await auth.logout();state.mode='guest';state.lesson=null;state.files=null;state.progress=emptyProgress();state.expiredDraft=null
   location.hash='#/login';render();setMessage('Account verwijderd. Lokale exports moet je zelf verwijderen.');
  }catch(error){setMessage('Account niet verwijderd: '+error.message,true)}
  return
 }

 if(action==='extend-session'){
  if(state.mode==='account'){auth.touchActivity();state.showPasswordWarning=false;document.getElementById('stay-signed-in')?.setAttribute('hidden','');setMessage('Sessie verlengd door activiteit.');}
  return
 }
 if(action==='logout'){
  if(state.lesson&&state.files&&!await saveLocal()){
   setMessage('Uitloggen gestopt: lokaal opslaan is mislukt. Exporteer eerst je code en probeer opnieuw.',true)
   return
  }
  if(state.mode==='account')await auth.logout()
  state.expiredDraft=null;state.mode='guest';state.lesson=null;state.files=null;location.hash='#/login';render();return
 }
 if(action==='tab'){state.tab=button.dataset.tab;render();return}
 if(action==='hint'){const l=findLesson(state.lesson);state.hint=Math.min(state.hint+1,l.hints.length);render();return}
 if(action==='check-code'){state.feedback=assessLesson(findLesson(state.lesson),state.files).message;const f=document.querySelector('#feedback');if(f)f.textContent=state.feedback;return}
 if(action==='complete-lesson'){
  if(!await saveLocal()){
   setMessage('Les niet geregistreerd: lokaal opslaan is mislukt. Exporteer je code eerst.',true)
   return
  }
  await completeLesson()
  return
 }
 if(action==='save-draft'){if(await saveLocal())setMessage('Lokaal concept opgeslagen.');return}
 if(action==='sync'){await syncRemote();return}
 if(action==='export'||action==='keep-local'){
  const data={type:'bee-development-preview-export',lessonId:state.lesson,exportedAt:new Date().toISOString(),...state.files}
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob)
  const a=document.createElement('a');a.href=url;a.download=`bee-${state.lesson}-${Date.now()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage('Download gestart. Controleer je Downloads-map.');return
 }
 if(action==='reset-draft'){
  if(!confirm('Dit lokale concept verwijderen en opnieuw beginnen?'))return
  clearTimeout(state.timer)
  try{
   await draftSaveQueue.catch(()=>undefined)
   await removeDraft(scope(),state.lesson)
   state.files=structuredClone(findLesson(state.lesson).initial)
   state.editRevision+=1;state.version=0;state.conflict=null
   render();setMessage('Lokaal concept verwijderd.')
  }catch(err){setMessage('Concept kon niet worden verwijderd: '+err.message,true)}
  return
 }
 if(action==='use-server'){
  if(!state.conflict?.server)return
  if(!confirm('Je huidige lokale code vervangen door de serverversie? Exporteer eerst als back-up.'))return
  state.files=state.conflict.server;state.version=state.conflict.version;state.conflict=null;await saveLocal();render();setMessage('Serverversie geladen en lokaal bewaard.');return
 }
})
// Never discard unsaved code when switching routes. Do not claim a save succeeded
// until the IndexedDB transaction has completed.
let routeChangeRevision=0
window.addEventListener('hashchange',()=>{
 const revision=++routeChangeRevision
 const previousLesson=state.lesson
 const nextRoute=path()
 if(state.mode!=='guest'&&previousLesson&&state.files&&nextRoute!==`/lesson/${previousLesson}`){
  void (async()=>{
   const saved=await saveLocal()
   if(revision!==routeChangeRevision)return
   if(!saved){
    location.hash=`#/lesson/${previousLesson}`
    setMessage('Navigatie gestopt: lokaal concept niet opgeslagen. Exporteer je code.',true)
    return
   }
   state.lesson=null;state.files=null
   render()
  })()
  return
 }
 if(!nextRoute.startsWith('/lesson/')){state.lesson=null;state.files=null}
 render()
})
window.addEventListener('online',()=>{
 const indicator=document.getElementById('network-status');if(indicator)indicator.textContent='Online'
 if(state.mode==='account'&&state.lesson&&state.files){void syncRemote()}
 else if(state.mode!=='guest')setMessage('Weer online. Lokaal conceptwerk blijft beschikbaar.')
})
window.addEventListener('offline',()=>{
 const indicator=document.getElementById('network-status');if(indicator)indicator.textContent='Offline'
 if(state.mode!=='guest')setMessage('Offline. Alleen lokaal conceptwerk; geen officiële afronding.',true)
})
// Cross-tab logout or account switch: never keep rendering another user's session.
window.addEventListener('storage',event=>{
 if(event.key!=='bee.auth.session'||state.mode!=='account')return
 const previousUser=auth.getSession()?.user?.id
 let updated=null
 try{updated=JSON.parse(event.newValue||'null')}catch{/* invalid */}
 if(updated?.user?.id===previousUser)return
 void (async()=>{
  const snapshot=state.lesson&&state.files?{lessonId:state.lesson,files:{...state.files}}:null
  const saved=snapshot?await saveLocal():true
  state.expiredDraft=snapshot&&!saved?snapshot:null
  state.mode='guest';state.lesson=null;state.files=null;state.progress=emptyProgress()
  location.hash='#/session-expired';render()
 })()
})
let lastTouch=0
window.addEventListener('pointerdown',()=>{if(state.mode==='account'&&Date.now()-lastTouch>20000){auth.touchActivity();lastTouch=Date.now()}},{passive:true})
window.addEventListener('keydown',()=>{if(state.mode==='account'&&Date.now()-lastTouch>20000){auth.touchActivity();lastTouch=Date.now()}})
setInterval(async()=>{
 if(state.mode!=='account')return
 const minutes=auth.getInactivityMinutes()
 if(minutes>=120){
   // Access must expire regardless of IndexedDB, but unsaved code must remain exportable.
   const snapshot=state.lesson&&state.files?{lessonId:state.lesson,files:{...state.files}}:null
   const saved=snapshot?await saveLocal():true
   state.expiredDraft=snapshot&&!saved?snapshot:null
   await auth.logout()
   state.mode='guest';state.lesson=null;state.files=null;state.progress=emptyProgress()
   location.hash='#/session-expired';render()
 }
 else if(minutes>=115&&!state.showPasswordWarning){
   state.showPasswordWarning=true
   const keep=document.getElementById('stay-signed-in');if(keep)keep.removeAttribute('hidden')
   setMessage('Je sessie verloopt binnenkort. Kies Ingelogd blijven of gebruik het platform.',true)
 }
 else if(minutes<115){
   state.showPasswordWarning=false
   const keep=document.getElementById('stay-signed-in');if(keep)keep.setAttribute('hidden','')
 }
},30000)

async function boot(){
 try{
  await auth.initializeAuth()
  if(auth.getSession()&&auth.isVerified()){
   await enterMode('account',true)
   if(auth.isRecovery())location.hash='#/new-password'
  }else if(location.hash.startsWith('#/demo')){await enterMode('demo')}
  else{state.mode='guest';render()}
 }catch(err){state.mode='guest';render();setMessage('Account niet beschikbaar: '+err.message,true)}
}
boot()

// Offline shell: previously visited pages can reopen without a connection.
// This registers only for this deployment subpath (works on GitHub Pages).
if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    const workerURL = new URL('../service-worker.js', import.meta.url)
    navigator.serviceWorker.register(workerURL.href, { scope: new URL('../', import.meta.url).pathname })
      .catch(error => console.warn('Offline cache niet beschikbaar:', error.message))
  })
}
