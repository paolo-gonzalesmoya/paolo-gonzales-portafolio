# Roadmap — Paolo dentro del mundo operativo

## Dirección corregida

El elemento diferencial será ver a **Paolo trabajando dentro de cada escena**. No será una sucesión de paisajes corporativos: será un recorrido por su jornada profesional. Su apariencia, ropa y proporciones permanecerán constantes mientras cambia el entorno.

La referencia `scroll-world` aporta la lógica de cámara y transición: miniaturas 3D, profundidad, pausas narrativas y acercamientos. La identidad visual será original y estará construida alrededor de automatización, operaciones y AppSheet.

## Recorrido de ocho escenas

| Escena | Paolo está… | Entorno | Transición al siguiente capítulo |
|---|---|---|---|
| S001 | Analizando trabajo manual | Oficina-estudio con escritorio, hojas y monitor | La cámara entra en la pizarra del proceso |
| S002 | Entrevistando y observando | Sala de diagnóstico con mapa operativo | Una línea del mapa se convierte en flujo de datos |
| S003 | Construyendo una aplicación | Laboratorio digital con móvil, reglas y base de datos | La cámara atraviesa la pantalla del celular |
| S004 | Acompañando la operación | Obra/almacén modular con registro desde campo | Un dato capturado viaja por un conducto luminoso |
| S005 | Automatizando el recorrido | Taller de alertas, firmas, aprobaciones y PDFs | Un documento final se transforma en gráfico |
| S006 | Leyendo resultados | Centro de control con casos TIMCO/PDK/Parte Diario | La cámara atraviesa un dashboard y llega al aula |
| S007 | Capacitando al equipo | Estudio de formación práctica en AppSheet | Una ruta de aprendizaje vuelve hacia la oficina |
| S008 | Conversando con el visitante | Oficina abierta con una silla disponible | CTA de WhatsApp y correo |

## Sistema de continuidad del personaje

1. La fotografía actual de Paolo funciona como referencia de identidad.
2. S001 se genera primero y se aprueba como **character anchor**.
3. Para S002–S008 se adjuntan tanto la fotografía como S001.
4. Se bloquean rostro, peinado, camisa negra, chaqueta gris con interior beige, proporciones, acabado de piel y escala.
5. Solo cambian pose, herramienta y escenario.

## Dirección artística

- Miniatura 3D isométrica editorial, más adulta y tecnológica que caricaturesca.
- Cámara fija aproximada de 35 grados y movimiento siempre hacia delante.
- Materiales mate, arquitectura modular, sombras suaves y profundidad de campo contenida.
- Paleta: tinta nocturna, hueso cálido, violeta eléctrico, cian de señal, coral para fricción y verde para resultados.
- El flujo de datos luminoso es el elemento que conecta todas las escenas.
- Textos, cifras, botones, logos y dashboards detallados permanecen en HTML.

## Recomendación de producción

### Primera entrega

Ocho imágenes 16:9 con Paolo, separadas en planos de fondo, personaje y objetos principales. El scroll aplica escala, desplazamiento, desenfoque y crossfade para simular el vuelo entre escenarios. Esta versión no necesita pagar generación de video.

### Video opcional

Si se produce video, el sitio debe recibir un único archivo maestro de 24–30 segundos. Si la herramienta externa solo permite dos clips, conviene generar:

- Clip A: S001 oficina → S004 trabajo en campo.
- Clip B: S005 automatización → S008 conversación final.

El corte debe ocurrir dentro del conducto luminoso que transporta un dato. Ambos clips deben compartir el mismo fotograma de frontera, dirección de cámara, lente, iluminación y 12–18 fotogramas de solape. Después se unen y exportan como un único video para la web.

## Arquitectura de la landing

- `ScrollJourney`: calcula progreso global y escena activa.
- `JourneyStage`: escenario sticky de pantalla completa.
- `PaoloScene`: fondo, capa de Paolo, objetos y flujo de datos.
- `SceneCopy`: título, texto, prueba del caso y CTA en HTML.
- `CaseOverlay`: dashboards reales de TIMCO, PDK y Parte Diario.
- Alternativa estática completa para móvil y `prefers-reduced-motion`.

## Orden de implementación

1. Aprobar S001 como apariencia definitiva de Paolo y del mundo 3D.
2. Generar S002–S008 usando S001 como ancla visual.
3. Separar las capas que necesitan parallax.
4. Maquetar el recorrido principal y conservar los casos reales como HTML.
5. Adaptar `/cursos` al mismo universo visual con una experiencia más corta.
6. Optimizar imágenes, movimiento reducido y carga progresiva.
7. Crear una sola imagen social coherente con la landing terminada.
8. Validar, publicar una vista previa en Sites y revisar antes de sustituir la versión actual.

## Puerta de aprobación

La nueva muestra S001 debe responder tres preguntas: ¿se reconoce a Paolo?, ¿la oficina comunica digitalización de procesos?, ¿el estilo se siente suficientemente premium? Después de esa aprobación se generan las otras siete escenas.
