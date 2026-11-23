# Problemas y soluciones

## Observados durante la preparación

| Situación real | Solución aplicada | Estado |
|---|---|---|
| La carpeta inicial no tenía código ni repositorio | Se creó el gestor y su estructura de código, pruebas y automatización | Implementado localmente |
| No se indicó un repositorio remoto de destino | Se preparó una guía de publicación y se marcaron las evidencias remotas como pendientes | Requiere destino GitHub |
| El equipo no tenía la herramienta de terminal gh | La ejecución local usa Git, Node y Playwright; se documentó publicación con Git | No impide la validación local |

## Decisiones preventivas, no fallos observados

- Evitar recompilar al promover: descargar el mismo artefacto por SHA y verificar hashes publicados.
- Evitar URLs equivocadas por rutas de repositorio: usar recursos relativos y la page_url devuelta por Pages.
- Evitar confundir caché de Pages con versión actual: verificar SHA con reintentos antes de las pruebas funcionales.
- Evitar confundir emulación con dispositivos reales: etiquetar los resultados de la configuración móvil.
- Evitar afirmar que existen dos infraestructuras independientes: documentar que son rutas del mismo Pages y su indisponibilidad temporal en la promoción.

## Incidencias remotas por completar

Después de ejecutar Actions, agrega solamente incidencias observadas: fecha, enlace a la ejecución, paso que falló, mensaje relevante, causa, corrección y enlace a la nueva ejecución exitosa. Si no hubo errores, indícalo con el enlace correspondiente; no inventes un fallo para llenar la sección.
