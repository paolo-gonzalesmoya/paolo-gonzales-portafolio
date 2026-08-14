"use client";

import { useEffect, useState } from "react";

const clients = [
  { name: "TIMCO", logo: "/assets/logo-timco.webp" },
  { name: "PDK Produktiva", logo: "/assets/logo-pdk.webp" },
  { name: "Storange", logo: "/assets/logo-storange.webp" },
  { name: "Loyola Live Solar", logo: "/assets/logo-loyola.webp" },
  { name: "ABC Carbon", logo: "/assets/logo-abc-carbon.webp" },
];

const cases = [
  {
    index: "01",
    client: "TIMCO",
    category: "Operaciones · Finanzas · Analítica",
    title: "Gestión de partidas y ciclo de facturación",
    description:
      "Digitalicé el registro, clasificación, validación y seguimiento de facturas padre e hijas, conectando el trabajo operativo con reportes y control financiero.",
    results: ["4 roles de acceso", "PDF con versiones", "Alertas de pago", "Dashboard ejecutivo"],
    image: "/assets/timco-dashboard.webp",
    imageAlt: "Dashboard de control de facturas desarrollado para TIMCO",
    tone: "blue",
  },
  {
    index: "02",
    client: "PDK Perú",
    category: "SSOMA · Campo · Multiobra",
    title: "Inspecciones y hallazgos con trazabilidad",
    description:
      "Construí una solución para capturar hallazgos en obra, asignar responsables, controlar acciones correctivas y visualizar riesgos en tiempo real.",
    results: ["Operación multiobra", "Evidencias fotográficas", "Control por roles", "KPIs interactivos"],
    image: "/assets/pdk-dashboard.webp",
    imageAlt: "Dashboard de indicadores de hallazgos SSOMA para PDK Perú",
    tone: "orange",
  },
  {
    index: "03",
    client: "Parte diario",
    category: "AppSheet · Firmas · Automatización",
    title: "Partes de operador desde el celular",
    description:
      "Diseñé un flujo móvil para registrar la jornada en campo, firmar, aprobar y generar automáticamente el documento final, sin infraestructura adicional.",
    results: ["Registro móvil", "Firma digital", "Flujo de aprobación", "PDF automático"],
    image: "/assets/parte-diario.webp",
    imageAlt: "Propuesta de aplicación móvil para partes diarios de operador",
    tone: "violet",
  },
];

const moreProjects = [
  { client: "Storange", title: "Control OGL y artículos", description: "Órdenes, inventario, fotografías y reposición conectados en una sola operación.", tech: "AppSheet · MySQL · AWS" },
  { client: "TIMCO", title: "Checklist vehicular", description: "Control semanal de tracto, carreta y Thermoking con evidencia desde campo.", tech: "AppSheet · Automatización" },
  { client: "Recursos Humanos", title: "Fotocheck y vencimientos", description: "Generación masiva de fotochecks y alertas preventivas de documentos.", tech: "Apps Script · PDF" },
  { client: "TIMCO", title: "Evaluación de desempeño", description: "Autoevaluación, pares, líderes y consolidación comparativa de resultados.", tech: "AppSheet · Analítica" },
];

const stack = ["AppSheet", "Apps Script", "MySQL", "AWS RDS", "Looker Studio", "Power BI", "Power Apps", "Google Workspace"];

