# Proceso de integración y entrega continua

## Conceptos y etapas

**Integración continua (CI).** Cada push a main, develop, feature/** o codex/** y cada PR dirigido a main o develop activa verificaciones de sintaxis, pruebas de reglas, construcción y pruebas funcionales. Se detectan errores antes de integrar.

**Entrega continua.** Después de validar, build genera un artefacto descargable identificado por el SHA del commit. En main lo publica automáticamente en pruebas. Tras comprobar funcionalidad e integridad remotas promueve exactamente los mismos bytes a preproducción. La versión queda como candidata para una decisión de liberación. Crear un artefacto no equivale a comprobar su funcionamiento remoto.

**Liberación.** Decisión de hacer disponible una versión a usuarios de producción. Requiere aceptar los resultados y riesgos. Este proyecto llega a preproducción: no afirma haber liberado producción.

**Despliegue continuo.** Automatiza también la llegada de cada cambio aceptado a producción sin una aprobación humana por versión. Este proyecto automatiza despliegues no productivos, pero no implementa despliegue continuo a producción.

## Secuencia implementada en deploy.yml

1. **validate**: matriz Windows, Linux y macOS. Ejecuta sintaxis, seis pruebas unitarias, construcción y pruebas funcionales. Linux utiliza Chromium, Firefox, WebKit y perfil móvil Chromium; Windows/macOS utilizan Chromium.
2. **build**: sólo si toda la matriz pasa, genera dist y version.json con SHA y hashes SHA-256; entrega automáticamente el artefacto por 30 días. Las compilaciones de validate comprueban compatibilidad; sólo el artefacto de build se publica y se promueve.
3. **deploy-testing**: sólo en main, descarga el artefacto y publica /pruebas/ con Pages.
4. **verify-testing**: espera el commit correcto en version.json, verifica los hashes de los archivos publicados y ejecuta la suite funcional en la URL real. Si falla, detiene la promoción.
5. **deploy-preproduction**: descarga el mismo artefacto, copia sus bytes a /preproduccion/ y publica ambas rutas.
6. **verify-preproduction**: comprueba SHA, integridad y funcionalidad en la URL de preproducción; genera reportes y el resumen de versión candidata. Sólo su éxito demuestra que esa versión pasó las comprobaciones previas a una posible liberación.

Las dependencias `needs` impiden avanzar ante fallos. Los reportes se intentan guardar con `always()` aunque fallen las pruebas; un fallo previo a generar reportes puede dejar ese artefacto sin archivos. Las ejecuciones por rama se serializan para evitar despliegues concurrentes de main. Los pull requests no despliegan. Los jobs de validación tienen acceso de lectura; sólo los de publicación reciben permisos de Pages y OIDC.

## Compatibilidad y límites de las pruebas

Playwright valida comportamiento real en motores distintos y una pantalla móvil emulada. Emular Pixel 7 no demuestra una prueba en un dispositivo físico. WebKit en Windows/Linux no equivale a haber probado Safari en un iPhone. La matriz de sistemas operativos sólo quedará demostrada cuando GitHub ejecute esos trabajos; los resultados locales de Windows no acreditan Linux ni macOS.

## Alcance funcional y datos

El proyecto es una aplicación estática sin API ni cuentas. Persiste por navegador, origen y ruta con localStorage; no comparte tareas entre equipos. Las pruebas de navegador usan contextos aislados para no modificar tareas personales. Los textos se insertan con textContent, evitando interpretar el título como HTML. La aplicación presenta errores al leer datos corruptos o al no poder guardarlos.

## Fuentes

Documentación de Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Proyectos de Playwright: https://playwright.dev/docs/test-projects
