# Robin Platform

Portal web de Project Robin desplegado en Netlify. El frontend React/Vite se publica
en `/portal/`; la API del mismo origen se ejecuta en Netlify Functions y accede a los
proveedores externos únicamente desde backend.

## Desarrollo local

Requisitos: Node.js 20 o posterior. Copiar `.env.example` a un archivo local que no se
versione y completar solo las variables necesarias para el flujo que se vaya a probar.

```bash
npm ci
npm --prefix portal-source ci --include=dev
npm --prefix portal-source run dev
```

El conjunto completo de verificaciones se describe en [docs/TESTING.md](docs/TESTING.md). Nunca
se deben guardar secretos, datos personales ni exports de producción en Git.

## Documentación principal

- [Árbol navegable del código](docs/codebase/README.md): recorrido de todas las carpetas y archivos del repositorio.
- [Arquitectura](docs/ARCHITECTURE.md): límites y flujo del sistema.
- [Mapa de archivos](docs/FILE_MAP.md): responsabilidad y dependencias por módulo.
- [Datos actuales](docs/DATABASE_CURRENT.md): snapshot estructural conocido.
- [Autorización](docs/AUTHORIZATION.md): principales, roles y ownership.
- [Integraciones](docs/INTEGRATIONS.md): proveedores, efectos laterales y reintentos.
- [Operación](docs/OPERATIONS.md): despliegue, rollback y diagnóstico.
- [Inventario API](docs/API_INVENTORY.md): inventario generado de Functions.
- [Entorno](docs/ENVIRONMENT.md): variables de entorno sin valores.

Toda la documentación mantenida, salvo este README principal, vive en `docs/`.
