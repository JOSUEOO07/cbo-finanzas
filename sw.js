// CBO Finanzas — permite instalar la app y abrirla aunque no haya señal.
const CACHE="cbo-finanzas-v42";
const ARCHIVOS=["./","index.html","firma-gerente.png","logo-recibo.png","manifest.json","icon-192.png","icon-512.png","maskable-192.png","maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin)return; // los datos van siempre directo a Google
  e.respondWith(fetch(e.request.url,{cache:"no-cache"}).then(r=>{const copia=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copia));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));
});
