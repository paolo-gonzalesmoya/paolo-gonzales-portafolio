"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const scenes = [
  {
    number: "01",
    eyebrow: "Entender",
    title: "Los procesos cuentan una historia.",
    copy: "En mi oficina reviso hojas, mensajes y tareas manuales; luego sigo la información junto al equipo hasta encontrar dónde se pierde tiempo y trazabilidad.",
    signal: "Una prioridad clara antes que herramientas",
    image: "/assets/journey/scene-01.webp",
  },
  {
    number: "02",
    eyebrow: "Diseñar",
    title: "El recorrido se convierte en una app.",
    copy: "Conecto formularios, reglas y responsables en una primera versión simple que el equipo puede probar antes de invertir de más.",
    signal: "Prototipo funcional",
    image: "/assets/journey/scene-03.webp",
  },
  {
    number: "03",
    eyebrow: "Implementar",
    title: "La solución llega al trabajo real.",
    copy: "Campo, obra, almacén o celular: el dato nace donde ocurre la operación y viaja sin volver a ser digitado.",
    signal: "Captura desde cualquier lugar",
    image: "/assets/journey/scene-04.webp",
  },
  {
    number: "04",
    eyebrow: "Automatizar",
    title: "Una acción activa todo el flujo.",
    copy: "Alertas, documentos, firmas y aprobaciones avanzan de forma automática mientras cada rol mantiene el control que necesita.",
    signal: "Menos seguimiento manual",
    image: "/assets/journey/scene-05.webp",
  },
  {
    number: "05",
    eyebrow: "Decidir y evolucionar",
    title: "Los datos guían la siguiente mejora.",
    copy: "Facturación, riesgos y productividad se convierten en decisiones claras; luego acompaño al equipo para mejorar la solución a partir del uso real.",
    signal: "Control y adopción sostenible",
    image: "/assets/journey/scene-06.webp",
  },
];

const clients = [
  { name: "TIMCO", logo: "/assets/logo-timco.webp" },
  { name: "PDK Produktiva", logo: "/assets/logo-pdk.webp" },
  { name: "Storange", logo: "/assets/logo-storange.webp" },
  { name: "Loyola Live Solar", logo: "/assets/logo-loyola.webp" },
  { name: "ABC Carbon", logo: "/assets/logo-abc-carbon.webp" },
];

const cases = [
  {
    number: "01",
    client: "TIMCO",
    title: "Almacén Layout",
    copy: "Un caso completo de ingreso, evidencia, inventario y salida: el layout táctil convierte cada movimiento del almacén en control operativo y área para cobro.",
    tags: ["Ingreso y salida", "PDF + QR", "Layout táctil", "Área y cobro"],
    image: "/assets/projects/timco/scene-01.webp",
    tone: "violet",
    href: "/proyectos/inventario-almacenes",
  },
  {
    number: "02",
    client: "PDK Produktiva",
    title: "RAC 360",
    copy: "Metas semanales, informes automáticos y hallazgos SSOMA trazables: menos horas de consolidación para Document Control y una base preparada para detectar patrones con IA.",
    tags: ["Metas semanales", "Informes automáticos", "Trazabilidad SST", "Base para IA"],
    image: "/assets/projects/rac-360/scene-01.webp",
    tone: "orange",
    href: "/proyectos/rac-360",
  },
  {
    number: "03",
    client: "Caso de estudio",
    title: "Evaluación de Liderazgo 360",
    copy: "Una plataforma que traduce las reglas de una medición 360 en asignaciones precisas, respuestas protegidas y una lectura ejecutiva clara.",
    tags: ["Roles configurables", "Proceso 360", "Confidencialidad", "Dashboard"],
    image: "/assets/projects/pluz-360/portfolio-card-v2.png",
    tone: "blue",
    href: "/proyectos/evaluacion-360",
  },
];

const method = [
  ["01", "Entender", "Seguir el proceso real y encontrar la fricción prioritaria."],
  ["02", "Diseñar", "Convertir el recorrido principal en un prototipo funcional."],
  ["03", "Implementar", "Llevar la solución al lugar donde ocurre el trabajo."],
  ["04", "Automatizar", "Conectar personas, datos, documentos y alertas."],
  ["05", "Decidir y evolucionar", "Medir el uso, acompañar al equipo y priorizar la siguiente mejora."],
];