const processStages = [
  {
    number: "01",
    verb: "Entender",
    eyebrow: "La fricción real",
    title: "Primero encuentro dónde se pierde el tiempo.",
    story: "Conversamos con quienes ejecutan el proceso y seguimos la información en su recorrido real. Así distinguimos el problema importante de los síntomas.",
    signal: "Correos dispersos · doble digitación · poca trazabilidad",
    outcome: "Mapa del proceso y alcance prioritario",
    metric: "1 problema crítico",
    source: "Proceso actual",
    center: "Diagnóstico",
    target: "Prioridad clara",
  },
  {
    number: "02",
    verb: "Diseñar",
    eyebrow: "La primera versión",
    title: "La idea se vuelve tangible antes de invertir de más.",
    story: "Construyo un prototipo enfocado en el recorrido principal. El equipo lo prueba, detectamos fricciones temprano y validamos decisiones con algo que ya puede usar.",
    signal: "Pantallas clave · reglas · roles · recorrido del usuario",
    outcome: "Prototipo funcional validado por el equipo",
    metric: "Valor visible rápido",
    source: "Necesidad",
    center: "Prototipo",
    target: "Flujo validado",
  },
  {
    number: "03",
    verb: "Conectar",
    eyebrow: "La operación cobra vida",
    title: "Personas, datos y decisiones trabajan en un mismo flujo.",
    story: "Integro formularios, automatizaciones, documentos y tableros. Cada rol recibe lo necesario y la información avanza sin depender de seguimientos manuales.",
    signal: "App · alertas · PDF · base de datos · dashboard",
    outcome: "Solución implementada y equipo capacitado",
    metric: "Operación conectada",
    source: "Datos de campo",
    center: "Automatización",
    target: "Decisión",
  },
  {
    number: "04",
    verb: "Evolucionar",
    eyebrow: "Después del lanzamiento",
    title: "La solución mejora al ritmo de la operación.",
    story: "Acompaño la adopción, medimos el uso real y priorizamos la siguiente mejora. El producto no queda congelado: crece cuando el negocio lo necesita.",
    signal: "Soporte · indicadores · mejoras por prioridad",
    outcome: "Evolución continua sin perder simplicidad",
    metric: "Mejora sostenible",
    source: "Uso real",
    center: "Aprendizaje",
    target: "Nueva versión",
  },
];

const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20tu%20portafolio%20y%20quiero%20conversar%20sobre%20un%20proyecto.";

