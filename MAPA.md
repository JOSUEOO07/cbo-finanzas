# Mapa de CBO Finanzas
Actualizado: 05/11/2026 · caché: cbo-finanzas-v79-categorias-teclado

## Archivos
- codigo-fuente.html: versión editable (4287 líneas). index.html es la copia que se publica: editar codigo-fuente.html y copiarlo a index.html.
- sw.js: caché para usar sin señal (subir CACHE en cada cambio). manifest.json, íconos, firma-gerente.png, logo-recibo.png.
- Datos: Google Sheets por Apps Script (enlace /exec en Configuración). Modo de prueba si el enlace es http://127.0.0.1 (guarda solo en el equipo).

## Pantallas (data-sec) → función que las dibuja
- inicio: línea 1114
- movimientos: línea 1173
- sunat: línea 1197
- terceros: línea 1229
- planilla: línea 1241
- obras: línea 1248
- inventario: línea 1272
- anual: línea 1274
- config: línea 1288

## Funciones clave (línea aprox.)
- CATS (categorías) y catsDe()/catsUsadas()/catElegida(): 1670
- render(): 1760
- renderSunat(): 1841
- renderMov(): 1864
- renderTerceros(): 1899
- renderPlanilla(): 1906
- renderAnual(): 1913
- ir(): 1957
- aplicarTema(): 2050
- entrarSeccion(): 2066
- api(): 2696
- cargar(): 2711
- enviarCola(): 2773
- renderObras(): 3030
- pintarUD(): 3460
- pintarResumenCfg(): 3653
- pintarFlujo(): 3677
- ADOR_F (fiestas) y ADOR_ART (dibujos): 3813
- pintarAdornos(): 3864
- invRender(): 4074

## Estilos
- Variables del tema oscuro único: al inicio del <style> (:root). Las paletas de Ajustes (PALETAS en el JS) solo cambian --brand y --brand-2.
- Inicio en computadora (≥1100 px): cuadrícula por zonas (grid-template-areas) en el bloque "Inicio en computadora (v61)": saludo / Utilidad+SUNAT a la izquierda y flujo del dinero a la derecha / meta+consejos / gráfico+últimos movimientos / planilla+resumen del año. Cada fila estira sus tarjetas a la misma altura (sin huecos).
- Bloque 'Diseño 2026' al final del <style>: flujo del dinero (.fl-*), paletas (.pal), transición entre secciones (.vin-der/.vin-izq).
- Bloque 'Adornos de temporada' al final del <style>: .adw (envoltura del logo), .adorno (SVG encima), animaciones ad*, .ador-prev (vista previa en Configuración).

## Reglas del dueño
- Fondo siempre oscuro; colores se eligen en Ajustes → Colores de la app (FAMILIAS: 10 fundamentales con 10 tonos y Especiales con 40 degradados más «Crear otra»; las 36 paletas antiguas siguen válidas si estaban guardadas). Noche (esp-38, PAL_DEF) es el color por defecto; quien tenía Grafito guardado pasa una sola vez.
- Adornos de temporada (pedido expreso de Josué, 05/11/2026): en el logo de arriba a la izquierda (.marca en computadora, .logo-h en celular), una fiesta peruana por mes, desde 7 días antes hasta el día. Se activan/desactivan en Configuración → Apariencia → Adornos de temporada (ajustes.adornos, activado por defecto) y "Ver cómo se ve" solo es vista previa (no cambia la fecha). Sin selector de transiciones.
- El formulario de registro (botón +) se mantiene como estaba; solo se ampliaron las categorías y la opción "Otra (escribir…)".
- Categorías: la lista CATS + las ya usadas en registros (grupo "Tus categorías", así se siguen viendo las antiguas) + "Otra (escribir…)" que guarda lo escrito como categoría. "Planilla / jornales" y "Pago a SUNAT" no aparecen en la lista (son automáticas).
- Siempre permitir agregar trabajador, cliente y proveedor nuevos; no quitar funciones.
- Logo de arriba (.logo-h, celular en Inicio): solo el logo blanco, sin recuadro de color.
- Registro: si el cliente/proveedor ya está registrado, su RUC se completa solo (autoRuc). Si es nuevo, se escribe a mano.
- Quién registra: todo lo registrado hasta el 04/11/2026 es de JOSUÉ VILLAR (porHistorico). Desde ahí, cada equipo: celular de Josué con ?soy=josue, los demás JESÚS VILLAR.
- Inventario: al usar material se elige "hasta qué piso" llega la obra (hasta 99) y el piso en una lista. Con más de 8 pisos, el resumen muestra solo los pisos con material.
- Inventario: la hoja de cada pieza muestra y deja cambiar la obra; al sacar material se elige si se devuelve o pasa a otra obra (traslado: sale de una y entra a la otra).

