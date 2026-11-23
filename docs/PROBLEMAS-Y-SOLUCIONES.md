# Problemas y soluciones

## Observados durante la preparación

| Situación real | Solución aplicada | Estado |
|---|---|---|
| La carpeta inicial no tenía código ni repositorio | Se creó el gestor y su estructura de código, pruebas y automatización | Implementado localmente |
| No existía repositorio remoto de destino | Tras el inicio de sesión del usuario se creó patata-ni/aula-gestor-academico, se publicaron las ramas y se activó Pages | Resuelto; ejecución inicial #1 exitosa |
| El equipo no tenía la herramienta de terminal gh | La ejecución local usa Git, Node y Playwright; se documentó publicación con Git | No impide la validación local |
| El comprobador de integridad cerraba Node inmediatamente después de fetch y provocó un error de cierre de recursos en Windows | Se eliminó la salida forzada para permitir el cierre normal del proceso | Corregido y comprobado localmente |

## Decisiones preventivas, no fallos observados

- Evitar recompilar al promover: descargar el mismo artefacto por SHA y verificar hashes publicados.
- Evitar URLs equivocadas por rutas de repositorio: usar recursos relativos y la page_url devuelta por Pages.
- Evitar confundir caché de Pages con versión actual: verificar SHA con reintentos antes de las pruebas funcionales.
- Evitar confundir emulación con dispositivos reales: etiquetar los resultados de la configuración móvil.
- Evitar afirmar que existen dos infraestructuras independientes: documentar que son rutas del mismo Pages y su indisponibilidad temporal en la promoción.

## Registro de incidencias futuras

Después de ejecutar Actions, agrega solamente incidencias observadas: fecha, enlace a la ejecución, paso que falló, mensaje relevante, causa, corrección y enlace a la nueva ejecución exitosa. Si no hubo errores, indícalo con el enlace correspondiente; no inventes un fallo para llenar la sección.

## Observación remota y mantenimiento aplicado

La ejecución inicial de Actions #1 (`f134222`) mostró advertencias por acciones antiguas que usaban Node.js 20, aunque las validaciones de Windows, Linux y macOS pasaron. Se actualizaron checkout, setup-node, upload-artifact, download-artifact, upload-pages-artifact y deploy-pages a las versiones oficiales disponibles el 23 de noviembre de 2026 y se fijaron a sus SHA completos. Esta corrección se entrega por pull request con una nueva validación antes de integrarse. El código de la aplicación no cambia por esa actualización.

Ejecución inicial: https://github.com/patata-ni/aula-gestor-academico/actions/runs/45127492570

La advertencia de capacidad del ejecutor macOS arm64 fue informativa; el trabajo de macOS finalizó correctamente. No se confunde esa advertencia con un fallo funcional.
