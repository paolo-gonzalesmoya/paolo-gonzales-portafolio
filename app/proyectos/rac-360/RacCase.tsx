"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20el%20caso%20RAC%20360%20y%20quiero%20conversar%20sobre%20un%20proyecto.";
const calComUrl = "https://cal.com/paolo-gonzales-8itwaw";

const storySteps = [
  {
    number: "01",
    eyebrow: "Detectar",
    title: "La evidencia nace en obra.",
    copy: "El inspector registra desde el celular la obra, el área y la descripción del hallazgo. La fotografía conserva el contexto exacto sin esperar a volver a oficina.",
    image: "/assets/projects/rac-360/scene-02.webp",
  },
  {
    number: "02",
    eyebrow: "Priorizar",
    title: "Cada hallazgo recibe una ruta.",
    copy: "Tipo, nivel de riesgo, categoría, cuadrilla y empresa convierten una observación en una prioridad operativa con responsable y fecha límite.",
    image: "/assets/projects/rac-360/scene-03.webp",
  },
  {
    number: "03",
    eyebrow: "Corregir",
    title: "Cerrar exige evidencia.",
    copy: "El registro permanece abierto hasta documentar la corrección. La nueva fotografía deja visible qué cambió, quién atendió y cuándo se cerró.",
    image: "/assets/projects/rac-360/scene-04.webp",
  },
  {
    number: "04",
    eyebrow: "Decidir",
    title: "La operación se vuelve visible.",
    copy: "Los registros consolidados alimentan reportes y un dashboard para comparar obras, riesgos, usuarios, cuadrillas, subcontratistas y evolución semanal.",
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
    title: "La evidencia confirma el cierre.",
    copy: "La descripción y la foto de corrección completan la trazabilidad y actualizan los indicadores.",
    action: "Reiniciar demostración",
    facts: [["Corrección", "Verificada"], ["Evidencia", "Adjunta"], ["Estado", "Cerrado"]],
  },
];

const solutionLayers = [
  {
    number: "01",
    title: "Proceso",
    copy: "Programada, abierta y cerrada: cada estado exige la información necesaria para avanzar sin perder evidencia.",
    image: "/assets/projects/rac-360/solution-process.webp",
    alt: "Flujo minimalista de una inspección desde su registro hasta el cierre",
  },
  {
    number: "02",
    title: "Modelo de datos",
    copy: "Obras, áreas, personal, categorías, cuadrillas y empresas se conectan alrededor de cada inspección.",
    image: "/assets/projects/rac-360/solution-data-model.webp",
    alt: "Módulos conectados alrededor de un núcleo de información",
  },
  {
    number: "03",
    title: "Seguridad",
    copy: "El rol, la obra asignada y el estado del registro definen con precisión qué puede ver o modificar cada persona.",
    image: "/assets/projects/rac-360/solution-security.webp",
    alt: "Escudo minimalista que representa permisos y accesos controlados",
  },
  {
    number: "04",
    title: "Analítica",
    copy: "Los registros alimentan reportes y comparaciones para reconocer recurrencias, riesgos y responsables.",
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
            <figcaption><span>Proyecto</span> Del hallazgo al cierre verificable.</figcaption>
          </figure>
          <div className="timco-hero-content">
            <p className="timco-overline"><span>Caso de estudio</span> PDK Produktiva</p>
            <h1>RAC<br />360.</h1>
            <p className="timco-hero-lead">Gestión de hallazgos SSOMA.</p>
            <p className="timco-hero-description">Una aplicación que conecta inspección, riesgo, responsables, correcciones y analítica para que cada hallazgo conserve su historia completa.</p>
            <ol className="timco-flowline" aria-label="Flujo principal del sistema">
              <li>Detectar</li><li>Priorizar</li><li>Asignar</li><li>Corregir</li><li>Decidir</li>
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
            <span><strong>04</strong> Reportes y dashboard</span>
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
              <h2>Recorre un hallazgo hasta su cierre.</h2>
            </div>
            <p>La simulación utiliza una obra y datos ficticios. Avanza por cada estado para ver qué información transforma una observación en trazabilidad.</p>
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
                  <small>{demoStep === 3 ? "Evidencia inicial + corrección verificadas" : "El registro aún necesita completar su recorrido"}</small>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="solucion" className="rac-solution">
        <div className="timco-shell">
          <div className="rac-solution-heading">
            <div><p className="timco-overline">Diseño de la solución</p><h2>No era digitalizar un formato. Era conectar el ciclo.</h2></div>
            <p>Mi aporte fue traducir la lógica SSOMA en una aplicación operable, segura y medible, desde la captura hasta la lectura gerencial.</p>
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
            <p className="timco-overline">Próximo paso</p>
            <h2>Que ningún hallazgo vuelva a quedarse a medias.</h2>
            <p>Una conversación breve puede revelar dónde se corta el seguimiento y qué necesita el equipo para llegar al cierre con evidencia.</p>
            <ul>
              <li>Revisamos un caso real de tu operación</li>
              <li>Identificamos el punto donde se pierde el control</li>
              <li>Definimos un primer paso viable</li>
            </ul>
            <a className="timco-cta-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><span />Quiero coordinar por WhatsApp ↗</a>
          </div>

          <div className="timco-booking-card">
            <div className="timco-booking-topline"><span><i /> Agenda abierta</span><strong>Cal.com</strong></div>
            <div className="timco-booking-main">
              <p className="timco-overline">Revisión inicial</p>
              <h3>Trae un hallazgo real. Saldrás con una ruta más clara.</h3>
              <p>En 15 o 30 minutos revisamos cómo se registra, quién responde y qué hace falta para cerrar el ciclo.</p>
              <div className="timco-booking-meta">
                <span><small>Duración</small><strong>15–30 min</strong></span>
                <span><small>Modalidad</small><strong>Online</strong></span>
                <span><small>Zona horaria</small><strong>Automática</strong></span>
              </div>
              <a className="timco-booking-primary" href={calComUrl} target="_blank" rel="noreferrer">Ver horarios disponibles <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
