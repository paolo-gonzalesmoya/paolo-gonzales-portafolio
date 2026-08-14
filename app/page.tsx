"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

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
    eyebrow: "Decidir",
    title: "Los datos terminan en decisiones claras.",
    copy: "Facturación, riesgos y productividad se convierten en tableros legibles para saber qué pasó y cuál es el siguiente paso.",
    signal: "Control en tiempo real",
    image: "/assets/journey/scene-06.webp",
  },
  {
    number: "06",
    eyebrow: "Evolucionar",
    title: "El equipo aprende y la solución crece.",
    copy: "Capacito a las personas, acompaño la adopción y priorizamos nuevas mejoras a partir del uso real.",
    signal: "Adopción sostenible",
    image: "/assets/journey/scene-07.webp",
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
    title: "Gestión de partidas y ciclo de facturación",
    copy: "Registro, clasificación, validación y seguimiento de facturas conectados con control financiero y reportes ejecutivos.",
    tags: ["4 roles", "PDF versionado", "Alertas de pago", "Dashboard"],
    image: "/assets/timco-dashboard.webp",
    tone: "violet",
  },
  {
    number: "02",
    client: "PDK Perú",
    title: "Inspecciones y hallazgos con trazabilidad",
    copy: "Captura de evidencias en obra, asignación de responsables, acciones correctivas e indicadores multiobra.",
    tags: ["SSOMA", "Evidencias", "Control por roles", "KPIs"],
    image: "/assets/pdk-dashboard.webp",
    tone: "cyan",
  },
  {
    number: "03",
    client: "Parte Diario",
    title: "Jornadas de operador desde el celular",
    copy: "Registro móvil, firma, aprobación y generación del documento final sin infraestructura adicional.",
    tags: ["Registro móvil", "Firma digital", "Aprobación", "PDF automático"],
    image: "/assets/parte-diario.webp",
    tone: "coral",
  },
];

const method = [
  ["01", "Entender", "Seguir el proceso real y encontrar la fricción prioritaria."],
  ["02", "Diseñar", "Convertir el recorrido principal en un prototipo funcional."],
  ["03", "Conectar", "Unir personas, datos, documentos y decisiones."],
  ["04", "Evolucionar", "Medir el uso y mejorar sin perder simplicidad."],
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
  const sceneFloat = progress * (scenes.length - 1);
  const sceneIndex = Math.min(Math.floor(sceneFloat), scenes.length - 1);
  const nextSceneIndex = Math.min(sceneIndex + 1, scenes.length - 1);
  const sceneBlend = clamp((sceneFloat - sceneIndex) / 0.64, 0, 1);
  const activeScene = sceneBlend >= 0.5 ? nextSceneIndex : sceneIndex;

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreferences = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    updatePreferences();
    setForceMotion(window.localStorage.getItem("paolo-portfolio-motion") === "enabled");
    mobileQuery.addEventListener("change", updatePreferences);
    reducedMotionQuery.addEventListener("change", updatePreferences);

    return () => {
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
    const target = section.offsetTop + (index / (scenes.length - 1)) * distance;
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
        style={{ "--journey-height": `${100 + (scenes.length - 1) * 50}svh` } as CSSProperties}
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
            {scenes.map((scene, index) => {
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
            {scenes.map((scene, index) => {
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
                  aria-hidden={activeScene !== index}
                  style={{ opacity, transform: `translate3d(0, ${offset}px, 0)` }}
                >
                  <img className="world-copy-image" src={scene.image} alt={`Escena ${index + 1}: ${scene.title}`} />
                  <div className="world-kicker"><span>{scene.number}</span>{scene.eyebrow}</div>
                  {index === 0 && <p className="world-role">Consultor no-code · Especialista AppSheet</p>}
                  <h1>{scene.title}</h1>
                  <p>{scene.copy}</p>
                  <div className="world-signal"><i />{scene.signal}</div>
                  {index === 0 && (
                    <div className="world-actions">
                      <button type="button" onClick={() => goToScene(1)}>Comenzar el recorrido <span>↓</span></button>
                      <a href={whatsappUrl} target="_blank" rel="noreferrer">Escribir por WhatsApp ↗</a>
                    </div>
                  )}
                  {index === scenes.length - 1 && (
                    <div className="world-actions">
                      <a className="is-primary" href="#casos">Ver casos reales ↓</a>
                      <a href={whatsappUrl} target="_blank" rel="noreferrer">Hablemos ↗</a>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="world-scene-nav" aria-label="Capítulos del recorrido">
            {scenes.map((scene, index) => (
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
          <div className="world-heading">
            <div><p>Casos seleccionados</p><h2>El efecto visual atrae.<br />El resultado convence.</h2></div>
            <span>Soluciones construidas alrededor de operaciones reales, no de una plantilla.</span>
          </div>

          <div className="world-case-grid">
            {cases.map((item) => (
              <article className={`world-case ${item.tone}`} key={item.number}>
                <div className="world-case-image"><img src={item.image} alt={`Solución desarrollada para ${item.client}`} /></div>
                <div className="world-case-copy">
                  <div><span>{item.number}</span><small>{item.client}</small></div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="world-reel">
        <div className="world-shell world-reel-grid">
          <div>
            <p className="world-overline">Recorrido completo</p>
            <h2>Ocho escenas.<br />Una historia conectada.</h2>
            <p>Este reel reúne el viaje en 23 segundos. En la experiencia principal, tú controlas el ritmo con el scroll.</p>
          </div>
          <div className="world-video-frame">
            <video controls muted playsInline preload="metadata" poster="/assets/journey/scene-01.webp">
              <source src="/assets/paolo-scroll-journey.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </div>
        </div>
      </section>

      <section id="metodo" className="world-section world-method">
        <div className="world-shell">
          <div className="world-heading light">
            <div><p>Cómo trabajo</p><h2>Una transformación<br />en cuatro movimientos.</h2></div>
            <span>Una buena app no empieza con pantallas. Empieza entendiendo una fricción.</span>
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

      <footer className="world-footer world-shell">
        <div className="world-brand"><span>PG</span><div><strong>Paolo Gonzales</strong><small>Automatización que sí se usa</small></div></div>
        <p>© 2026 Paolo Gonzales</p>
        <a href="#inicio">Volver al recorrido ↑</a>
      </footer>

      <a className="world-floating-wa" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar a Paolo por WhatsApp">WA</a>
    </main>
  );
}
