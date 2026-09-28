# Frontend architecture

El frontend es una sola aplicación React/Vite para alumnos y personal administrativo.
`app.jsx` resuelve la sesión, onboarding y portal correspondiente; las pantallas de negocio
viven en módulos de aplicación.

## Límites actuales

| Módulo | Responsabilidad |
|---|---|
| `app.jsx` | sesión, login y composición raíz |
| `application/onboarding/OnboardingFlow.jsx` | origen, DNI, contrato, cuestionario y primer pago |
| `application/ApplicationPortals.jsx` | shell y secciones del alumno |
| `application/AdminPortal.jsx` | shell y herramientas del advisor/admin |
| `application/ClientSections.jsx` | pagos, carreras y documentos del alumno |
| `application/payments/InvoiceReceipt.jsx` | justificante imprimible |
| `shared/PortalWidgets.jsx` | notificaciones, KPI y filas reutilizadas |
| `client-utils.js` | formato, logging cliente e imágenes |

No se añadió Context, Redux, Zustand ni router: el estado existente no demuestra que haga
falta otra capa.

## Invariantes

1. `app.jsx` solo coordina autenticación y el portal activo.
2. Las llamadas API permanecen en el componente que posee el flujo.
3. Los widgets compartidos no importan portales completos ni crean ciclos.
4. Cada extracción exige mapa regenerado, bindings resueltos y build de producción.

`COMPONENT_MAP.md` se regenera en CI. `scripts/check-frontend-bindings.js` impide referencias
JSX/JavaScript no importadas. El chunk inicial permanece bajo observación y cualquier nueva
división debe basarse en medición real de carga y uso.
