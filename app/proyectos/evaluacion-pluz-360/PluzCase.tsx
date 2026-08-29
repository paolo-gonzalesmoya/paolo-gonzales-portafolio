import Link from "next/link";
import PluzRolesAnimation from "./PluzRolesAnimation";

const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20el%20caso%20de%20Evaluaci%C3%B3n%20360%20y%20quiero%20conversar%20sobre%20un%20proceso%20que%20necesito%20digitalizar.";
const calComUrl = "https://cal.com/paolo-gonzales-8itwaw";

const journeySteps = [
  {
    number: "01",
    eyebrow: "Asignación",
    title: "Asignar los roles correctos.",
    copy: "Cada líder recibe las perspectivas que corresponden a su realidad: Colaboradores, Pares, Jefe directo y Cliente. Como no todos tienen la misma red, la configuración cambia por persona y respeta la estructura definida para su evaluación.",
    evidence: "De 1 a 4 roles según el diseño de cada evaluación.",
    image: "/assets/projects/pluz-360/scene-01.webp",
    alt: "Dos configuraciones muestran líderes conectados a tres y cuatro roles",
    score: null,
  },
  {
    number: "02",
    eyebrow: "Medición",
    title: "Dirigir el feedback al líder.",
    copy: "La plataforma mantiene el sentido de la evaluación: las respuestas provienen de los roles asignados y se concentran en la persona evaluada, sin alterar la lógica del instrumento.",
    evidence: "El sistema hace cumplir el flujo definido.",
    image: "/assets/projects/pluz-360/scene-03.webp",
    alt: "Cuatro roles envían feedback hacia un líder central",
    score: null,
  },
  {
    number: "03",
    eyebrow: "Confidencialidad",
    title: "Proteger antes de mostrar.",
    copy: "Las respuestas se consolidan dentro de cada rol antes de llegar al dashboard. La lectura conserva el valor de la medición sin convertir una opinión individual en información expuesta.",
    evidence: "El cliente consulta resultados agregados.",
    image: "/assets/projects/pluz-360/scene-04.webp",
    alt: "Grupos de respuestas anónimas convergen en cuatro roles",
    score: null,
  },
  {
    number: "04",
    eyebrow: "Lectura",
    title: "Convertir percepciones en lectura.",
    copy: "El resultado reúne las perspectivas en indicadores comprensibles por rol y en conjunto. El 4.2/5 es un ejemplo visual de la animación; la plataforma conserva el contexto real de cada evaluación.",
    evidence: "Una lectura clara, trazable y coherente con el modelo.",
    image: "/assets/projects/pluz-360/scene-05.webp",
    alt: "Un avatar aparece dentro de un anillo de promedio azul",
    score: "4.2",
  },
] as const;

