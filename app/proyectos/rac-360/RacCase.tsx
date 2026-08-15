"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20el%20caso%20RAC%20360%20y%20quiero%20explorar%20c%C3%B3mo%20usar%20mis%20hallazgos%20SST%20para%20prevenir%20riesgos%20con%20IA.";
const calComUrl = "https://cal.com/paolo-gonzales-8itwaw";

const storySteps = [
  {
    number: "01",
    eyebrow: "Detectar",
    title: "Cada señal empieza en campo.",
    copy: "El inspector registra desde el celular la obra, el área, el hallazgo y su evidencia. Capturar el contexto desde el origen evita vacíos y hace que cada observación pueda compararse después.",
    image: "/assets/projects/rac-360/scene-02.webp",
  },
  {
    number: "02",
    eyebrow: "Estructurar",
    title: "Un dato aislado no revela un patrón.",
    copy: "Tipo, nivel de riesgo, categoría, cuadrilla, empresa y ubicación convierten una observación en información consistente para priorizar y analizar recurrencias.",
    image: "/assets/projects/rac-360/scene-03.webp",
  },
  {
    number: "03",
    eyebrow: "Cerrar",
    title: "La corrección también genera aprendizaje.",
    copy: "El registro permanece abierto hasta documentar la acción correctiva. La evidencia antes y después permite verificar el cierre y entender qué respuesta funcionó.",
    image: "/assets/projects/rac-360/scene-04.webp",
  },
  {
    number: "04",
    eyebrow: "Prevenir",
    title: "Los hallazgos empiezan a hablar entre sí.",
    copy: "Al consolidar recurrencias, ubicaciones, causas y respuestas, el historial queda preparado para detectar patrones con IA y orientar acciones preventivas dentro del marco de SST.",
    image: "/assets/projects/rac-360/scene-05.webp",
  },
];

const demoStages = [
  {
    number: "01",
    status: "Detectado",
    eyebrow: "Captura en campo",
    title: "Hallazgo registrado con contexto.",
    copy: "La inspección reúne ubicación, descripción y fotografía desde el punto donde ocurre.",
    action: "Clasificar el hallazgo",
    facts: [["Tipo", "Pendiente"], ["Riesgo", "Pendiente"], ["Estado", "Registrado"]],
  },
  {
    number: "02",
    status: "Priorizado",
    eyebrow: "Criterio SSOMA",
    title: "La urgencia deja de ser subjetiva.",
    copy: "El hallazgo queda clasificado como condición insegura y riesgo alto para ordenar su atención.",
    action: "Asignar responsable",
    facts: [["Tipo", "Condición insegura"], ["Riesgo", "Alto"], ["Estado", "Abierto"]],
  },
  {
    number: "03",
    status: "Asignado",
    eyebrow: "Responsabilidad",
    title: "Una persona y una fecha concreta.",
    copy: "La corrección se vincula a un responsable de partida y a una fecha límite de levantamiento.",
    action: "Registrar corrección",
    facts: [["Responsable", "Partida Norte"], ["Plazo", "48 horas"], ["Estado", "Abierto"]],
  },
  {
    number: "04",
    status: "Cerrado",
    eyebrow: "Verificación",
    title: "El cierre alimenta la prevención.",
    copy: "La descripción y la foto de corrección completan la trazabilidad. El registro queda disponible para análisis agregado y búsqueda de patrones.",
    action: "Reiniciar demostración",
    facts: [["Corrección", "Verificada"], ["Evidencia", "Adjunta"], ["Estado", "Cerrado"]],
  },
];

const solutionLayers = [
  {
    number: "01",
    title: "Ciclo trazable",
    copy: "Cada hallazgo conserva contexto, clasificación, responsable, acción correctiva y evidencia de cierre bajo una secuencia verificable.",
    image: "/assets/projects/rac-360/solution-process.webp",
    alt: "Flujo minimalista de una inspección desde su registro hasta el cierre",
  },
  {
    number: "02",
    title: "Base comparable",
    copy: "Obras, áreas, riesgos, causas, cuadrillas y empresas se normalizan para analizar el historial con criterios consistentes.",
    image: "/assets/projects/rac-360/solution-data-model.webp",
    alt: "Módulos conectados alrededor de un núcleo de información",
  },
  {
    number: "03",
    title: "Gobierno SST",
    copy: "Roles, obras asignadas, estados y evidencias protegen la trazabilidad y sostienen el cumplimiento del proceso de SST.",
    image: "/assets/projects/rac-360/solution-security.webp",
    alt: "Escudo minimalista que representa permisos y accesos controlados",
  },
  {
    number: "04",
    title: "Inteligencia preventiva",
    copy: "Un historial confiable permite buscar recurrencias y preparar modelos de IA que ayuden a anticipar riesgos y reducir accidentes.",
    image: "/assets/projects/rac-360/solution-analytics.webp",
    alt: "Indicadores ascendentes que convierten registros en decisiones",
  },
];

