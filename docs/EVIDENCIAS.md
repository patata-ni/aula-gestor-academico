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

## Registro de ejecución remota: pendiente

- Repositorio: pendiente de elegir/publicar.
- Autor, grupo y matrícula: completar por el estudiante.
- Commit evaluado: pendiente de ejecución remota.
- URL del workflow y número de ejecución: pendiente.
- Evento automático que lo inició: pendiente.
- URL de pruebas: pendiente.
- URL de preproducción: pendiente.
- Resultado de verify-testing y verify-preproduction: pendiente.
- Artefacto descargado y fecha: pendiente.
- Decisión de liberación: pendiente; no se ha desplegado producción.

## Capturas auténticas para incorporar

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
