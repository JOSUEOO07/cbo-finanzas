# Mapa de CBO Finanzas
Actualizado: 04/11/2026 · caché: cbo-finanzas-v60-obras

## Archivos
- codigo-fuente.html: versión editable (4091 líneas). index.html es la copia que se publica: editar codigo-fuente.html y copiarlo a index.html.
- sw.js: caché para usar sin señal (subir CACHE en cada cambio). manifest.json, íconos, firma-gerente.png, logo-recibo.png.
- Datos: Google Sheets por Apps Script (enlace /exec en Configuración). Modo de prueba si el enlace es http://127.0.0.1 (guarda solo en el equipo).

## Pantallas (data-sec) → función que las dibuja
- inicio: línea 1058
- movimientos: línea 1117
- sunat: línea 1141
- terceros: línea 1173
- planilla: línea 1185
- obras: línea 1192
- inventario: línea 1216
- anual: línea 1218
- config: línea 1232

## Funciones clave (línea aprox.)
- render(): 1692
- renderSunat(): 1773
- renderMov(): 1796
- renderTerceros(): 1831
- renderPlanilla(): 1838
- renderObras(): 2934
- renderAnual(): 1845
- pintarUD(): 3363
- pintarFlujo(): 3579
- aplicarTema(): 1982
- entrarSeccion(): 1998
- ir(): 1889
- api(): 2610
- cargar(): 2625
- enviarCola(): 2684
- invRender(): 3898
- pintarResumenCfg(): 3556

## Estilos
- Variables del tema oscuro único: al inicio del <style> (:root). Las paletas de Ajustes (PALETAS en el JS) solo cambian --brand y --brand-2.
- Bloque 'Diseño 2026' al final del <style>: flujo del dinero (.fl-*), paletas (.pal), transición entre secciones (.vin-der/.vin-izq).

## Reglas del dueño
- Fondo siempre oscuro; colores se eligen en Ajustes → Colores de la app (18 paletas). Grafito es la paleta por defecto.
- Sin decoraciones de temporada ni selector de transiciones.
- El formulario de registro (botón +) se mantiene como estaba.
- Siempre permitir agregar trabajador, cliente y proveedor nuevos; no quitar funciones.
- Logo de arriba (.logo-h, celular en Inicio): solo el logo blanco, sin recuadro de color.
- Registro: si el cliente/proveedor ya está registrado, su RUC se completa solo (autoRuc). Si es nuevo, se escribe a mano.
- Quién registra: todo lo registrado hasta el 04/11/2026 es de JOSUÉ VILLAR (porHistorico). Desde ahí, cada equipo: celular de Josué con ?soy=josue, los demás JESÚS VILLAR.
- Inventario: al usar material se elige "hasta qué piso" llega la obra (hasta 99) y el piso en una lista. Con más de 8 pisos, el resumen muestra solo los pisos con material.
- Inventario: la hoja de cada pieza muestra y deja cambiar la obra; al sacar material se elige si se devuelve o pasa a otra obra (traslado: sale de una y entra a la otra).
