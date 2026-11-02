import { cp, mkdir, rm } from 'node:fs/promises'
await rm('dist', {recursive:true, force:true})
await mkdir('dist')
for (const name of ['index.html','assets','src','data','config.js','service-worker.js']) await cp(name,`dist/${name}`,{recursive:true})
console.log('Static productiebuild gemaakt in dist/. Upload de inhoud naar GitHub Pages/Netlify/Cloudflare Pages.')
