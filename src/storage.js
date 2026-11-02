const NAME = 'bee-local-drafts-v1', STORE = 'drafts'
let dbPromise
function openDB() {
  if (!('indexedDB' in window)) return Promise.reject(new Error('IndexedDB niet beschikbaar'))
  if (!dbPromise) dbPromise = new Promise((resolve,reject)=>{
    const request = indexedDB.open(NAME,1)
    request.onupgradeneeded = () => {if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE)}
    request.onsuccess=()=>resolve(request.result)
    request.onerror=()=>reject(request.error)
  }).catch(e=>{dbPromise=null; throw e})
  return dbPromise
}
async function operation(mode,key,value){
  const db=await openDB()
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE,mode), store=tx.objectStore(STORE)
    const req=value===undefined?store.get(key):value===null?store.delete(key):store.put(value,key)
    let result
    req.onsuccess=()=>{result=req.result}
    tx.oncomplete=()=>resolve(result)
    tx.onerror=()=>reject(tx.error)
    tx.onabort=()=>reject(tx.error||new Error('Transactie gestopt'))
  })
}
export const draftKey=(scope,id)=>`${scope}:${id}`
export async function getDraft(scope,id){return (await operation('readonly',draftKey(scope,id)))??null}
export async function putDraft(scope,id,files,remoteVersion=0){
  if(Object.values(files).some(value=>typeof value!=='string'||value.length>100000)) throw new Error('Codebestand te groot')
  const record={files:{html:files.html,css:files.css,js:files.js},remoteVersion,updatedAt:new Date().toISOString()}
  await operation('readwrite',draftKey(scope,id),record)
  return record
}
export async function removeDraft(scope,id){await operation('readwrite',draftKey(scope,id),null)}
export const getDemoProgress=()=>{try{return JSON.parse(localStorage.getItem('bee.demo.progress')||'{"lessons":[],"checks":[]}')}catch{return {lessons:[],checks:[]}}}
export const putDemoProgress=p=>localStorage.setItem('bee.demo.progress',JSON.stringify(p))
