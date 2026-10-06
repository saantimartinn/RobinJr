# Backend architecture

Netlify Functions son los entrypoints HTTP y programados. La lógica compartida reside en
`lib/`; la limpieza no cambia URLs vigentes de alumnos/admins ni unidades de despliegue.

## Capas por dominio

| Dominio | Responsabilidad del entrypoint | Servicios compartidos |
|---|---|---|
| Auth | método, origen, credenciales y cookie | `auth`, `identity`, `authorization` |
| Pagos | sesión, intento y respuesta del proveedor | `payments`, `payment_attempts`, `revolut`, configuración financiera |
| Documentos | auth/ownership, ticket firmado y confirmación | `storage`, `document-drive`, `google-drive` |
| Reservas | sesión, input y transacción Calendar | `booking-availability`, `booking-create`, `google-calendar` |
| Administración | sesión/rol y respuesta | `admin-dashboard`, `career-suggestions` |
| Integraciones | firma/secreto y respuesta | `integration-sync`, `notion`, `meet-transcript`, adaptadores externos |

## Reglas

- Functions poseen los detalles HTTP; los servicios no leen eventos Netlify.
- Los servicios reciben IDs y datos autenticados explícitos.
- La autorización ocurre antes de invocar servicios.
- Los binarios académicos van del navegador a Storage mediante una URL firmada temporal;
  la service role nunca llega al frontend y Netlify sólo procesa metadatos pequeños.
- Los adaptadores permanecen idempotentes donde existen reintentos.
- Una abstracción nueva debe reducir duplicación real.
- Se conserva un único despliegue hasta que una necesidad operativa medida justifique otro.
- Las Functions tienen un presupuesto uniforme de 220 líneas físicas en CI.
