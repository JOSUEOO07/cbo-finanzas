// CBO — permite instalar la app y abrirla aunque no haya señal.
const CACHE="cbo-v142-guardado-seguro";
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

/* ===== Avisos con la app cerrada (notificaciones). El aviso llega vacío y el celular pide a CBO qué pasó ===== */
const idbAbrir=()=>new Promise((ok,mal)=>{const r=indexedDB.open("cbo-avisos",1);r.onupgradeneeded=()=>r.result.createObjectStore("k");r.onsuccess=()=>ok(r.result);r.onerror=()=>mal(r.error)});
const idbLeer=async k=>{const db=await idbAbrir();return new Promise(ok=>{const t=db.transaction("k").objectStore("k").get(k);t.onsuccess=()=>ok(t.result);t.onerror=()=>ok(null)})};
const idbPoner=async(k,v)=>{const db=await idbAbrir();return new Promise(ok=>{const t=db.transaction("k","readwrite");t.objectStore("k").put(v,k);t.oncomplete=()=>ok();t.onerror=()=>ok()})};
self.addEventListener("push",e=>{e.waitUntil((async()=>{
  let avisos=[];
  try{const c=await idbLeer("conf");
    if(c&&c.url&&c.token){const r=await fetch(c.url,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({accion:"misAvisos",token:c.token,desde:c.desde||0}),redirect:"follow"});
      const j=await r.json();if(j&&j.ok&&Array.isArray(j.avisos)){avisos=j.avisos;if(avisos.length)await idbPoner("conf",Object.assign({},c,{desde:Math.max(...avisos.map(a=>a.ts||0))}))}}}catch(err){}
  if(!avisos.length)avisos=[{t:"CBO",x:"Tienes un aviso nuevo. Toca para verlo.",ir:""}];
  await Promise.all(avisos.slice(-3).map(a=>self.registration.showNotification(a.t||"CBO",{body:a.x||"",icon:"icon-192.png",badge:"icon-192.png",tag:"cbo-"+(a.ts||Date.now()),data:{ir:a.ir||""}})));
})())});
self.addEventListener("notificationclick",e=>{e.notification.close();const ir=(e.notification.data&&e.notification.data.ir)||"";
  e.waitUntil((async()=>{const L=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    for(const w of L){if("focus" in w){await w.focus();w.postMessage({cboIr:ir});return}}
    await self.clients.openWindow("./"+(ir?"#aviso="+ir:""))})())});
