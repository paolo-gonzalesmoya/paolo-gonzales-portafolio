# Portafolio de Paolo Gonzales

Landing profesional de Paolo Gonzales, especialista en AppSheet, automatización y digitalización de procesos empresariales.

## Rutas disponibles

- `/`: portafolio, experiencia, casos de éxito, servicios y contacto.
- `/cursos`: cursos de AppSheet Básico e Intermedio y AppSheet Avanzado, con pagos mediante PayPal.

> La ruta `/digitalizacion` todavía no forma parte de esta versión del proyecto.

## Tecnologías

- React 19
- Next.js 16
- TypeScript
- Vinext y Vite
- Cloudflare Workers
- CSS responsive con animaciones accesibles

## Requisitos

- Node.js 22.13 o superior
- npm
- Linux o WSL para ejecutar los scripts de construcción incluidos

## Desarrollo local

```bash
# Instala exactamente las versiones registradas en package-lock.json.
npm ci

# Inicia el servidor de desarrollo.
npm run dev
```

## Validación

```bash
# Genera y valida el artefacto de producción.
npm run build

# Ejecuta las pruebas incluidas.
npm test
```

## Modificaciones con Claude Code

```bash
# Clona el repositorio.
git clone https://github.com/paolo-gonzalesmoya/paolo-gonzales-portafolio.git

# Entra al proyecto e instala las dependencias.
cd paolo-gonzales-portafolio
npm ci

# Abre Claude Code desde la raíz del proyecto.
claude
```

Las imágenes utilizadas por la web están en `public/assets/`. Las páginas principales están en `app/page.tsx` y `app/cursos/page.tsx`; los estilos compartidos están en `app/globals.css`.

## Seguridad

El repositorio no contiene claves secretas ni credenciales de Stripe. Los correos y enlaces de contacto presentes en el código son información pública utilizada por la landing.
