# Código fuente del frontend

[← Subir un nivel](../README.md)

**Ruta real:** `portal-source/src/`

Composición React, sesión, cliente API, estilos y utilidades del navegador.

**Entra aquí:** Cuando cambies comportamiento o presentación del portal.

## Subcarpetas

| Carpeta | Qué contiene | Entra aquí cuando |
|---|---|---|
| [`application/`](application/README.md) | Pantallas principales de alumnos y administración, organizadas por dominio. | Cuando cambies una sección funcional del portal autenticado. |
| [`assets/`](assets/README.md) | Logotipos importados y procesados por Vite. | Cuando sustituyas identidad visual utilizada desde componentes. |
| [`shared/`](shared/README.md) | Componentes reutilizados por varias superficies autenticadas. | Cuando un cambio visual o de interacción afecte a más de un portal. |

## Archivos

| Archivo | Qué hace | Relaciones clave | Modifícalo cuando |
|---|---|---|---|
| [`api.js`](../../../../portal-source/src/api.js) | Cliente único de las rutas `/api/*` consumidas por el navegador. | `./preview-api.js` | Al cambiar esa parte de la experiencia React. |
| [`app.jsx`](../../../../portal-source/src/app.jsx) | Raíz de autenticación y selección entre portal de alumno y administración. | `./assets/robin-logo-transparent.png`<br>`./session.js`<br>`./theme.js`<br>`./ui.jsx`<br>`./client-utils.js`<br>`./application/AdminPortal.jsx` | Al cambiar esa parte de la experiencia React. |
| [`application-steps.js`](../../../../portal-source/src/application-steps.js) | Definición de fases y pasos visibles del expediente. | — | Al cambiar esa parte de la experiencia React. |
| [`browser-utils.js`](../../../../portal-source/src/browser-utils.js) | Utilidades que dependen de APIs disponibles solo en navegador. | — | Al cambiar esa parte de la experiencia React. |
| [`client-utils.js`](../../../../portal-source/src/client-utils.js) | Formato, logging seguro e imágenes auxiliares del frontend. | — | Al cambiar esa parte de la experiencia React. |
| [`index.css`](../../../../portal-source/src/index.css) | Estilos globales y configuración base de Tailwind. | — | Al cambiar esa parte de la experiencia React. |
| [`main.jsx`](../../../../portal-source/src/main.jsx) | Arranque de React en el DOM. | `./app.jsx` | Al cambiar esa parte de la experiencia React. |
| [`preview-api.js`](../../../../portal-source/src/preview-api.js) | Módulo frontend de preview api. | — | Al cambiar esa parte de la experiencia React. |
| [`questionnaire-data.js`](../../../../portal-source/src/questionnaire-data.js) | Preguntas y opciones del cuestionario de perfil. | — | Al cambiar esa parte de la experiencia React. |
| [`session.js`](../../../../portal-source/src/session.js) | Clasificación frontend de la sesión y del principal administrativo. | `../../shared/application-roles.cjs` | Al cambiar esa parte de la experiencia React. |
| [`theme.js`](../../../../portal-source/src/theme.js) | Tokens de color compartidos por los componentes. | — | Al cambiar esa parte de la experiencia React. |
| [`ui.jsx`](../../../../portal-source/src/ui.jsx) | Primitivas visuales reutilizables como botones y campos. | `./theme.js` | Al cambiar esa parte de la experiencia React. |

---

Este README se regenera con `node scripts/generate-codebase-docs.js`. No lo edites de forma aislada: mejora el generador o la documentación fuente.
