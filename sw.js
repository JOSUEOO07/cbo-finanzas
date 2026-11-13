// CBO Finanzas — permite instalar la app y abrirla aunque no haya señal.
const CACHE="cbo-finanzas-v105-huella-escudo";
const ARCHIVOS=["./","index.html","firma-gerente.png","logo-recibo.png","logo-blanco.png","manifest.json","icon-192.png","icon-512.png","maskable-192.png","maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin)return; // los datos van siempre directo a Google
  // Abre al instante con lo guardado en el celular y trae la versión nueva por detrás (cuando cambia sw.js, la app se recarga sola)
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const red=fetch(e.request.url,{cache:"no-cache"}).then(r=>{if(r&&r.ok){const copia=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copia))}return r});
    if(hit){e.waitUntil(red.catch(()=>{}));return hit}
    return red.catch(()=>caches.match("index.html"));
  }));
});