export default function PluzCase() {
  return (
    <main className="timco-case pluz-case">
      <header className="timco-header pluz-header">
        <Link className="timco-brand" href="/" aria-label="Volver al portafolio de Paolo Gonzales">
          <span>PG</span><strong>Paolo Gonzales</strong>
        </Link>
        <nav aria-label="Navegación del caso de evaluación 360">
          <a href="#recorrido">Reglas</a>
          <a href="#modelo">Animación</a>
          <a href="#sistema">Sistema</a>
        </nav>
        <Link className="timco-header-link" href="/">Volver al portafolio <span>↗</span></Link>
      </header>

      <section id="top" className="pluz-hero">
        <div className="timco-shell pluz-hero-shell">
          <img className="pluz-hero-art" src="/assets/projects/pluz-360/hero-process-v2.png" alt="Cuatro perspectivas se consolidan de forma protegida antes de producir la lectura de un líder" />
          <div className="pluz-hero-wash" aria-hidden="true" />
          <div className="pluz-hero-copy">
            <div className="pluz-project-mark">
              <span>Diseño de proceso · Medición 360</span>
            </div>
            <h1>Evaluación<br /><em>360.</em></h1>
            <p className="pluz-hero-lead">Un proceso complejo convertido en una medición clara, confidencial y gobernada por reglas.</p>
            <p className="pluz-hero-description">No empezamos por una encuesta. Primero entendimos quién evalúa a quién, qué roles aplican y cómo debía protegerse cada respuesta. Desde ahí, el proceso se convirtió en una plataforma alineada con las reglas reales de una medición 360.</p>
            <div className="pluz-hero-actions">
              <a href="#recorrido">Entender las reglas <span>↓</span></a>
              <a href="#modelo">Ver cómo funciona</a>
            </div>
          </div>
        </div>
      </section>

      <section id="recorrido" className="pluz-journey">
        <div className="timco-shell pluz-journey-intro">
          <p>Reglas antes que pantallas</p>
          <h2>La medición define el sistema.</h2>
          <span>Cada decisión de producto nace de una regla del proceso 360: asignar bien, respetar los roles, proteger las respuestas y mostrar una lectura útil.</span>
        </div>
        <div className="timco-shell pluz-journey-stack">
          {journeySteps.map((step, index) => (
            <article key={step.number}>
              <div className="pluz-journey-visual">
                <img src={step.image} alt={step.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                <div className="pluz-journey-card-wash" aria-hidden="true" />
                {step.score ? (
                  <div className="pluz-journey-score" aria-label={`Promedio de ejemplo: ${step.score} de 5`}>
                    <span>Promedio</span>
                    <strong>{step.score}<small>/5</small></strong>
                  </div>
                ) : null}
              </div>
              <div className="pluz-journey-card-copy">
                <p className="pluz-overline"><span>{step.number}</span>{step.eyebrow}</p>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <small><i />{step.evidence}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="modelo" className="pluz-model-section">
        <div className="timco-shell">
          <div className="pluz-section-heading">
            <div>
              <p className="pluz-overline">El modelo en movimiento</p>
              <h2>Así funciona la medición 360.</h2>
            </div>
            <p>Inicia la secuencia o elige una escena para revisar cómo las reglas se convierten en una experiencia simple.</p>
          </div>
          <PluzRolesAnimation />
        </div>
      </section>

      <section id="sistema" className="pluz-system-summary">
        <div className="timco-shell pluz-system-summary-card">
          <div className="pluz-system-map" aria-label="Asignar, guiar, proteger y leer dentro del sistema 360">
            <div className="pluz-system-orbit" aria-hidden="true">
              <span><i>01</i>Asignar</span>
              <span><i>02</i>Guiar</span>
              <span><i>03</i>Proteger</span>
              <span><i>04</i>Leer</span>
              <strong>360<small>Proceso</small></strong>
            </div>
          </div>
          <div className="pluz-system-summary-copy">
            <p className="pluz-overline">Reglas convertidas en sistema</p>
            <h2>La lógica 360 vive dentro del sistema.</h2>
            <p>Asignar, guiar, proteger y leer dejan de ser pasos manuales: la plataforma aplica esas reglas en cada evaluación.</p>
            <div>
              <a href="#consulta">¿Tienes un proceso parecido? <span>→</span></a>
              <a href="#modelo">Explorar la animación <span>↑</span></a>
            </div>
          </div>
        </div>
      </section>

      <section id="consulta" className="pluz-cta">
        <div className="timco-shell pluz-cta-grid">
          <div>
            <p className="pluz-overline">Conversemos</p>
            <h2>Primero entendamos el proceso. Luego construimos.</h2>
            <p>Si hoy coordinas personas, reglas, permisos y reportes entre varias herramientas, podemos ordenar el recorrido antes de decidir qué tecnología necesita.</p>
          </div>
          <div className="pluz-cta-card">
            <span><i /> Agenda abierta</span>
            <h3>Una conversación breve para entender el proceso.</h3>
            <p>Elige un espacio de 15 o 30 minutos, o escríbeme directamente por WhatsApp.</p>
            <a href={calComUrl} target="_blank" rel="noreferrer">Ver horarios disponibles <span>↗</span></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">Coordinar por WhatsApp <span>↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
