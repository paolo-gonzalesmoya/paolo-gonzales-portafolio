"use client";

import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20el%20caso%20del%20inventario%20visual%20y%20quiero%20conversar%20sobre%20un%20proyecto.";

const storySteps = [
  {
    number: "01",
    eyebrow: "Registrar e inspeccionar",
    title: "Cada unidad entra con identidad y deja una historia documentada.",
    copy: "Desde el primer registro, la unidad queda asociada a su cliente, tipo y condición. El checklist suma implementos, combustible, AdBlue, limpieza y fotografías para construir una evidencia completa.",
    image: "/assets/projects/timco/scene-02.webp",
  },
  {
    number: "02",
    eyebrow: "Compartir",
    title: "La evidencia viaja con un QR.",
    copy: "El sistema genera el PDF de ingreso y un acceso QR para que el cliente pueda consultar el documento asociado a su unidad.",
    image: "/assets/projects/timco/scene-03.webp",
  },
  {
    number: "03",
    eyebrow: "Actualizar",
    title: "Inventario actualizado.",
    copy: "El inventario vigente se deduce automáticamente de los ingresos menos las salidas. Así, cada unidad visible corresponde a una permanencia real dentro del almacén.",
    image: "/assets/projects/timco/scene-04.webp",
  },
  {
    number: "04",
    eyebrow: "Ubicar",
    title: "El almacén se vuelve visible.",
    copy: "El layout representa las columnas reales, permite mover unidades con mouse o pantalla táctil y reorganiza cada fila cuando se registra una salida.",
    image: "/assets/projects/timco/scene-05.webp",
  },
];

type SiteName = "Timco 1" | "Timco 2";
type Unit = {
  id: string;
  client: "Andes" | "Pacífico";
  type: string;
  area: number;
  condition: "Nuevo" | "Usado";
  fuel: "Alto" | "Medio" | "Bajo";
  adblue: boolean;
  clean: boolean;
};
type Lane = { id: string; units: Unit[] };
type Layouts = Record<SiteName, Lane[]>;

const unit = (
  id: string,
  client: Unit["client"],
  area: number,
  condition: Unit["condition"],
  fuel: Unit["fuel"],
  adblue = true,
  clean = true,
  type = "Tracto",
): Unit => ({ id, client, area, condition, fuel, adblue, clean, type });

function createInitialLayouts(): Layouts {
  return {
    "Timco 1": [
      { id: "A", units: [unit("DEMO-104", "Pacífico", 19.8, "Nuevo", "Alto"), unit("DEMO-118", "Pacífico", 15.5, "Usado", "Medio", true, false)] },
      { id: "B", units: [unit("DEMO-203", "Andes", 15.5, "Nuevo", "Bajo", false), unit("DEMO-216", "Andes", 26, "Usado", "Medio")] },
      { id: "C", units: [] },
      { id: "D", units: [unit("DEMO-307", "Andes", 26, "Nuevo", "Alto"), unit("DEMO-312", "Andes", 35, "Usado", "Bajo", true, false)] },
      { id: "E", units: [unit("DEMO-405", "Andes", 35, "Nuevo", "Medio"), unit("DEMO-411", "Andes", 35, "Nuevo", "Alto")] },
      { id: "F", units: [unit("DEMO-509", "Andes", 35, "Usado", "Medio", false), unit("DEMO-514", "Andes", 15.5, "Nuevo", "Alto")] },
      { id: "G", units: [unit("DEMO-608", "Andes", 32.5, "Nuevo", "Bajo", true, false)] },
      { id: "H", units: [unit("DEMO-702", "Andes", 28.5, "Usado", "Medio"), unit("DEMO-719", "Andes", 35, "Nuevo", "Alto")] },
      { id: "I", units: [unit("DEMO-805", "Andes", 35, "Nuevo", "Medio"), unit("DEMO-817", "Andes", 35, "Usado", "Bajo")] },
      { id: "J", units: [unit("DEMO-903", "Andes", 32.5, "Nuevo", "Alto"), unit("DEMO-921", "Andes", 30, "Usado", "Medio", true, false)] },
      { id: "K", units: [unit("DEMO-026", "Andes", 16.5, "Nuevo", "Bajo", false)] },
      { id: "L", units: [] },
    ],
    "Timco 2": [
      { id: "A", units: [unit("DEMO-214", "Pacífico", 18, "Usado", "Medio")] },
      { id: "B", units: [] },
      { id: "C", units: [unit("DEMO-331", "Pacífico", 24, "Nuevo", "Alto")] },
      { id: "D", units: [unit("DEMO-448", "Andes", 30, "Usado", "Bajo", true, false)] },
      { id: "E", units: [] },
      { id: "F", units: [unit("DEMO-552", "Andes", 27.5, "Nuevo", "Medio")] },
      { id: "G", units: [] },
      { id: "H", units: [] },
    ],
  };
}

