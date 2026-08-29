import Link from "next/link";
import PluzRolesAnimation from "./PluzRolesAnimation";

const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20el%20caso%20de%20Evaluaci%C3%B3n%20360%20para%20PLUZ%20y%20quiero%20conversar%20sobre%20un%20proceso%20que%20necesito%20digitalizar.";
const calComUrl = "https://cal.com/paolo-gonzales-8itwaw";
const repositoryUrl = "https://github.com/paolo-gonzalesmoya/evaluacion-pluz-360";

const journeySteps = [
  {
    number: "01",
    eyebrow: "Asignación",
    title: "Definir los roles correctos.",
    copy: "Cada líder recibe las perspectivas que corresponden a su realidad: Colaboradores, Pares, Jefe directo y Cliente. La medición empieza asignando bien, no enviando formularios.",
    evidence: "De 1 a 4 roles según el diseño de la medición.",
    image: "/assets/projects/pluz-360/scene-01.webp",
    alt: "Dos configuraciones muestran líderes conectados a tres y cuatro roles",
  },
  {
    number: "02",
    eyebrow: "Configuración",
    title: "Respetar cada estructura.",
    copy: "No todos los líderes tienen la misma red. Las asignaciones cambian por persona y conservan la estructura definida para la campaña, sin forzar relaciones que no existen.",
    evidence: "Cada líder conserva su propia configuración.",
    image: "/assets/projects/pluz-360/scene-02.webp",
    alt: "Dos configuraciones muestran líderes conectados a uno y dos roles",
  },
  {
    number: "03",
    eyebrow: "Medición",
    title: "Dirigir el feedback al líder.",
    copy: "La plataforma mantiene el sentido de la evaluación: las respuestas provienen de los roles asignados y se concentran en la persona evaluada, sin alterar la lógica del instrumento.",
    evidence: "El sistema hace cumplir el flujo definido.",
    image: "/assets/projects/pluz-360/scene-03.webp",
    alt: "Cuatro roles envían feedback hacia un líder central",
  },
  {
    number: "04",
    eyebrow: "Confidencialidad",
    title: "Proteger antes de mostrar.",
    copy: "Las respuestas se consolidan dentro de cada rol antes de llegar al dashboard. La lectura conserva el valor de la medición sin convertir una opinión individual en información expuesta.",
    evidence: "El cliente consulta resultados agregados.",
    image: "/assets/projects/pluz-360/scene-04.webp",
    alt: "Grupos de respuestas anónimas convergen en cuatro roles",
  },
  {
    number: "05",
    eyebrow: "Lectura",
    title: "Convertir percepciones en lectura.",
    copy: "El resultado reúne las perspectivas en indicadores comprensibles por rol y en conjunto. Así, el dashboard ayuda a leer patrones sin perder el contexto de la evaluación.",
    evidence: "Una lectura clara, trazable y coherente con el modelo.",
    image: "/assets/projects/pluz-360/scene-05.webp",
    alt: "Un avatar aparece dentro de un anillo de promedio azul",
  },
] as const;

const systemLayers = [
  {
    number: "01",
    title: "Asignar con precisión",
    copy: "Cada evaluador accede únicamente a los líderes y roles definidos para su participación.",
    tags: ["Asignaciones", "Roles", "Acceso controlado"],
  },
  {
    number: "02",
    title: "Capturar sin fricción",
    copy: "El formulario aplica las reglas del instrumento, conserva el avance y ordena cada respuesta por relación y rol.",
    tags: ["Next.js", "React", "Guardado seguro"],
  },
  {
    number: "03",
    title: "Proteger por diseño",
    copy: "Autenticación, permisos y políticas de datos separan las respuestas individuales de la lectura que consume el cliente.",
    tags: ["Supabase Auth", "Postgres", "RLS"],
  },
  {
    number: "04",
    title: "Leer para decidir",
    copy: "El dashboard convierte avance y resultados agregados en una lectura ejecutiva útil para el seguimiento de la campaña.",
    tags: ["Indicadores", "Recharts", "Lectura ejecutiva"],
  },
] as const;

export default function PluzCase() {
  return (
    <main className="timco-case pluz-case">
      <header className="timco-header pluz-header">
        <Link className="timco-brand" href="/" aria-label="Volver al portafolio de Paolo Gonzales">
          <span>PG</span><strong>Paolo Gonzales</strong>
        </Link>
        <nav aria-label="Navegación del caso PLUZ 360">
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
              <img src="/assets/projects/pluz-360/logo-pluz.png" alt="PLUZ" />
              <span>Caso de estudio · Liderazgo</span>
            </div>
            <h1>Evaluación<br /><em>360.</em></h1>
            <p className="pluz-hero-lead">Un proceso complejo convertido en una medición clara, confidencial y gobernada por reglas.</p>
            <p className="pluz-hero-description">No empezamos por una encuesta. Primero entendimos quién evalúa a quién, qué roles aplican y cómo debía protegerse cada respuesta. Desde ahí, VUCA Consultoría construyó para Asertiva Consulting y PLUZ Energía Perú una plataforma alineada con el proceso real.</p>
            <div className="pluz-hero-actions">
              <a href="#recorrido">Entender las reglas <span>↓</span></a>
              <a href="#modelo">Ver cómo funciona</a>
            </div>
          </div>
          <div className="pluz-hero-metrics" aria-label="Dimensión de la campaña">
            <span><strong>671</strong><small>Evaluadores</small></span>
            <span><strong>87</strong><small>Líderes</small></span>
            <span><strong>1,109</strong><small>Asignaciones</small></span>
            <span><strong>56</strong><small>Preguntas</small></span>
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
              <img src={step.image} alt={step.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
              <div className="pluz-journey-card-wash" aria-hidden="true" />
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

      <section id="sistema" className="pluz-architecture">
        <div className="timco-shell">
          <div className="pluz-section-heading is-light">
            <div>
              <p className="pluz-overline">Reglas convertidas en sistema</p>
              <h2>El proceso manda. La tecnología lo hace cumplir.</h2>
            </div>
            <p>Asignación, captura, protección y lectura forman un solo flujo. La plataforma traduce cada regla de la medición en permisos, datos y experiencias concretas.</p>
          </div>

          <div className="pluz-architecture-flow" aria-label="Flujo del proceso dentro de la plataforma">
            <div><span>01</span><strong>Asignación</strong><small>Evaluador + líder + rol</small></div>
            <i>→</i>
            <div><span>02</span><strong>Respuesta</strong><small>Instrumento controlado</small></div>
            <i>→</i>
            <div><span>03</span><strong>Protección</strong><small>Auth + RLS + Postgres</small></div>
            <i>→</i>
            <div><span>04</span><strong>Lectura</strong><small>Resultados agregados</small></div>
          </div>

          <div className="pluz-system-grid">
            {systemLayers.map((layer) => (
              <article key={layer.number}>
                <span>{layer.number}</span>
                <h3>{layer.title}</h3>
                <p>{layer.copy}</p>
                <ul>{layer.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
          <a className="pluz-repository-link" href={repositoryUrl} target="_blank" rel="noreferrer">Revisar código y documentación en GitHub <span>↗</span></a>
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
