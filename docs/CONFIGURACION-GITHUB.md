# Publicación y ejecución real

## 1. Crear el repositorio

Crea un repositorio vacío llamado, por ejemplo, gestor-academico. GitHub Pages para repositorios privados depende del plan; un repositorio público evita ese requisito. Si usas la carpeta entregada con su historial Git, ejecuta:

```sh
git remote add origin https://github.com/TU-USUARIO/gestor-academico.git
git push -u origin main
git push -u origin develop
git push -u origin feature/base-academica
```

Sustituye TU-USUARIO por el propietario real. Si extrajiste el ZIP, que no contiene .git, inicia antes el historial:

```sh
git init -b main
git add .
git commit -m "feat: gestor académico y flujo de entrega continua"
git branch develop
git branch feature/base-academica
```

## 2. Preparar Pages y ambientes antes del despliegue

En Settings > Pages, selecciona GitHub Actions como fuente. En Settings > Environments crea `pruebas` y `preproduccion`, y permite despliegues desde main. Si GitHub crea `github-pages` automáticamente, el flujo utiliza los dos nombres anteriores. Verifica las reglas del repositorio y la disponibilidad de Pages en tu cuenta.

No agregues secretos: se usan GITHUB_TOKEN y OIDC con permisos pages:write e id-token:write únicamente en los trabajos de despliegue. Permite Actions en Settings > Actions. Usa ejecutores hospedados de GitHub.

El primer push podría iniciar antes de habilitar Pages. Una vez configurado, en Actions selecciona el flujo, Run workflow y main, o vuelve a ejecutar el intento fallido.

## 3. Proteger las ramas

Después de la primera ejecución crea reglas para main y develop en Settings > Rules > Rulesets o Branch protection: exigir pull request, revisión y los tres controles `Validar (ubuntu-latest)`, `Validar (windows-latest)` y `Validar (macos-latest)`. Configura sus nombres tal como aparezcan en la ejecución. No exijas aprobación de otra persona si no cuentas con un colaborador disponible; documenta esa limitación del ejercicio.

Comprueba que las reglas también se apliquen a los administradores si necesitas demostrarlo. Estas configuraciones dependen de permisos y plan: no están aplicadas por los archivos locales.

## 4. Flujo demostrable

1. Crea una rama feature/ajuste, modifica un texto y abre un PR hacia develop.
2. Captura la validación automática. Integra el PR.
3. Abre y valida un PR develop → main. Integra cuando pasen los controles.
4. En el push a main espera todos los trabajos, incluida verify-preproduction.
5. Descarga el artefacto `sistema-validado-<SHA>` y los reportes de los ambientes.
6. Abre los enlaces de los ambientes en la ejecución. Las rutas serán `/gestor-academico/pruebas/` y `/gestor-academico/preproduccion/` bajo el dominio de Pages del propietario. Son formatos esperados, no URLs comprobadas.
7. Revisa version.json: su commit debe coincidir con el commit de la ejecución.
8. Guarda capturas, enlaces, SHA, fecha, resultados y problemas reales en la matriz de evidencias.

## 5. Liberación y recuperación

No se incluye un despliegue a producción. La aprobación de una liberación exige la última verificación remota exitosa, revisión de incidencias y aceptación del responsable. Un tag v1.0.0 puede identificar la versión aceptada después de esa revisión; el flujo actual no se activa por tags.

Si una versión falla, el pipeline bloquea los pasos dependientes y conserva los reportes disponibles. Corrige el cambio o revierte el commit mediante un PR; el nuevo push a main valida y despliega nuevamente. Descargar un artefacto antiguo no produce por sí solo un rollback remoto.

## Limitación del alojamiento compartido

Los dos ambientes son rutas de un mismo sitio Pages y tienen datos locales separados. Al publicar la fase de pruebas se reemplaza el sitio anterior y la ruta preproduccion puede quedar temporalmente indisponible. Si la verificación de pruebas falla, no se promueve y esa ruta no se restaura automáticamente. Es una simplificación académica, no aislamiento de infraestructura. Si tu docente requiere ambientes independientes o conservar siempre preproducción, usa dos sitios/repositorios de despliegue antes de la entrega. No alojes producción en este mismo sitio.
