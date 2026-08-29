# Roadmap — Recorrido 360 para PLUZ

## 1. Tabla de escenas

| Escena | Beat original de la animación | Traducción visual | Entrada / transición hacia la siguiente escena |
|---|---|---|---|
| S001 | Hasta 4 roles por líder | Dos mini-diagramas grandes: líder con 3 roles y líder con 4 roles | La cámara se acerca al avatar del líder con 4 roles |
| S002 | No siempre aparecen los 4 | Dos mini-diagramas grandes: líder con 1 rol y líder con 2 roles | La cámara atraviesa el avatar del líder con 2 roles |
| S003 | Feedback en un solo sentido | Un avatar central y cuatro badges de rol; flechas y pulsos viajan únicamente desde los badges hacia el líder | La cámara sigue un pulso hasta el avatar central |
| S004 | Respuestas combinadas sin exposición individual | Satélites de respuestas —6, 4, 1 y 2— se acercan a su badge de rol; los badges permanecen conectados al líder | La cámara entra en uno de los badges consolidados |
| S005 | Promedio claro para el evaluado | Avatar central rodeado por un anillo azul parcial y una tarjeta superior reservada para el promedio HTML | El anillo se amplía y libera el contenido técnico del caso |

## 2. Sistema de continuidad del protagonista visual

1. `AnimacionRoles.tsx` y las referencias rasterizadas de cada beat son la fuente estructural; el logo original de PLUZ es solo una referencia cromática secundaria.
2. S001 se aprueba como **visual anchor** de avatar, nodos, extrusión, paleta, cámara y sombras.
3. Desde S002 se adjuntan a cada generación la referencia SVG específica del beat y la imagen S001 aprobada.
4. Se bloquean el avatar circular pizarra, el símbolo blanco, los cuatro colores exactos, el grosor de conectores y la extrusión fina.
5. Solo cambian la cantidad y tipo de nodos, la dirección de las líneas y el estado narrativo que ya existe en el componente original.

## 3. Dirección artística

- Cámara: isométrica suave y poco inclinada de aproximadamente 25°, encuadre cercano, lente consistente y composición que siempre sugiere avance hacia el objeto de transición.
- Materiales e iluminación: traducción 2.5D premium del SVG original, piezas finas de acrílico mate, extrusión contenida, geometría nítida, fondo blanco, iluminación neutra y las mismas sombras elípticas suaves del componente.
- Paleta con función: blanco y marfil cálido como campo dominante; azul PLUZ `#2F58A1` para estructura y datos principales; verde PLUZ `#66AE3B`, dorado PLUZ `#F7B900` y violeta `#8B5CF6` para distinguir las cuatro perspectivas; grafito `#1F2430` solo para contraste fino.
- Motivo conector: los avatares circulares, badges redondeados, nodos de color y líneas finas de `AnimacionRoles.tsx`. Las líneas solo adquieren dirección cuando el beat original representa flujo de feedback.
- Textos, cifras, logotipos, nombres de roles, dashboards detallados y CTA permanecen en HTML/SVG; nunca se generan dentro de la imagen.

Bloque canónico que se repite literalmente en cada prompt: “VISUAL LANGUAGE: premium 2.5D isometric translation of the source Dashboard SVG, fixed shallow 25-degree camera, generous white space, thin matte-acrylic pieces, restrained extrusion, crisp geometry and soft elliptical drop shadows, with no environmental scenery. Preserve the SVG hierarchy: an evaluated leader is a large slate gradient circle (#64748B to #334155) with a thin white person outline; roles use exact PLUZ blue (#2F58A1), PLUZ green (#66AE3B), PLUZ gold (#F7B900) and violet (#8B5CF6); connectors are straight slim colored strokes. The connection motif changes truthfully by stage: role-configuration scenes use non-directional lines, and only later feedback scenes use arrowheads or moving pulses. The result must feel like the original SVG made physical — clear, instructional, elegant and trustworthy — never like a generic 3D infographic, toy diorama or science-fiction dashboard.”

## 4. Recomendación de producción

Cinco escenas 16:9 creadas como imágenes fijas, una por cada beat real de `AnimacionRoles.tsx`. Cada escena se compone conceptualmente en fondo, diagrama y objeto de transición para que el frontend pueda aplicar parallax, escala, desenfoque y crossfade. Los textos y cifras son HTML/SVG real. Esta primera entrega no necesita motor 3D, video ni una licencia de template.

Presupuesto inicial objetivo: S001 y la escena siguiente precargadas en WebP responsivo, con un máximo combinado de 900 KB en escritorio y 550 KB en móvil. El resto se carga de forma anticipada según el progreso del scroll.

## 5. Arquitectura de la landing

- `PluzScrollJourney`: controlador único del progreso global, escena activa y progreso local.
- `PluzJourneyStage`: escenario sticky a pantalla completa conducido por el controlador.
- `PluzScene`: compositor de fondo, personaje, primer plano, objeto de transición y conducto luminoso.
- `PluzSceneCopy`: títulos, explicación, evidencia y CTA en HTML accesible.
- `PluzRolesAnimation`: adaptación de la animación de `components/AnimacionRoles.tsx` del proyecto fuente; conserva escenas, temporización y reinicio, ajustando solamente su presentación al portafolio.
- `PluzMetricsOverlay`: cifras reales de campaña presentadas después del recorrido visual como HTML accesible.
- `PluzStaticJourney`: secuencia vertical completa, sin transformaciones vinculadas al scroll, usada en móvil y con `prefers-reduced-motion: reduce`.
- Shell del caso: encabezado, navegación de regreso, ficha técnica, contribución, repositorio y CTA siguiendo las páginas existentes del portafolio.

## 6. Orden de implementación

1. Aprobar S001 como apariencia definitiva de la traducción 2.5D del SVG.
2. Generar S002–S005 adjuntando su referencia específica y S001 aprobada.
3. Preparar las capas que requieren parallax y los dispositivos de transición.
4. Construir el recorrido principal y mantener métricas, animación y dashboards como HTML/SVG real.
5. Integrar la ficha técnica y los bloques explicativos dentro del patrón visual de los otros casos.
6. Optimizar imágenes, movimiento reducido, carga progresiva y fallback móvil.
7. Crear una imagen social coherente cuando la página esté aprobada.
8. Validar, publicar una vista previa y revisarla antes de sustituir la versión en producción.

## Puerta de aprobación

S001 fue aprobada como dirección visual con la solicitud de aplicar un zoom moderado antes de producir S002–S005. La revisión final debe responder:

1. ¿La composición conserva la lógica del primer beat del SVG: configuraciones de 3 y 4 roles?
2. ¿Evita representar evaluadores individuales, respuestas o resultados antes de tiempo?
3. ¿El zoom y la traducción 2.5D se sienten claros, elegantes y propios de PLUZ?