const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20tu%20portafolio%20y%20quiero%20conversar%20sobre%20un%20proyecto.";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function Home() {
  const journeyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [forceMotion, setForceMotion] = useState(false);
  const activeScenes = scenes;
  const sceneFloat = progress * (activeScenes.length - 1);
  const sceneIndex = Math.min(Math.floor(sceneFloat), activeScenes.length - 1);
  const nextSceneIndex = Math.min(sceneIndex + 1, activeScenes.length - 1);
  const sceneBlend = clamp((sceneFloat - sceneIndex) / (isMobile ? 0.56 : 0.64), 0, 1);
  const activeScene = sceneBlend >= 0.5 ? nextSceneIndex : sceneIndex;

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreferences = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    const preferenceFrame = window.requestAnimationFrame(() => {
      updatePreferences();
      setForceMotion(window.localStorage.getItem("paolo-portfolio-motion") === "enabled");
    });
    mobileQuery.addEventListener("change", updatePreferences);
    reducedMotionQuery.addEventListener("change", updatePreferences);

    return () => {
      window.cancelAnimationFrame(preferenceFrame);
      mobileQuery.removeEventListener("change", updatePreferences);
      reducedMotionQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = journeyRef.current;
      if (!section) return;

      const start = section.offsetTop;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      setProgress(clamp((window.scrollY - start) / distance, 0, 1));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goToScene = (index: number) => {
    const section = journeyRef.current;
    if (!section) return;
    const distance = section.offsetHeight - window.innerHeight;
    const target = section.offsetTop + (index / (activeScenes.length - 1)) * distance;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const enableMotion = () => {
    window.localStorage.setItem("paolo-portfolio-motion", "enabled");
    setForceMotion(true);
    window.requestAnimationFrame(() => window.scrollTo({ top: journeyRef.current?.offsetTop ?? 0, behavior: "smooth" }));
  };

  return (
    <main className={`world-page${forceMotion ? " is-motion-enabled" : ""}`}>
      <header className="world-header">
        <a className="world-brand" href="#inicio" aria-label="Paolo Gonzales, volver al inicio">
          <span>PG</span>
          <div><strong>Paolo Gonzales</strong><small>Automatización que sí se usa</small></div>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#casos">Casos</a>
          <a href="#metodo">Método</a>
          <a href="/cursos">Cursos</a>
        </nav>
        <a className="world-header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Hablemos <span>↗</span>
        </a>
      </header>

      <section
        id="inicio"
        ref={journeyRef}
        className="world-journey"
        style={{
          "--journey-height": `${100 + (scenes.length - 1) * 50}svh`,
          "--mobile-journey-height": `${100 + (activeScenes.length - 1) * 42}svh`,
        } as CSSProperties}
        aria-label="Recorrido por el trabajo de Paolo Gonzales"
      >
        <div className="world-stage">
          {prefersReducedMotion && !forceMotion && (
            <button className="world-motion-toggle" type="button" onClick={enableMotion}>
              <span>Tu dispositivo redujo las animaciones</span>
              <strong>Activar recorrido animado</strong>
            </button>
          )}
          <div className="world-visuals" aria-hidden="true">
            {activeScenes.map((scene, index) => {
              const isCurrent = index === sceneIndex;
              const isNext = index === nextSceneIndex && nextSceneIndex !== sceneIndex;
              const opacity = isCurrent ? 1 : isNext ? sceneBlend : 0;
              const direction = index % 2 === 0 ? 1 : -1;
              const motionBoost = isMobile ? 1.5 : 1;
              const scale = isCurrent
                ? 1 + sceneBlend * 0.016 * motionBoost
                : isNext
                  ? 1 + (1 - sceneBlend) * 0.018 * motionBoost
                  : 1 + 0.018 * motionBoost;
              const pan = isCurrent
                ? sceneBlend * -1.05 * direction * motionBoost
                : isNext
                  ? (1 - sceneBlend) * 1.05 * direction * motionBoost
                  : 0;
              const drift = isCurrent
                ? sceneBlend * -0.45 * motionBoost
                : isNext
                  ? (1 - sceneBlend) * 0.45 * motionBoost
                  : 0;

              return (
                <div
                  className="world-scene-image"
                  key={scene.number}
                  style={{
                    opacity,
                    transform: `translate3d(${pan}%, ${drift}%, 0) scale(${scale})`,
                    zIndex: isNext ? 2 : isCurrent ? 1 : 0,
                  }}
                >
                  <img src={scene.image} alt="" />
                </div>
              );
            })}
          </div>

          <div className="world-light" aria-hidden="true" />
          <div className="world-grid" aria-hidden="true" />

          <div className="world-copy-stack">
            {activeScenes.map((scene, index) => {
              const isCurrent = index === sceneIndex;
              const isNext = index === nextSceneIndex && nextSceneIndex !== sceneIndex;
              const opacity = isCurrent ? 1 - sceneBlend : isNext ? sceneBlend : 0;
              const offset = isCurrent
                ? sceneBlend * -26
                : isNext
                  ? (1 - sceneBlend) * 26
                  : 26;

              return (
                <article
                  className="world-scene-copy"
                  key={scene.number}
                  aria-hidden={isMobile ? false : activeScene !== index}
                  style={{ opacity, transform: `translate3d(0, ${offset}px, 0)` }}
                >
                  <img
                    className="world-copy-image"
                    src={scene.image}
                    alt={`Escena ${index + 1}: ${scene.title}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="world-kicker"><span>{scene.number}</span>{scene.eyebrow}</div>
                  {index === 0 && <p className="world-role">Consultor no-code · Especialista AppSheet</p>}
                  <h1>{scene.title}</h1>
                  <p>{scene.copy}</p>
                  <div className="world-signal"><i />{scene.signal}</div>
                  {index === 0 && (
                    <div className="world-actions">
                      {!isMobile && <button type="button" onClick={() => goToScene(1)}>Comenzar el recorrido <span>↓</span></button>}
                      <a href={whatsappUrl} target="_blank" rel="noreferrer">Escribir por WhatsApp ↗</a>
                    </div>
                  )}
                  {!isMobile && index === activeScenes.length - 1 && (
                    <div className="world-actions">
                      <a className="is-primary" href="#casos">Ver casos reales ↓</a>
                      <a href={whatsappUrl} target="_blank" rel="noreferrer">Hablemos ↗</a>
                    </div>
                  )}
                  {isMobile && index === activeScenes.length - 1 && (
                    <div className="world-actions">
                      <a className="is-primary" href="#casos">Ver casos reales ↓</a>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="world-scene-nav" aria-label="Capítulos del recorrido">
            {activeScenes.map((scene, index) => (
              <button
                type="button"
                key={scene.number}
                className={activeScene === index ? "is-active" : ""}
                onClick={() => goToScene(index)}
                aria-label={`Ir a escena ${index + 1}: ${scene.title}`}
              >
                <span />
                <small>{scene.number}</small>
              </button>
            ))}
          </div>

          <div className="world-scroll-meter" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <div className="world-scroll-hint"><span /> Scroll para recorrer</div>
        </div>
      </section>

      <section className="world-trust" aria-label="Empresas con las que ha trabajado Paolo">
        <div className="world-shell">
          <p>Experiencia desarrollando soluciones para</p>
          <div>
            {clients.map((client) => <img src={client.logo} alt={client.name} key={client.name} />)}
          </div>
        </div>
      </section>

      <section id="casos" className="world-section world-cases">
        <div className="world-shell">
          <div className="world-heading world-portfolio-heading">
            <div><p>Portafolio de productos</p><h2>Procesos reales convertidos en productos digitales.</h2></div>
            <span>Una selección de soluciones construidas alrededor de operaciones reales. El portafolio crecerá con nuevos casos completos, sin perder claridad.</span>
          </div>

          <article className="world-project-featured">
            <Link className="world-project-featured-image" href={cases[0].href ?? "/proyectos/inventario-almacenes"} aria-label={`Explorar ${cases[0].title}`}>
              <img src={cases[0].image} alt="Ingreso digital de una unidad al almacén TIMCO" />
              <small>Proyecto dedicado · Almacén Layout</small>
              <span>Ver caso completo <b>↗</b></span>
            </Link>
            <div className="world-project-featured-copy">
              <div className="world-project-meta"><span>01</span><small>Caso de estudio · {cases[0].client}</small></div>
              <h3>{cases[0].title}</h3>
              <p>{cases[0].copy}</p>
              <div className="world-project-flow" aria-label="Recorrido del proyecto">
                <span>Ingreso</span><i />
                <span>Evidencia</span><i />
                <span>Inventario</span><i />
                <span>Salida</span>
              </div>
              <ul>{cases[0].tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <Link className="world-case-link" href={cases[0].href ?? "/proyectos/inventario-almacenes"}>Explorar el proyecto <span>↗</span></Link>
            </div>
          </article>

          <div className="world-project-library-heading">
            <div><p>Archivo de proyectos</p><h3>Otras soluciones construidas.</h3></div>
            <span>Casos breves que se convertirán progresivamente en páginas completas.</span>
          </div>

          <div className="world-project-library">
            {cases.slice(1).map((item) => (
              <article className={`world-project-card ${item.tone}`} key={item.number}>
                <div className="world-project-card-image"><img src={item.image} alt={`Solución desarrollada para ${item.client}`} loading="lazy" decoding="async" /></div>
                <div className="world-project-card-copy">
                  <div className="world-project-meta"><span>{item.number}</span><small>{item.client}</small></div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  {item.href ? <Link className="world-case-link" href={item.href}>Explorar el proyecto <span>↗</span></Link> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="world-section world-method">
        <div className="world-shell">
          <div className="world-heading light world-method-heading">
            <div>
              <p>Cómo trabajo</p>
              <h2>Una transformación<br />en cinco movimientos.</h2>
              <span className="world-method-lead">Una buena app no empieza con pantallas. Empieza entendiendo una fricción y crece con el uso real.</span>
            </div>
            <div className="world-method-visual">
              <img src="/assets/journey/scene-07.webp" alt="Paolo capacitando al equipo para adoptar la solución" loading="lazy" decoding="async" />
              <span>La tecnología se vuelve útil cuando el equipo la hace suya.</span>
            </div>
          </div>
          <div className="world-method-grid">
            {method.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span><i />
                <h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="world-capabilities">
            <span>AppSheet</span><span>Apps Script</span><span>MySQL</span><span>Looker Studio</span><span>Power BI</span><span>Google Workspace</span>
          </div>
        </div>
      </section>

      <section className="world-profile">
        <div className="world-shell world-profile-grid">
          <div className="world-profile-image">
            <div aria-hidden="true" />
            <img src="/assets/paolo-gonzales.webp" alt="Paolo Gonzales, consultor de automatización y especialista en AppSheet" />
          </div>
          <div className="world-profile-copy">
            <p className="world-overline">Paolo Gonzales</p>
            <h2>La tecnología es el medio. El proceso es el punto de partida.</h2>
            <p>Combino criterio de negocio, desarrollo no-code y experiencia en campo para crear soluciones simples de operar, medibles y sostenibles.</p>
            <div className="world-profile-facts">
              <div><strong>10+</strong><span>soluciones empresariales</span></div>
              <div><strong>4+</strong><span>años liderando proyectos</span></div>
              <div><strong>100%</strong><span>orientado a procesos reales</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="world-courses">
        <div className="world-shell world-courses-grid">
          <div>
            <p className="world-overline">Formación práctica</p>
            <h2>También te enseño a construir.</h2>
            <p>AppSheet desde los fundamentos hasta automatizaciones avanzadas, con sesiones en vivo, grabaciones y proyecto práctico.</p>
            <a href="/cursos">Explorar cursos <span>↗</span></a>
          </div>
          <div className="world-course-levels">
            <article><span>01</span><small>US$20</small><h3>Básico e intermedio</h3><p>Convierte hojas y procesos manuales en una primera aplicación funcional.</p></article>
            <article><span>02</span><small>US$40</small><h3>Avanzado</h3><p>Seguridad, automatizaciones e integraciones para soluciones empresariales.</p></article>
          </div>
        </div>
      </section>

      <section id="contacto" className="world-contact">
        <div className="world-contact-scene" aria-hidden="true">
          <img src="/assets/journey/scene-08.webp" alt="" />
        </div>
        <div className="world-shell world-contact-grid">
          <div>
            <p className="world-overline">¿Tienes un proceso manual por mejorar?</p>
            <h2>Tu operación puede ser la siguiente escena.</h2>
          </div>
          <div className="world-contact-card">
            <p>Cuéntame cómo trabajan hoy. Definiremos una primera etapa clara, útil y ajustada a tu presupuesto.</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>+51 925 180 724</strong><b>↗</b></a>
            <a href="mailto:paolo.gonzalesmoya@gmail.com"><span>Correo</span><strong>paolo.gonzalesmoya@gmail.com</strong><b>↗</b></a>
            <small>Lima, Perú · Proyectos presenciales y remotos</small>
          </div>
        </div>
      </section>

      <a className="world-floating-wa" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar a Paolo por WhatsApp">WA</a>
    </main>
  );
}
