# Experiencia de aplicación

[← Subir un nivel](../README.md)

**Ruta real:** `portal-source/src/application/`

Pantallas principales de alumnos y administración, organizadas por dominio.

**Entra aquí:** Cuando cambies una sección funcional del portal autenticado.

## Subcarpetas

| Carpeta | Qué contiene | Entra aquí cuando |
|---|---|---|
| [`documents/`](documents/README.md) | Reglas de presentación y estado de documentos. | Cuando cambies fases, documentos por defecto o etiquetas de estado. |
| [`onboarding/`](onboarding/README.md) | Flujo guiado de incorporación del alumno. | Cuando cambies pasos, formularios o navegación del onboarding. |
| [`payments/`](payments/README.md) | Presentación de pagos, facturas y justificantes. | Cuando cambies formato o experiencia visual de pagos. |

## Archivos

| Archivo | Qué hace | Relaciones clave | Modifícalo cuando |
|---|---|---|---|
| [`AdminPortal.jsx`](../../../../../portal-source/src/application/AdminPortal.jsx) | Composición principal del portal de administración. | `./AdminWorkspace.jsx`<br>`./Faqs.jsx`<br>`./admin-navigation.js`<br>`../assets/robin-keys.webp`<br>`../assets/robin-graduate.jpg`<br>`../assets/robin-skate.png` | Al cambiar esa parte de la experiencia React. |
| [`AdminWorkspace.jsx`](../../../../../portal-source/src/application/AdminWorkspace.jsx) | Módulo frontend de AdminWorkspace. | `../assets/robin-wordmark.png`<br>`../application-steps.js` | Al cambiar esa parte de la experiencia React. |
| [`ApplicationPortals.jsx`](../../../../../portal-source/src/application/ApplicationPortals.jsx) | Superficies principales de la experiencia del alumno. | `../assets/robin-wordmark.png`<br>`../assets/robin-keys.webp`<br>`../assets/robin-graduate.jpg`<br>`../assets/robin-skate.png`<br>`../assets/robin-bike.jpg`<br>`../../../shared/financial-config.cjs` | Al cambiar esa parte de la experiencia React. |
| [`ClientSections.jsx`](../../../../../portal-source/src/application/ClientSections.jsx) | Secciones de pagos, carreras y documentos del alumno. | `../ui.jsx`<br>`../theme.js`<br>`./payments/payment-utils.jsx`<br>`./documents/document-utils.js`<br>`./payments/InvoiceReceipt.jsx`<br>`../api.js` | Al cambiar esa parte de la experiencia React. |
| [`Faqs.jsx`](../../../../../portal-source/src/application/Faqs.jsx) | Módulo frontend de Faqs. | `../api.js`<br>`../ui.jsx` | Al cambiar esa parte de la experiencia React. |
| [`admin-navigation.js`](../../../../../portal-source/src/application/admin-navigation.js) | Módulo frontend de admin navigation. | — | Al cambiar esa parte de la experiencia React. |
| [`admin-portal.css`](../../../../../portal-source/src/application/admin-portal.css) | Módulo frontend de admin portal. | — | Al cambiar esa parte de la experiencia React. |
| [`student-portal.css`](../../../../../portal-source/src/application/student-portal.css) | Módulo frontend de student portal. | — | Al cambiar esa parte de la experiencia React. |

---

Este README se regenera con `node scripts/generate-codebase-docs.js`. No lo edites de forma aislada: mejora el generador o la documentación fuente.
