# Matriz de entrega y evidencias

La rúbrica proporcionada suma 70%: 8 + 10 + 10 + 12 + 12 + 10 + 8. No se presupone qué corresponde al porcentaje restante.

| Criterio | Peso | Entregable preparado | Evidencia necesaria para acreditarlo |
|---|---:|---|---|
| Identificación del proceso CD | 8% | PROCESO-CD.md | Explicación de CI, entrega, liberación y despliegue continuo |
| Repositorio y flujo | 10% | Carpetas, historial y ramas locales, guía de configuración | URL del repositorio, ramas remotas, PR y reglas aplicadas |
| Pipeline Actions | 10% | .github/workflows/deploy.yml | Ejecución real automática y etapas exitosas |
| Entrega en pruebas | 12% | Despliegue y verificación programados | URL real, SHA, reporte y capturas de pruebas |
| Entrega en preproducción | 12% | Promoción del mismo artefacto | URL real, SHA coincidente y verify-preproduction exitoso |
| Multiplataforma | 10% | Configuración de 3 sistemas y 4 perfiles de navegador | Reportes reales por sistema y motor; distinguir emulación |
| Evidencias y documentación | 8% | Guías, resultados locales e incidencias | Capturas Actions, enlaces y reportes remotos completados |

## Registro de ejecución remota inicial: completado

- Repositorio: https://github.com/patata-ni/aula-gestor-academico
- Integrantes: Tania Gonzalez y Alondra Aimee Garcia Gomez.
- Grupo y matrículas: pendientes de completar por las integrantes.
- Commit evaluado: `f1342226f20b6e8910e982aeeae2c7e58710be11`.
- Ejecución automática por push a main: https://github.com/patata-ni/aula-gestor-academico/actions/runs/45127492570 (número 1).
- Pruebas: https://patata-ni.github.io/aula-gestor-academico/pruebas/
- Preproducción: https://patata-ni.github.io/aula-gestor-academico/preproduccion/
- Matriz Windows, Linux y macOS: exitosa.
- verify-testing y verify-preproduction: exitosos, con comprobación de SHA e integridad.
- Artefacto generado: `sistema-validado-f1342226f20b6e8910e982aeeae2c7e58710be11`.
- Validación funcional: 16 casos en Linux (3 motores y móvil emulado), 4 en Windows/Chromium y 4 en macOS/Chromium. Además, 16 casos en pruebas y 16 en preproducción. Total inicial: 56 ejecuciones de casos funcionales.
- Pruebas unitarias: 6 casos por cada sistema de CI, todos aprobados.
- Producción: no desplegada; la versión es candidata comprobada en preproducción.

Las reglas de main y develop se aplican también a administradores. Exigen PR y los tres controles de validación; la configuración actual no exige revisión de un segundo usuario. Los ambientes aceptan despliegues sólo de main.

Las evidencias de la actualización posterior de acciones se entregan en el informe remoto final; consulta su ejecución y SHA para saber qué versión está publicada al entregar.

## Inventario de capturas y enlaces que acompañan la entrega

1. Repositorio mostrando src, tests, scripts, docs, package-lock y .github/workflows/deploy.yml.
2. Ramas main, develop y feature; PR con checks aprobados y reglas de protección.
3. Resumen Actions con evento push, commit, matriz y todos los jobs verdes.
4. Detalle de integración/pruebas y construcción; artefacto sistema-validado descargable.
5. Deploy de pruebas y reporte de validación en la URL real.
6. Deploy de preproducción, version.json con el mismo SHA y comprobación exitosa.
7. Aplicación en navegadores distintos y pantalla móvil, indicando motor, sistema y si es emulado.
8. Reporte de pruebas funcionales y logs de cualquier fallo corregido.

Por captura anota fecha, URL/ejecución, commit, ambiente y lo que demuestra. No presentes las capturas locales incluidas como si fueran GitHub Actions. No sustituyas un resultado pendiente por “exitoso”.

## Casos funcionales automatizados

| Caso | Resultado esperado |
|---|---|
| Alta de tarea | Aparece con materia, fecha y prioridad; contador aumenta |
| Recarga | La tarea persiste |
| Edición | Nuevo título visible y demás campos conservados |
| Completar | Cambia el contador y el filtro por estado |
| Buscar | Encuentra texto y muestra vacío cuando no hay coincidencias |
| Eliminar confirmando | Quita la tarea y actualiza contadores |
| Eliminar cancelando | Conserva la tarea |
| Cancelar edición | Conserva los datos originales |
| Formulario vacío | Impide el alta |
| Entrada con etiquetas HTML | Muestra texto literal sin crear elementos HTML |
| Pantalla móvil | No genera desbordamiento horizontal en el caso probado |

Los resultados locales obtenidos se registran en evidencias/RESULTADOS-LOCALES.txt y en el reporte HTML adjunto. No cubren la ejecución remota ni todas las posibles condiciones de accesibilidad, seguridad o compatibilidad.