export default function Home() {
  const [activeProcess, setActiveProcess] = useState(0);
  const activeStage = processStages[activeProcess];

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="site-header">
        <nav className="nav shell" aria-label="Navegación principal">
          <a className="brand" href="#inicio" aria-label="Ir al inicio">
            PAOLO<span>/</span>GONZALES
          </a>
          <div className="nav-links">
            <a href="#proyectos">Proyectos</a>
            <a href="#perfil">Perfil</a>
            <a href="#servicios">Servicios</a>
            <a href="/cursos">Cursos</a>
          </div>
          <a className="nav-contact" href={whatsappUrl} target="_blank" rel="noreferrer">
            Hablemos <span>↗</span>
          </a>
        </nav>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="availability"><span /> Disponible para nuevos proyectos</div>
            <p className="overline">Consultor no-code · Especialista AppSheet</p>
            <h1>Digitalizo procesos que hoy te quitan <em>tiempo.</em></h1>
            <p className="hero-lead">
              Diseño aplicaciones empresariales que conectan personas, datos y decisiones. Desde el diagnóstico hasta la implementación, capacitación y soporte.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#proyectos">Explorar proyectos <span>↓</span></a>
              <a className="button button-secondary" href={whatsappUrl} target="_blank" rel="noreferrer">Escribir por WhatsApp <span>↗</span></a>
            </div>
            <div className="hero-stats" aria-label="Resumen de experiencia">
              <div><strong>10+</strong><span>soluciones empresariales</span></div>
              <div><strong>4+</strong><span>años liderando proyectos</span></div>
              <div><strong>100%</strong><span>orientado a procesos reales</span></div>
            </div>
          </div>
          <div className="portrait-wrap">
            <div className="portrait-frame">
              <div className="portrait-orbit orbit-one" aria-hidden="true" />
              <div className="portrait-orbit orbit-two" aria-hidden="true" />
              <img src="/assets/paolo-gonzales.webp" alt="Paolo Gonzales, consultor de automatización y especialista en AppSheet" />
              <div className="portrait-label">
                <span>Paolo Gonzales</span>
                <small>Bach. Ingeniería de Sistemas</small>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bottom shell">
          <span>Lima, Perú · Proyectos remotos</span>
          <span className="hero-bottom-line" />
          <span>Automatización que sí se usa</span>
        </div>
      </section>

      <section className="trust" aria-label="Empresas y marcas con las que he trabajado">
        <div className="shell">
          <p>Experiencia desarrollando soluciones para</p>
          <div className="client-logos">
            {clients.map((client) => (
              <div className="client-logo" key={client.name} title={client.name}>
                <img src={client.logo} alt={`Logo de ${client.name}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="section projects-section">
        <div className="shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="overline accent">Portafolio seleccionado</p>
              <h2>Casos reales.<br />Impacto visible.</h2>
            </div>
            <p className="section-intro">Cada solución nace de entender el proceso, simplificarlo y convertirlo en una herramienta que el equipo pueda adoptar.</p>
          </div>

          <div className="case-list">
            {cases.map((item, position) => (
              <article className={`case-study ${item.tone}`} key={item.title} data-reveal>
                <div className="case-copy">
                  <div className="case-meta"><span>{item.index}</span><p>{item.category}</p></div>
                  <p className="case-client">{item.client}</p>
                  <h3>{item.title}</h3>
                  <p className="case-description">{item.description}</p>
                  <ul>
                    {item.results.map((result) => <li key={result}>{result}</li>)}
                  </ul>
                </div>
                {position === 0 ? (
                  <div className="case-visual product-visual timco-visual" aria-label={item.imageAlt}>
                    <div className="product-shell timco-shell">
                      <aside className="product-sidebar" aria-hidden="true">
                        <span className="product-logo">T</span>
                        <i className="is-current" /><i /><i /><i /><i />
                        <b>PG</b>
                      </aside>
                      <div className="product-workspace">
                        <div className="product-topbar"><div><small>Centro de control</small><strong>Ciclo de facturación</strong></div><span><i /> Actualizado ahora</span></div>
                        <div className="product-kpis billing-kpis">
                          <article><small>Facturas activas</small><strong>128</strong><em>+12 este mes</em></article>
                          <article><small>Por validar</small><strong>18</strong><em className="amber">Requieren atención</em></article>
                          <article><small>Pagadas</small><strong>84%</strong><em>+6.4% vs. mes anterior</em></article>
                        </div>
                        <div className="billing-layout">
                          <div className="billing-chart">
                            <div className="mini-heading"><div><small>Flujo mensual</small><strong>S/ 184,200</strong></div><span>Últimos 6 meses⌄</span></div>
                            <div className="chart-bars" aria-hidden="true"><i style={{height:"44%"}} /><i style={{height:"58%"}} /><i style={{height:"51%"}} /><i style={{height:"73%"}} /><i style={{height:"66%"}} /><i className="is-highlight" style={{height:"88%"}} /></div>
                            <div className="chart-labels"><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span></div>
                          </div>
                          <div className="billing-status">
                            <div className="mini-heading"><div><small>Estado del ciclo</small><strong>128 documentos</strong></div></div>
                            <div className="status-ring"><span>84<small>%</small></span></div>
                            <ul><li><i className="paid" />Pagadas <b>84</b></li><li><i className="review" />En validación <b>18</b></li><li><i className="pending" />Pendientes <b>26</b></li></ul>
                          </div>
                        </div>
                        <div className="billing-table">
                          <div className="billing-row billing-head"><span>Factura</span><span>Proyecto</span><span>Monto</span><span>Estado</span></div>
                          <div className="billing-row"><span><i>FP</i> FP-0248</span><span>Operaciones Norte</span><span>S/ 12,850</span><b>Validada</b></div>
                          <div className="billing-row"><span><i className="purple">FH</i> FH-0312</span><span>Mantenimiento</span><span>S/ 8,420</span><b className="in-review">En revisión</b></div>
                        </div>
                      </div>
                    </div>
                    <div className="product-float billing-float"><span>✓</span><div><small>Flujo automatizado</small><strong>Alerta de pago enviada</strong></div><b>Ahora</b></div>
                  </div>
                ) : position === 1 ? (
                  <div className="case-visual product-visual pdk-visual" aria-label={item.imageAlt}>
                    <div className="product-shell pdk-shell">
                      <div className="pdk-topbar"><div><span className="pdk-mark">P</span><div><small>PDK Perú · SSOMA</small><strong>Control de hallazgos</strong></div></div><span className="pdk-live"><i /> 4 obras conectadas</span></div>
                      <div className="pdk-content">
                        <div className="pdk-main">
                          <div className="product-kpis safety-kpis">
                            <article><small>Hallazgos abiertos</small><strong>32</strong><em>-8 esta semana</em></article>
                            <article><small>Acciones vencidas</small><strong>05</strong><em className="danger">Prioridad alta</em></article>
                            <article><small>Cierre oportuno</small><strong>91%</strong><em>Meta: 90%</em></article>
                          </div>
                          <div className="risk-board">
                            <div className="mini-heading"><div><small>Riesgo por categoría</small><strong>Seguimiento en tiempo real</strong></div><span>Agosto⌄</span></div>
                            <div className="risk-row"><span>Actos inseguros</span><i><b style={{width:"74%"}} /></i><strong>14</strong></div>
                            <div className="risk-row"><span>Condición subestándar</span><i><b className="orange" style={{width:"56%"}} /></i><strong>09</strong></div>
                            <div className="risk-row"><span>Orden y limpieza</span><i><b className="yellow" style={{width:"38%"}} /></i><strong>06</strong></div>
                            <div className="risk-row"><span>EPP</span><i><b className="green" style={{width:"22%"}} /></i><strong>03</strong></div>
                          </div>
                          <div className="site-cards"><article><i className="site-dot green" /><div><small>THE EDGE</small><strong>94% cerrado</strong></div><span>12 / 13</span></article><article><i className="site-dot orange" /><div><small>UPPER 28</small><strong>78% cerrado</strong></div><span>18 / 23</span></article></div>
                        </div>
                        <div className="pdk-rail">
                          <div className="pdk-score"><small>Indicador preventivo</small><strong>8.7</strong><span>↑ 1.2 pts</span></div>
                          <div className="pdk-activity"><small>Actividad reciente</small><article><i>✓</i><div><strong>Hallazgo cerrado</strong><span>THE EDGE · 09:42</span></div></article><article><i className="photo">▣</i><div><strong>Evidencia cargada</strong><span>UPPER 28 · 09:18</span></div></article><article><i className="user">→</i><div><strong>Responsable asignado</strong><span>TCO · 08:55</span></div></article></div>
                        </div>
                      </div>
                    </div>
                    <div className="product-float pdk-float"><span>!</span><div><small>Acción correctiva</small><strong>Responsable notificado</strong></div><b>Automático</b></div>
                  </div>
                ) : (
                  <div className="case-visual operator-visual" aria-label={item.imageAlt}>
                    <div className="operator-console">
                      <div className="operator-console-head"><div><span className="operator-mark">PD</span><strong>Parte Diario</strong></div><span className="live-pill"><i /> Operación activa</span></div>
                      <div className="operator-kpis">
                        <div><small>Partes hoy</small><strong>24</strong><span>+18%</span></div>
                        <div><small>Por aprobar</small><strong>03</strong><span className="warm">Pendientes</span></div>
                        <div><small>Completados</small><strong>21</strong><span>87.5%</span></div>
                      </div>
                      <div className="operator-table">
                        <div className="operator-row row-head"><span>Operador</span><span>Equipo</span><span>Horas</span><span>Estado</span></div>
                        <div className="operator-row"><span><i className="avatar">JM</i> José M.</span><span>EXC-104</span><span>8.5 h</span><b>Aprobado</b></div>
                        <div className="operator-row"><span><i className="avatar coral">AR</i> Ana R.</span><span>RET-032</span><span>7.8 h</span><b className="review">En revisión</b></div>
                        <div className="operator-row"><span><i className="avatar cyan">CL</i> Carlos L.</span><span>CAR-018</span><span>8.0 h</span><b>Aprobado</b></div>
                      </div>
                    </div>
                    <div className="operator-phone">
                      <div className="phone-speaker" /><div className="phone-header"><span>‹</span><strong>Nuevo parte</strong><i>•••</i></div>
                      <div className="phone-progress"><span /><span /><span /><span /></div><p>DATOS DE LA JORNADA</p>
                      <label>Operador <strong>José Mendoza</strong></label><label>Equipo <strong>Excavadora EXC-104</strong></label>
                      <div className="phone-fields"><label>Inicio<strong>07:00</strong></label><label>Fin<strong>17:30</strong></label></div>
                      <label className="signature">Firma digital <em>José M.</em></label><button>Enviar parte <span>→</span></button>
                    </div>
                    <div className="operator-pdf"><span>PDF</span><div><strong>Documento generado</strong><small>Parte #PD-00284</small></div><b>✓</b></div>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="more-projects" data-reveal>
            <div className="more-title"><p className="overline">Más soluciones</p><h3>Un portafolio que sigue creciendo.</h3></div>
            <div className="more-list">
              {moreProjects.map((project, index) => (
                <article key={project.title}>
                  <span>{String(index + 4).padStart(2, "0")}</span>
                  <div><small>{project.client}</small><h4>{project.title}</h4><p>{project.description}</p><em>{project.tech}</em></div>
                  <b aria-hidden="true">↗</b>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="perfil" className="profile-section">
        <div className="shell profile-grid" data-reveal>
          <div className="profile-intro">
            <p className="overline accent">Perfil profesional</p>
            <h2>La tecnología es el medio. El proceso es el punto de partida.</h2>
            <p>Combino criterio de negocio, desarrollo no-code y experiencia en campo para crear soluciones simples de operar, medibles y sostenibles.</p>
          </div>
          <div className="profile-content">
            <div className="timeline">
              <article><span>2024 — Actualidad</span><h3>Cofundador, consultor y docente</h3><h4>VUCA Consultoría y Capacitación</h4><p>Dirección de proyectos, soluciones no-code y formación práctica en AppSheet para empresas y profesionales.</p></article>
              <article><span>2022 — 2023</span><h3>Jefe de Proyectos</h3><h4>Bizflow</h4><p>Digitalización de formularios, aprobaciones y reportes para operaciones vinculadas a CUMBRA y Quellaveco.</p></article>
              <article><span>Formación</span><h3>Bachiller en Ingeniería de Sistemas</h3><h4>Especialización aplicada</h4><p>Automatización, bases de datos, analítica, ecosistema Google y construcción de productos no-code.</p></article>
            </div>
            <div className="stack">
              <p className="overline">Herramientas</p>
              <div>{stack.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="section services-section">
        <div className="process-aurora process-aurora-one" aria-hidden="true" />
        <div className="process-aurora process-aurora-two" aria-hidden="true" />
        <div className="shell process-shell">
          <div className="process-heading" data-reveal>
            <div>
              <p className="overline">Cómo trabajo</p>
              <h2>De una idea suelta a una <em>solución operativa.</em></h2>
            </div>
            <div className="process-intro">
              <span>El método</span>
              <p>Una buena app no empieza con pantallas. Empieza entendiendo una fricción, convirtiéndola en una experiencia simple y acompañándola hasta que genere valor.</p>
            </div>
          </div>

          <div className="process-experience" data-reveal>
            <div className="process-tabs" role="tablist" aria-label="Etapas de trabajo">
              {processStages.map((stage, index) => (
                <button
                  key={stage.number}
                  id={`process-tab-${index}`}
                  className={activeProcess === index ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={activeProcess === index}
                  aria-controls="process-story-panel"
                  onClick={() => setActiveProcess(index)}
                >
                  <span>{stage.number}</span>
                  <div><small>{stage.verb}</small><strong>{stage.eyebrow}</strong></div>
                  <i aria-hidden="true">↗</i>
                </button>
              ))}
            </div>

            <div
              id="process-story-panel"
              className={`process-panel stage-${activeProcess + 1}`}
              role="tabpanel"
              aria-labelledby={`process-tab-${activeProcess}`}
              key={activeStage.number}
            >
              <div className="process-window" aria-hidden="true">
                <div className="process-window-bar">
                  <div><i /><i /><i /></div>
                  <span><b /> Sistema en construcción</span>
                </div>
                <div className="process-canvas">
                  <div className="process-grid" />
                  <div className="process-node node-source"><small>Entrada</small><strong>{activeStage.source}</strong><span>Origen</span></div>
                  <div className="process-connector connector-left"><i /></div>
                  <div className="process-core"><span>{activeStage.number}</span><small>{activeStage.center}</small><b /></div>
                  <div className="process-connector connector-right"><i /></div>
                  <div className="process-node node-target"><small>Resultado</small><strong>{activeStage.target}</strong><span>Listo para avanzar</span></div>
                  <div className="process-toast"><i>✓</i><div><small>Entregable de esta etapa</small><strong>{activeStage.outcome}</strong></div></div>
                </div>
              </div>

              <div className="process-narrative">
                <div className="process-chapter"><span>Capítulo {activeStage.number}</span><i>{activeStage.metric}</i></div>
                <p className="process-eyebrow">{activeStage.eyebrow}</p>
                <h3>{activeStage.title}</h3>
                <p className="process-story-copy">{activeStage.story}</p>
                <div className="process-signal"><small>Lo que toma forma</small><strong>{activeStage.signal}</strong></div>
                <div className="process-progress" aria-label={`Etapa ${activeProcess + 1} de ${processStages.length}`}>
                  {processStages.map((stage, index) => <span className={index <= activeProcess ? "is-complete" : ""} key={stage.number} />)}
                </div>
              </div>
            </div>
          </div>

          <div className="capability-strip" data-reveal>
            <div className="capability-lead"><span>El resultado puede ser</span><strong>Una solución hecha alrededor de tu operación.</strong></div>
            <article><span>APP</span><h3>Aplicación empresarial</h3><p>Campo, inventario, RR. HH. o aprobaciones.</p></article>
            <article><span>AUTO</span><h3>Automatización</h3><p>Alertas, documentos e integraciones.</p></article>
            <article><span>DATA</span><h3>Control y analítica</h3><p>Indicadores claros para decidir mejor.</p></article>
            <a href="/cursos"><span>EDU</span><h3>Capacitación</h3><p>AppSheet aplicado desde el primer día.</p><b>Ver cursos ↗</b></a>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="contact-glow" aria-hidden="true" />
        <div className="shell contact-grid" data-reveal>
          <div>
            <p className="overline">¿Tienes un proceso manual por mejorar?</p>
            <h2>Convirtámoslo en una solución que tu equipo quiera usar.</h2>
            <div className="contact-signals"><span><i /> Respuesta en menos de 24 h</span><span>Primera conversación sin costo</span></div>
          </div>
          <div className="contact-card">
            <p>Cuéntame cómo trabajan hoy. Revisaremos el problema y definiremos una primera etapa clara, útil y ajustada a tu presupuesto.</p>
            <a className="contact-link whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>+51 925 180 724</strong><b>↗</b></a>
            <a className="contact-link" href="mailto:paolo.gonzalesmoya@gmail.com"><span>Correo</span><strong>paolo.gonzalesmoya@gmail.com</strong><b>↗</b></a>
            <small>Lima, Perú · Atención presencial y remota</small>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand">PAOLO<span>/</span>GONZALES</div>
        <p>© 2026 Paolo Gonzales · Automatización que sí se usa.</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar a Paolo por WhatsApp">WA</a>
    </main>
  );
}