export default function RacCase() {
  const [activeStory, setActiveStory] = useState(0);
  const storyRefs = useRef<Array<HTMLElement | null>>([]);
  const [demoStep, setDemoStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveStory(Number((visible.target as HTMLElement).dataset.story));
      },
      { rootMargin: "-28% 0px -42%", threshold: [0.15, 0.45, 0.7] },
    );

    storyRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const currentDemo = demoStages[demoStep];
  const advanceDemo = () => setDemoStep((current) => (current + 1) % demoStages.length);

  return (
    <main className="timco-case rac-case">
      <header className="timco-header">
        <Link className="timco-brand" href="/" aria-label="Volver al portafolio de Paolo Gonzales">
          <span>PG</span><strong>Paolo Gonzales</strong>
        </Link>
        <nav aria-label="Navegación del caso RAC 360">
          <a href="#recorrido">Recorrido</a>
          <a href="#demo">Demo</a>
          <a href="#solucion">Solución</a>
        </nav>
        <Link className="timco-header-link" href="/">Volver al portafolio <span>↗</span></Link>
      </header>

      <section id="top" className="timco-hero rac-hero">
        <div className="timco-shell timco-hero-cover">
          <figure className="timco-hero-media">
            <img src="/assets/projects/rac-360/scene-01.webp" alt="Inspector registra un hallazgo en una obra y activa su recorrido digital" />
            <figcaption><span>Proyecto</span> De la evidencia en campo a la prevención inteligente.</figcaption>
          </figure>
          <div className="timco-hero-content">
            <p className="timco-overline"><span>Caso de estudio</span> PDK Produktiva</p>
            <h1>RAC<br />360.</h1>
            <p className="timco-hero-lead">Hallazgos SSOMA convertidos en prevención.</p>
            <p className="timco-hero-description">RAC 360 conecta inspección, riesgo, responsables y correcciones para construir un historial confiable: la base necesaria para reconocer patrones, prevenir accidentes y reducir riesgos.</p>
            <ol className="timco-flowline" aria-label="Flujo principal del sistema">
              <li>Detectar</li><li>Estructurar</li><li>Corregir</li><li>Analizar</li><li>Prevenir</li>
            </ol>
            <div className="timco-hero-actions">
              <a href="#recorrido">Entender el recorrido <span>↓</span></a>
              <a href="#demo">Simular un cierre</a>
            </div>
          </div>
          <div className="timco-hero-facts" aria-label="Capacidades principales">
            <span><strong>01</strong> Captura en obra</span>
            <span><strong>02</strong> Riesgo y responsable</span>
            <span><strong>03</strong> Cierre con evidencia</span>
            <span><strong>04</strong> Base para análisis con IA</span>
          </div>
        </div>
      </section>

      <section id="recorrido" className="timco-story rac-story">
        <div className="timco-shell timco-story-layout">
          <div className="timco-story-copy">
            {storySteps.map((step, index) => (
              <article
                key={step.number}
                data-story={index}
                ref={(node) => { storyRefs.current[index] = node; }}
                className={activeStory === index ? "is-active" : ""}
              >
                <img src={step.image} alt={`Escena ${step.number}: ${step.title}`} loading="lazy" decoding="async" />
                <p className="timco-overline"><span>{step.number}</span> {step.eyebrow}</p>
                <h2>{step.title}</h2>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
          <div className="timco-story-stage" aria-hidden="true">
            <div>
              {storySteps.map((step, index) => (
                <img className={activeStory === index ? "is-active" : ""} src={step.image} alt="" key={step.number} />
              ))}
              <span className="timco-story-index">{storySteps[activeStory].number} / 04</span>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="timco-demo-section rac-demo-section">
        <div className="timco-shell">
          <div className="timco-section-heading">
            <div>
              <p className="timco-overline">Demostración del flujo</p>
              <h2>Recorre cómo un hallazgo se convierte en dato preventivo.</h2>
            </div>
            <p>La simulación utiliza datos ficticios. Avanza por cada estado para ver cómo una observación documentada termina alimentando un historial útil para prevención.</p>
          </div>

          <div className="rac-demo-app">
            <div className="rac-demo-topbar">
              <div><span>RAC 360</span><strong>Inspección DEMO-024</strong></div>
              <p>Entorno demostrativo · Sin datos reales</p>
            </div>

            <div className="rac-demo-grid">
              <article className="rac-demo-mobile">
                <div className="rac-demo-mobile-head"><span>‹</span><strong>Detalle del hallazgo</strong><i /></div>
                <img src="/assets/projects/rac-360/scene-02.webp" alt="Hallazgo ficticio registrado durante una inspección" />
                <dl>
                  <div><dt>Obra</dt><dd>Proyecto Demo Norte</dd></div>
                  <div><dt>Área</dt><dd>Plataforma 04</dd></div>
                  <div><dt>Hallazgo</dt><dd>Malla perimetral deteriorada</dd></div>
                  <div><dt>Empresa</dt><dd>Contratista ficticia</dd></div>
                </dl>
              </article>

              <article className="rac-demo-process">
                <div className="rac-demo-steps" aria-label="Estados de la demostración">
                  {demoStages.map((stage, index) => (
                    <button
                      type="button"
                      key={stage.number}
                      className={index === demoStep ? "is-active" : index < demoStep ? "is-complete" : ""}
                      onClick={() => setDemoStep(index)}
                      aria-pressed={index === demoStep}
                    >
                      <span>{index < demoStep ? "✓" : stage.number}</span>
                      <small>{stage.status}</small>
                    </button>
                  ))}
                </div>
                <p className="timco-overline">{currentDemo.eyebrow}</p>
                <h3>{currentDemo.title}</h3>
                <p>{currentDemo.copy}</p>
                <button className="rac-demo-next" type="button" onClick={advanceDemo}>
                  {currentDemo.action} <span>→</span>
                </button>
              </article>

              <article className={`rac-demo-result is-step-${demoStep + 1}`}>
                <div className="rac-demo-status"><span />Estado actual<strong>{currentDemo.status}</strong></div>
                <div className="rac-demo-facts">
                  {currentDemo.facts.map(([label, value]) => (
                    <div key={label}><span>{label}</span><strong>{value}</strong></div>
                  ))}
                </div>
                <div className="rac-demo-evidence">
                  <span>Progreso documental</span>
                  <div><i style={{ width: `${25 * (demoStep + 1)}%` }} /></div>
                  <small>{demoStep === 3 ? "Evidencia verificada · registro disponible para análisis preventivo" : "El registro aún necesita completar su recorrido"}</small>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="solucion" className="rac-solution">
        <div className="timco-shell">
          <div className="rac-solution-heading">
            <div><p className="timco-overline">Diseño de la solución</p><h2>Cerrar el hallazgo resuelve el caso. Aprender del historial ayuda a prevenir el siguiente.</h2></div>
            <p>La solución estandariza el ciclo y construye una base confiable para reconocer recurrencias y, progresivamente, aplicar IA a la prevención de accidentes y reducción de riesgos dentro del marco de las normativas SST aplicables.</p>
          </div>
          <div className="rac-solution-grid">
            {solutionLayers.map((item) => (
              <article key={item.number}>
                <div className="rac-solution-visual"><img src={item.image} alt={item.alt} loading="lazy" decoding="async" /></div>
                <div className="rac-solution-body"><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="timco-cta rac-cta">
        <div className="timco-shell timco-cta-grid">
          <div className="timco-cta-copy">
            <p className="timco-overline">De registro a prevención</p>
            <h2>Tu historial de hallazgos puede ayudarte a anticipar el próximo riesgo.</h2>
            <p>El primer paso no es entrenar una IA. Es asegurar que los datos SST sean completos, comparables y confiables para encontrar señales que hoy pasan desapercibidas.</p>
            <ul>
              <li>Evaluamos la calidad y estructura de tus datos SST</li>
              <li>Identificamos recurrencias con valor preventivo</li>
              <li>Definimos una ruta realista hacia analítica e IA</li>
            </ul>
            <a className="timco-cta-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><span />Quiero explorar mis datos SST ↗</a>
          </div>

          <div className="timco-booking-card">
            <div className="timco-booking-topline"><span><i /> Agenda abierta</span><strong>Cal.com</strong></div>
            <div className="timco-booking-main">
              <p className="timco-overline">Diagnóstico inicial</p>
              <h3>Descubre si tus registros están listos para generar inteligencia preventiva.</h3>
              <p>En 15 o 30 minutos revisamos qué información ya tienes, qué falta y cómo convertirla en mejores decisiones sin perder trazabilidad SST.</p>
              <div className="timco-booking-meta">
                <span><small>Duración</small><strong>15–30 min</strong></span>
                <span><small>Modalidad</small><strong>Online</strong></span>
                <span><small>Enfoque</small><strong>SST + datos</strong></span>
              </div>
              <a className="timco-booking-primary" href={calComUrl} target="_blank" rel="noreferrer">Agendar diagnóstico <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