export default function WarehouseCase() {
  const [activeStory, setActiveStory] = useState(0);
  const storyRefs = useRef<Array<HTMLElement | null>>([]);
  const [site, setSite] = useState<SiteName>("Timco 1");
  const [layouts, setLayouts] = useState<Layouts>(() => createInitialLayouts());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [recentExits, setRecentExits] = useState(["DEMO-088", "DEMO-173", "DEMO-290"]);
  const [announcement, setAnnouncement] = useState("Demostración lista.");

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

  const activeLanes = layouts[site];
  const activeUnits = useMemo(() => activeLanes.flatMap((lane) => lane.units), [activeLanes]);
  const selectedUnit = activeUnits.find((item) => item.id === selectedId) ?? null;
  const totalArea = activeUnits.reduce((sum, item) => sum + item.area, 0);

  const moveUnit = (targetLaneId: string) => {
    if (!selectedId) {
      setAnnouncement("Primero selecciona una unidad.");
      return;
    }
    let moving: Unit | undefined;
    const nextLanes = activeLanes.map((lane) => {
      const found = lane.units.find((item) => item.id === selectedId);
      if (found) moving = found;
      return { ...lane, units: lane.units.filter((item) => item.id !== selectedId) };
    });
    if (!moving) return;
    const next = nextLanes.map((lane) =>
      lane.id === targetLaneId ? { ...lane, units: [...lane.units, moving as Unit] } : lane,
    );
    setLayouts((current) => ({ ...current, [site]: next }));
    setAnnouncement(`${selectedId} se movió a la columna ${targetLaneId}.`);
  };

  const registerExit = () => {
    if (!selectedId) return;
    setLayouts((current) => ({
      ...current,
      [site]: current[site].map((lane) => ({
        ...lane,
        units: lane.units.filter((item) => item.id !== selectedId),
      })),
    }));
    setRecentExits((current) => [selectedId, ...current].slice(0, 4));
    setAnnouncement(`${selectedId} salió del inventario. La columna se compactó automáticamente.`);
    setSelectedId(null);
  };

  const resetDemo = () => {
    setLayouts(createInitialLayouts());
    setSelectedId(null);
    setSearch("");
    setRecentExits(["DEMO-088", "DEMO-173", "DEMO-290"]);
    setAnnouncement("La demostración volvió a su estado inicial.");
  };

  const requestConsultation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const contact = String(form.get("contact") || "").trim();
    const need = String(form.get("need") || "").trim();
    const context = String(form.get("context") || "").trim();
    const message = [
      `Hola Paolo, soy ${name}${company ? ` de ${company}` : ""}.`,
      `Quiero solicitar una consulta sobre: ${need}.`,
      `Contexto: ${context}`,
      `Puedes contactarme en: ${contact}.`,
    ].join("\n\n");
    window.open(`https://wa.me/51925180724?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="timco-case">
      <header className="timco-header">
        <Link className="timco-brand" href="/" aria-label="Volver al portafolio de Paolo Gonzales">
          <span>PG</span><strong>Paolo Gonzales</strong>
        </Link>
        <nav aria-label="Navegación del caso">
          <a href="#recorrido">Recorrido</a>
          <a href="#demo">Demo</a>
          <a href="#roles">Roles</a>
        </nav>
        <Link className="timco-header-link" href="/">Volver al portafolio <span>↗</span></Link>
      </header>

      <section id="top" className="timco-hero">
        <div className="timco-shell timco-hero-cover">
          <figure className="timco-hero-media">
            <img src="/assets/projects/timco/scene-01.webp" alt="Ingreso digital de una unidad pesada al almacén" />
            <figcaption><span>Proyecto</span> Del ingreso al inventario visual.</figcaption>
          </figure>
          <div className="timco-hero-content">
            <p className="timco-overline"><span>Caso de estudio</span> Proyecto dedicado</p>
            <h1>Almacén<br />Layout.</h1>
            <p className="timco-hero-lead">Inventario visual y trazabilidad de unidades.</p>
            <p className="timco-hero-description">Un sistema que acompaña a cada vehículo desde el registro inicial hasta la salida, conserva su evidencia y convierte el espacio ocupado en información para operar y cobrar.</p>
            <ol className="timco-flowline" aria-label="Flujo principal del sistema">
              <li>Ingreso</li><li>Checklist</li><li>Evidencia</li><li>Inventario</li><li>Salida</li>
            </ol>
            <div className="timco-hero-actions">
              <a href="#recorrido">Entender el recorrido <span>↓</span></a>
              <a href="#demo">Probar el layout</a>
            </div>
          </div>
          <div className="timco-hero-facts" aria-label="Capacidades principales">
            <span><strong>01</strong> Registro de ingreso</span>
            <span><strong>02</strong> Evidencia + QR</span>
            <span><strong>03</strong> Inventario visual</span>
            <span><strong>04</strong> Salida documentada</span>
          </div>
        </div>
      </section>

      <section id="recorrido" className="timco-story">
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

      <section id="demo" className="timco-demo-section">
        <div className="timco-shell">
          <div className="timco-section-heading timco-demo-heading">
            <div>
              <p className="timco-overline">Demostración interactiva</p>
              <h2>Prueba el layout en acción.</h2>
            </div>
            <p>Selecciona una unidad y luego otra columna. También puedes arrastrarla con el mouse. Al registrar una salida, la unidad desaparece y su columna se compacta.</p>
          </div>

          <div className="warehouse-app">
            <div className="warehouse-toolbar">
              <div className="warehouse-tabs" role="tablist" aria-label="Almacenes de demostración">
                {(["Timco 1", "Timco 2"] as SiteName[]).map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={site === name}
                    className={site === name ? "is-active" : ""}
                    onClick={() => { setSite(name); setSelectedId(null); setAnnouncement(`${name} seleccionado.`); }}
                  >{name}</button>
                ))}
              </div>
              <label className="warehouse-search">
                <span>Buscar unidad</span>
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ej. DEMO-104" />
              </label>
              <button className="warehouse-reset" type="button" onClick={resetDemo}>Restablecer</button>
            </div>

            <div className="warehouse-board" role="region" aria-label={`Layout interactivo de ${site}`}>
              <div className="warehouse-lanes">
                {activeLanes.map((lane) => {
                  const laneArea = lane.units.reduce((sum, item) => sum + item.area, 0);
                  return (
                    <section
                      className="warehouse-lane"
                      key={lane.id}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => moveUnit(lane.id)}
                    >
                      <strong>{lane.id}</strong>
                      <div>
                        {lane.units.map((item) => {
                          const matches = !search || `${item.id} ${item.type}`.toLowerCase().includes(search.toLowerCase());
                          return (
                            <button
                              type="button"
                              draggable
                              onDragStart={() => setSelectedId(item.id)}
                              onClick={() => { setSelectedId(item.id); setAnnouncement(`${item.id} seleccionada.`); }}
                              className={`warehouse-unit ${item.client === "Pacífico" ? "is-green" : "is-blue"}${selectedId === item.id ? " is-selected" : ""}${matches ? "" : " is-muted"}`}
                              key={item.id}
                              aria-pressed={selectedId === item.id}
                            >
                              <span>{item.id}</span>
                              <small>{item.type}</small>
                              <i aria-hidden="true">
                                <b title={`Combustible ${item.fuel}`}>⛽</b>
                                {item.adblue && <b title="AdBlue">◆</b>}
                                <b title={item.clean ? "Limpio" : "Requiere limpieza"}>{item.clean ? "✦" : "!"}</b>
                              </i>
                            </button>
                          );
                        })}
                        <button className="warehouse-slot" type="button" onClick={() => moveUnit(lane.id)} aria-label={`Mover la unidad seleccionada a la columna ${lane.id}`}>+</button>
                      </div>
                      <span>{laneArea.toFixed(1)} m²</span>
                    </section>
                  );
                })}
              </div>
            </div>

            <div className="warehouse-summary">
              <article className="warehouse-detail">
                <div><span>Inventario actual</span><strong>{activeUnits.length}</strong></div>
                <div><span>Área ocupada</span><strong>{totalArea.toFixed(1)} m²</strong></div>
                {selectedUnit ? (
                  <div className="warehouse-selected">
                    <p>Unidad seleccionada</p>
                    <strong>{selectedUnit.id}</strong>
                    <span>{selectedUnit.type} · {selectedUnit.condition} · {selectedUnit.area.toFixed(1)} m²</span>
                    <button type="button" onClick={registerExit}>Registrar salida</button>
                  </div>
                ) : <p className="warehouse-empty">Selecciona una unidad para ver su detalle.</p>}
              </article>
              <article>
                <p>Salieron recientemente</p>
                <ul>{recentExits.map((item) => <li key={item}><strong>{item}</strong><span>PDF de salida</span></li>)}</ul>
              </article>
              <article>
                <p>Leyenda operativa</p>
                <ul className="warehouse-legend">
                  <li><i className="is-blue" /> Cliente Andes</li>
                  <li><i className="is-green" /> Cliente Pacífico</li>
                  <li><b>⛽</b> Combustible</li>
                  <li><b>◆</b> AdBlue</li>
                  <li><b>✦</b> Estado de limpieza</li>
                </ul>
              </article>
            </div>
            <p className="warehouse-notice">Demo con datos completamente ficticios. No contiene placas, chasis, clientes ni documentos reales.</p>
            <p className="sr-only" aria-live="polite">{announcement}</p>
          </div>
        </div>
      </section>

      <section className="timco-evidence timco-shell">
        <div className="timco-evidence-media"><img src="/assets/projects/timco/scene-06.webp" alt="Comparación visual entre el ingreso y la salida de una unidad" loading="lazy" /></div>
        <div>
          <p className="timco-overline">Cierre de la unidad</p>
          <h2>La salida cierra la evidencia.</h2>
          <p>Ingreso y salida conservan su propia evidencia. La comparación ayuda a identificar diferencias y respaldar posibles reclamos sin reconstruir la historia desde mensajes o archivos dispersos.</p>
          <ul>
            <li>Checklist técnico y condición de la unidad.</li>
            <li>Fotografías de ingreso y salida.</li>
            <li>Documento PDF accesible mediante QR.</li>
            <li>Trazabilidad del responsable y del movimiento.</li>
          </ul>
        </div>
      </section>

      <section id="roles" className="timco-role-control">
        <div className="timco-shell timco-role-control-grid">
          <figure className="timco-role-visual">
            <img
              src="/assets/projects/timco/roles-control.webp"
              alt="Tres estaciones conectadas representan los accesos del administrador, almacenero y cliente observador"
              loading="lazy"
              decoding="async"
            />
            <figcaption><span />Una fuente de datos · tres niveles de acceso</figcaption>
          </figure>

          <div className="timco-role-content">
            <p className="timco-overline">Permisos por responsabilidad</p>
            <h2>Cada rol ve y hace exactamente lo necesario.</h2>
            <p className="timco-role-summary">El sistema adapta información y acciones a cada usuario. Todos trabajan sobre la misma operación, sin exponer controles que no les corresponden.</p>

            <div className="timco-role-list">
              <article>
                <span>Administrador</span>
                <div><h3>Control y decisión</h3><p>Consulta inventario, áreas y datos necesarios para el cobro.</p></div>
              </article>
              <article>
                <span>Almacenero</span>
                <div><h3>Operación del layout</h3><p>Registra movimientos y ubica las unidades vigentes.</p></div>
              </article>
              <article>
                <span>Cliente observador</span>
                <div><h3>Evidencia sin edición</h3><p>Accede a sus documentos sin alterar la operación.</p></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="timco-contribution">
        <div className="timco-shell">
          <div className="timco-contribution-intro">
            <div>
              <p className="timco-overline">Alcance y responsabilidad</p>
              <h2>Del proceso físico a una operación conectada.</h2>
            </div>
            <p>Mi responsabilidad fue traducir la lógica real del almacén en un sistema útil para quienes registran, controlan y toman decisiones. El valor está en conectar toda la operación, no en sumar pantallas aisladas.</p>
          </div>
          <div className="timco-contribution-grid">
            <article><span>01</span><h3>Diagnóstico operativo</h3><p>Levantamiento del flujo, reglas, responsables y puntos de pérdida de información.</p></article>
            <article><span>02</span><h3>Modelo de datos</h3><p>Estructura para ingresos, salidas, unidades, evidencia, áreas y clientes.</p></article>
            <article><span>03</span><h3>Automatización</h3><p>Checklists, documentos PDF, códigos QR, permisos y actualización del inventario.</p></article>
            <article><span>04</span><h3>Experiencia operativa</h3><p>Interfaz móvil, layout táctil y analítica adaptados a la realidad del equipo.</p></article>
          </div>
        </div>
      </section>

      <section id="consulta" className="timco-cta">
        <div className="timco-shell timco-cta-grid">
          <div className="timco-cta-copy">
            <p className="timco-overline">Diagnóstico de procesos</p>
            <h2>Empecemos por la fricción que más tiempo te cuesta.</h2>
            <p>Comparte una necesidad concreta y recibirás una primera orientación sobre el proceso, la información necesaria y el mejor punto para comenzar.</p>
            <ul>
              <li>Lectura inicial de tu necesidad</li>
              <li>Recomendación del primer paso</li>
              <li>Respuesta en 1–2 días hábiles</li>
            </ul>
            <a className="timco-cta-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><span />Prefiero escribir directamente por WhatsApp ↗</a>
          </div>

          <form className="timco-consultation-form" onSubmit={requestConsultation}>
            <div className="timco-form-heading">
              <span>Cuéntame tu caso</span>
              <strong>La información justa para darte una respuesta útil.</strong>
            </div>
            <label className="timco-form-wide">
              <span>¿Qué necesitas mejorar?</span>
              <select name="need" defaultValue="" required>
                <option value="" disabled>Selecciona una necesidad</option>
                <option>Inventario o almacén</option>
                <option>Aprobaciones y documentos</option>
                <option>Reportes y control de datos</option>
                <option>Proceso operativo a medida</option>
                <option>Aún no lo tengo claro</option>
              </select>
            </label>
            <label>
              <span>Nombre</span>
              <input name="name" type="text" autoComplete="name" placeholder="Tu nombre" required />
            </label>
            <label>
              <span>Empresa</span>
              <input name="company" type="text" autoComplete="organization" placeholder="Empresa o proyecto" />
            </label>
            <label className="timco-form-wide">
              <span>Correo o WhatsApp</span>
              <input name="contact" type="text" autoComplete="email" placeholder="Dónde puedo responderte" required />
            </label>
            <label className="timco-form-wide">
              <span>¿Qué ocurre hoy?</span>
              <textarea name="context" rows={4} minLength={20} placeholder="Cuéntame brevemente el proceso, quiénes participan y dónde se pierde tiempo o control." required />
            </label>
            <div className="timco-form-submit timco-form-wide">
              <button type="submit">Preparar mi consulta <span>↗</span></button>
              <p>Revisarás el mensaje en WhatsApp antes de enviarlo.</p>
            </div>
          </form>
        </div>
      </section>

      <footer className="timco-footer timco-shell">
        <Link className="timco-brand" href="/"><span>PG</span><strong>Paolo Gonzales</strong></Link>
        <p>© 2026 Paolo Gonzales</p>
        <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Volver arriba ↑</a>
      </footer>
    </main>
  );
}
