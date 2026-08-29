# Portafolio de Paolo Gonzales

Landing profesional de Paolo Gonzales, especialista en AppSheet, automatización y digitalización de procesos empresariales.

## Sitio publicado

[Ver el portafolio en línea](https://paolo-gonzales-portafolio.lui69i.chatgpt.site)

> El despliegue de Sites tiene acceso privado y puede solicitar iniciar sesión.

## Rutas disponibles

- `/`: portafolio, experiencia, casos de éxito, servicios y contacto.
- `/cursos`: cursos de AppSheet Básico e Intermedio y AppSheet Avanzado, con pagos mediante PayPal.

> La ruta `/digitalizacion` todavía no forma parte de esta versión del proyecto.

## Caso PLUZ 360 — recorrido visual

La nueva página de caso de estudio adapta los cinco estados reales de la animación `Dashboard/KPI's` del proyecto [evaluacion-pluz-360](https://github.com/paolo-gonzalesmoya/evaluacion-pluz-360). El avatar circular gris representa siempre al líder evaluado; los elementos azul, verde, dorado y violeta representan los roles Colaborador, Pares, Jefe directo y Cliente. Las ilustraciones no contienen texto generado: títulos, métricas y explicaciones se añadirán como HTML accesible.

1. **S001 — Hasta cuatro roles por líder.** Dos configuraciones muestran un líder vinculado a tres roles y otro vinculado a cuatro. Las líneas representan únicamente la configuración de roles asignados; no significan que una respuesta o evaluación ya haya sido realizada.
2. **S002 — No todos reúnen los cuatro.** Dos configuraciones adicionales muestran los casos de un rol y dos roles. Esta variación depende de la asignación de cada líder y permite explicar que no todos reciben feedback desde las cuatro perspectivas.
3. **S003 — El feedback avanza hacia el líder.** Cuatro badges de rol rodean al líder y cada conector incorpora una flecha y un pulso de su propio color dirigidos hacia el centro. En esta escena recién se representa el flujo de feedback, siempre en un solo sentido: hacia la persona evaluada.
4. **S004 — Combinar sin exponer.** Las respuestas aparecen como satélites anónimos que convergen en su rol: 6 azules, 4 verdes, 1 dorado y 2 violetas. Estas cantidades son ilustrativas y provienen del componente SVG; no representan el total real de respuestas de la campaña. El concepto principal es que las respuestas se agregan por rol y ninguna queda expuesta individualmente.
5. **S005 — Un promedio claro.** El avatar queda dentro de un anillo de progreso azul de aproximadamente 84%, equivalente al ejemplo visual `4.2/5` del componente. La tarjeta de resultado se mantiene vacía en la imagen para superponer el valor mediante HTML; el ejemplo no se presenta como una métrica global de la campaña.

Los archivos de planificación, prompts, referencias y revisión están en `planning/evaluacion-pluz-360/`. La página comparativa para aprobar las escenas es `planning/evaluacion-pluz-360/review.html`.

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
