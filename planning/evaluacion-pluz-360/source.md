# Fuente narrativa — Evaluación de Liderazgo 360 para PLUZ

## Idea rectora

El avatar circular del líder es el centro visual recurrente. A su alrededor cambian las configuraciones de roles, el sentido del feedback, la combinación de respuestas y finalmente el anillo de promedio, siguiendo exactamente los cinco beats de `AnimacionRoles.tsx`. La cámara avanza siempre hacia ese avatar o atraviesa uno de los objetos del propio diagrama. La experiencia toma del referente `scroll-world` únicamente la lógica de cámara, profundidad y pausas narrativas; la gramática visual y el contenido nacen del SVG real de PLUZ.

## Referencia del protagonista visual

- Referencia visual principal: `references/animacion-roles-s001.png`, reconstruida directamente desde la geometría, paleta y composición de `components/AnimacionRoles.tsx`.
- Referencia cromática secundaria: `../../work/evaluacion-pluz-360-source/public/logo-pluz.png`; el logo no se dibuja dentro de las escenas.
- Protagonista visual recurrente: el avatar circular del líder evaluado, con degradado gris pizarra y símbolo de persona blanco.
- Rasgos fijos: geometría circular, degradado `#64748B`→`#334155`, contorno blanco, proporción, extrusión fina y sombra elíptica.
- Los roles se muestran como nodos o badges geométricos en los cuatro colores del componente; no representan a Paolo ni a personas reconocibles.
- S001 se genera primero como ancla de la traducción 2.5D del SVG: avatar circular, nodos de roles, conectores, paleta y sombras. Una vez aprobada, S001 se convierte en referencia visual obligatoria para S002–S005.

## Guion visual acordado

1. “Cada líder puede recibir feedback de hasta 4 roles: colaborador, pares, jefe directo y cliente.”
2. “Pero no siempre se dan los 4: algunos tienen solo 2, y el caso de 1 solo rol es muy poco común.”
3. “El feedback fluye en un solo sentido: siempre hacia quien es evaluado.”
4. “Las respuestas se combinan — ninguna queda expuesta por sí sola.”
5. “Todo se traduce en un promedio claro para la persona evaluada.”

## Contenido real que alimenta las escenas

- Plataforma hecha a medida para PLUZ Energía Perú S.A.A., desarrollada por VUCA Consultoría para Asertiva Consulting.
- Flujo completo: autenticación, asignaciones por rol, formulario, cierre de evaluación, administración y dashboard.
- Escala verificada: 671 evaluadores, 87 líderes evaluados y 1,109 relaciones evaluador↔evaluado.
- Instrumento: 52 preguntas de escala 1–5 y 4 preguntas abiertas de cierre.
- Cuatro roles posibles: Colaborador, Pares, Jefe directo y Cliente.
- Distribución real de roles: 2 líderes con 1 rol, 3 con 2, 18 con 3 y 63 con los 4.
- Flujo unidireccional hacia el líder evaluado, sin autoevaluación ni benchmark externo.
- Confidencialidad por diseño: los paneles del cliente reciben promedios y conteos agregados, nunca una respuesta o comentario individual.
- Umbral de confiabilidad: mínimo de 2 respuestas por líder; la pestaña “Cuota mínima” permite supervisarlo.
- Dashboard real: KPIs, Cumplimiento, Cuota mínima, Métricas, Liderazgo por Gerencia e Indicadores de Preguntas.
- Tres niveles administrativos: superadmin, viewer y viewer_basico, con capacidades distintas.
- Stack verificado: Next.js 16, React 19, Supabase/Postgres/Auth/RLS, Tailwind CSS v4, Recharts y Vercel.
- Animación original de roles hecha a mano con SVG y CSS. La página del portafolio debe adaptar su lógica como una capa HTML/SVG real; no debe convertirla en una ilustración estática.
- CTA final: revisar el caso técnico y conversar sobre un proceso de evaluación o seguimiento que necesite digitalización.

## Restricciones

- S001 y S002 representan únicamente configuraciones de roles. S003 muestra pulsos del mismo color de cada rol viajando hacia el líder. S004 usa las cantidades ilustrativas exactas del componente —6, 4, 1 y 2 satélites— para explicar la combinación por rol. S005 muestra el anillo de promedio.
- Paolo no aparece generado dentro de las ilustraciones. Su autoría, contribución y fotografía real se presentan mediante HTML en la ficha del caso y el CTA final.
- No se generan textos, números, logotipos, botones, nombres de roles ni etiquetas de interfaz dentro de las imágenes. Todo contenido verificable se superpone con HTML accesible.
- La animación de roles y los KPIs se implementan con componentes reales, no como texto o UI simulada dentro de una imagen.
- No se copia ningún escenario, personaje, paleta o recurso del template de referencia.
- El recorrido funciona con imágenes 2.5D y mecánicas CSS; el video no es una dependencia.
- La historia completa permanece comprensible como una secuencia estática en móvil y con `prefers-reduced-motion`.
- Las afirmaciones se limitan al código, README y migraciones verificadas del repositorio.