## Cambios v61 (05/11/2026, limpieza)
- Inicio en computadora sin huecos (antes la tarjeta Utilidad dejaba ~360 px vacíos debajo). Flujo con alto máximo (330 px en PC, 360 px en tablet) y mensaje de mes vacío centrado.
- Impuestos SUNAT, Clientes y proveedores y Resumen anual: tarjetas lado a lado con la misma altura (.g2 align-items:stretch).
- Barra de abajo (celular): el indicador blanco se recoloca también después de cargar (antes podía quedar sobre "Movim." estando en otra sección). En Configuración → Barra de abajo los dos selectores ocupan todo el ancho en celular.
- Categorías nuevas de gasto e ingreso, "Otra (escribir…)" y "Tus categorías".
- Adornos de temporada en el logo con ajuste y vista previa.
- Inventario: la obra se elige de las guardadas o se escribe una nueva (invUsarObra la guarda con pisos 1-3 y "a todo costo"; se ajusta en Editar obra).
- Catálogo de inventario depurado: sin piezas sin foto (INV_FUERA y f=0 no se muestran; siguen en INV_IDX para el historial). Un solo tubo PVC agua (SP C-10), sin codo 22.5°, PPR solo PN10 agua fría y PN16 agua caliente.
- Fotos nuevas incluidas en la app: carpeta fotos-inv/ (f201-f217: CPVC, pasta selladora, tapa de cisterna, cemento conductivo, barra de tierra, tapa ciega, cable desnudo). invFoto: foto subida > foto de Google > foto incluida.
- Inventario: cada entrada, uso o salida tiene fecha (por defecto hoy; botones Hoy/Ayer/Anteayer; no se acepta fecha futura). El historial se ordena por esa fecha (invOrden).
- Inventario: la fecha empieza siempre con la de hoy y se puede cambiar (sin botones rápidos). La obra muestra la lista de obras guardadas al tocar el campo (invSugObra).
- Barra de abajo: se esconde mientras se escribe con el teclado (clase body.escribiendo) y vuelve al cerrarlo. "Inventario" se puede elegir como acceso de la barra.
- Paletas: 36 (se agregaron 18). El botón + de la barra de abajo usa solo los colores de la paleta (antes tenía verde y dorado fijos).
- Escáner: botón "Subir documento" (PDF o imagen). leerPDFComprobante lee el QR o el texto del PDF; si es escaneado, lo lee como imagen (pdf.js 3.11.174 desde jsDelivr, render con intent print).
- Adornos: 16 fiestas, con el Mundial (14 jun-14 jul, solo años 2030, 2034...; tiene prioridad sobre las demás) (Josué quitó Eid, Mujer, Tierra, Inti Raymi, EE. UU., Janucá, Acción de Gracias, Todos los Santos, Oktoberfest, Diwali y Holi) (ADOR_F; las lunares usan adTabla, con años limitados). Toda la zona del logo y el nombre está ambientada e interactiva (ZON, ZSP, zPintar, zEstallar).
- Adornos, movimiento: capas separadas (avance adz-f, balanceo adz-o, aleteo adz-aleta), tres profundidades, solo transform y opacity. Al volar van por los bordes para no tapar el nombre. Los colores de la fiesta pasan de corrido por las letras del nombre (adzColores). Toque: onda y 8 figuras con gravedad (zEstallar). Con mouse: seguimiento suave.
- Adornos, dibujos: figuras con volumen (degradados en #zDefs). Mundial con la Copa del Mundo dibujada (COPA). Día de Muertos con papel picado, calavera de azúcar, cempasúchil, pétalos y velas.
- Adorno de cumpleaños de Josué: solo el 14 de junio y solo con el usuario JOSUÉ VILLAR. El Mundial va del 15 de junio al 14 de julio.
- Festividad en la barra de abajo (celular): capa #tbZona con figuras y línea de luz, la + cambia por el ícono de la fiesta (FI_IC, pintarFiestaBarra) y #titulo toma los colores de la fiesta en todas las secciones.
- Festividad: su color manda en toda la app (FI_TEMA, fiestaCol) con combinaciones y degradados; el color elegido vuelve al terminar. Barra sin fiesta: animación sutil (tb-zona).
- Usuario arriba a la derecha (#usuarioBtn): solo el circulito con la inicial o la imagen, sin nombre; abre su imagen (ovPerfil: foto o muñequito, cbo-avatares, solo en el equipo). No cambia de usuario; eso sigue en Configuración → Quién registra.
- Sincronización de foto y colores por usuario (sincPerfil, subirPerfil, aplicarPerfil; acciones verAjustes y guardarAjustes; pestaña Ajustes). Gana el último cambio; si la nube está vacía, lo que el equipo ya tenía se sube solo. Ya instalado en el Apps Script publicado (versión 15). Copia del agregado: mejoras/APPS-SCRIPT-AGREGADO-AJUSTES.gs en el Apps Script publicado; sin él la app sigue igual.
- Registro: Categoría con búsqueda (catBuscar, catSug, CAT_GRUPOS; 32 opciones de compra; compras sin marcar; #cat oculto guarda el valor). Monto con teclado propio en celular (teclMonto, inputmode none). Al cambiar de paso se cierra el teclado (irPaso).
- Antes de mostrar o publicar: correr mejoras/revision-app.js (revisarTodo) en la vista previa.
