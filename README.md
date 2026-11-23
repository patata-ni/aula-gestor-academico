# Aula · Gestor de tareas académico

Proyecto académico de integración y entrega continua. Permite crear, editar, completar, buscar, filtrar y eliminar tareas con materia, fecha y prioridad. Guarda los datos en localStorage, por navegador y ruta del ambiente. No requiere servidor de datos ni contraseñas.

## Inicio local

Instala Node.js 24 o posterior. Desde esta carpeta:

```sh
npm ci
npm run build
npm start
```

Abre http://127.0.0.1:4173. Para detener el servidor, usa Ctrl+C. No abras index.html directamente: los módulos necesitan un servidor HTTP.

## Validación

```sh
npm run check
npm test
npx playwright install chromium firefox webkit
npm run build
npm run test:e2e
npx playwright show-report
```

En Linux utiliza `npx playwright install --with-deps chromium firefox webkit`. El reporte HTML, XML, capturas y trazas se generan en playwright-report/ y test-results/.

## Organización

```text
.github/workflows/deploy.yml  Integración, artefactos, despliegue y validación remota
src/                         HTML, estilos, interfaz y reglas del sistema
scripts/                     Construcción, servidor local y comprobación de integridad
tests/domain.test.mjs        Pruebas de validación y filtros
tests/e2e/                   Pruebas funcionales en navegador
docs/                        Proceso CD, configuración y matriz de evidencias
evidencias/                  Resultados locales realmente obtenidos
dist/                        Artefacto generado; excluido del control de versiones
package-lock.json            Versiones de dependencias reproducibles
```

## Ramas y trabajo colaborativo

- `main`: versión integrable; un push inicia la entrega hasta preproducción.
- `develop`: integración de cambios; ejecuta validación y entrega el artefacto descargable sin desplegar.
- `feature/<descripcion>`: trabajo de una funcionalidad; se integra a develop mediante pull request.
- `codex/<descripcion>`: alternativa admitida para cambios asistidos.

El repositorio Git local incluido tiene main, develop y feature/base-academica. Para publicar y proteger las ramas sigue [la guía de GitHub](docs/CONFIGURACION-GITHUB.md). La protección remota no se aplica por crear ramas localmente.

## Entrega académica

Consulta [el proceso CD](docs/PROCESO-CD.md), [la matriz de cumplimiento](docs/EVIDENCIAS.md) y [las incidencias](docs/PROBLEMAS-Y-SOLUCIONES.md). La aplicación y las pruebas locales se entregan; las capturas de Actions, URLs públicas y validaciones remotas requieren publicar este repositorio y ejecutar el flujo. No deben sustituirse por capturas simuladas.

## Fuentes técnicas

- GitHub: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Playwright: https://playwright.dev/docs/test-projects

Se consultaron las fuentes para el uso de artefactos de Pages, permisos y proyectos de navegadores. La implementación y sus resultados se documentan por separado.
