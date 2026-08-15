"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  return (
    <main className="timco-case">
      <header className="timco-header">
        <Link className="timco-brand" href="/" aria-label="Volver al portafolio de Paolo Gonzales">
          <span>PG</span><strong>Paolo Gonzales</strong>
        </Link>
        <nav aria-label="Navegación del caso">
          <a href="#recorrido">Recorrido</a>
          <a href="#demo">Demo</a>
          <a href="#arquitectura">Arquitectura</a>
        </nav>
        <Link className="timco-header-link" href="/">Volver al portafolio <span>↗</span></Link>
      </header>

      <section className="timco-hero">
        <div className="timco-shell timco-hero-frame">
          <div className="timco-hero-content">
            <p className="timco-overline"><span>Proyecto 01</span> Operación de almacenes</p>
            <h1>Cada unidad deja una historia desde que entra.</h1>
            <p>El sistema acompaña a cada vehículo desde su registro inicial hasta la salida: documenta su estado, mantiene el inventario visible y convierte el espacio ocupado en información para operar y cobrar.</p>
            <ol className="timco-flowline" aria-label="Flujo principal del sistema">
              <li>Ingreso</li><li>Checklist</li><li>Evidencia</li><li>Inventario</li><li>Salida</li>
            </ol>
            <div className="timco-hero-actions">
              <a href="#recorrido">Entender el recorrido <span>↓</span></a>
              <a href="#demo">Probar el layout</a>
            </div>
          </div>
          <figure className="timco-hero-media">
            <img src="/assets/projects/timco/scene-01.webp" alt="Ingreso digital de una unidad pesada al almacén" />
            <figcaption><span>01</span> El registro comienza en la puerta del almacén.</figcaption>
          </figure>
        </div>
        <div className="timco-shell timco-hero-facts" aria-label="Capacidades principales">
          <span><strong>01</strong> Registro de ingreso</span>
          <span><strong>02</strong> Evidencia + QR</span>
          <span><strong>03</strong> Inventario visual</span>
          <span><strong>04</strong> Salida documentada</span>
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
          <div className="timco-section-heading">
            <div><p className="timco-overline">Demostración interactiva</p><h2>Muévelo como en el almacén.</h2></div>
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

      <section id="arquitectura" className="timco-architecture">
        <div className="timco-shell">
          <div className="timco-architecture-intro">
            <div><p className="timco-overline">Arquitectura de solución</p><h2>Una operación, varias vistas.</h2></div>
            <p>La experiencia combina captura móvil, automatización documental, conciliación de datos, una interfaz espacial y analítica para decisiones.</p>
          </div>
          <div className="timco-stack">
            <article><span>01</span><h3>AppSheet</h3><p>Registro móvil, checklist, fotografías, ingreso, salida y vistas por rol.</p></article>
            <article><span>02</span><h3>Google Workspace</h3><p>Datos estructurados, generación de documentos y acceso mediante QR.</p></article>
            <article><span>03</span><h3>Apps Script</h3><p>Layout web interactivo que refleja el inventario y reorganiza las columnas.</p></article>
            <article><span>04</span><h3>Looker Studio</h3><p>Inventario, áreas, movimientos e información necesaria para el cobro.</p></article>
          </div>
        </div>
      </section>

      <section className="timco-access">
        <div className="timco-shell">
          <div className="timco-access-intro">
            <div>
              <p className="timco-overline">Acceso según responsabilidad</p>
              <h2>Cada rol ve lo necesario.</h2>
              <p>La misma fuente de datos ofrece control operativo, información para administrar y evidencia de consulta, sin exponer funciones que no corresponden a cada usuario.</p>
            </div>
            <figure><img src="/assets/projects/timco/scene-07.webp" alt="Administrador, almacenero y cliente consultando diferentes vistas del sistema" loading="lazy" /></figure>
          </div>
          <div className="timco-roles">
            <article><span>Administrador</span><h3>Área, control y cobro.</h3><p>Observa inventario, variación de áreas y la información que sostiene la gestión.</p></article>
            <article><span>Almacenero</span><h3>Ubicación y movimiento.</h3><p>Opera ingresos, salidas y el layout visual desde la realidad diaria del almacén.</p></article>
            <article><span>Cliente observador</span><h3>Evidencia disponible.</h3><p>Consulta los documentos de sus unidades sin alterar la información operativa.</p></article>
          </div>
        </div>
      </section>

      <section className="timco-role timco-shell">
        <div><p className="timco-overline">Mi aporte</p><h2>Convertir el proceso físico en un sistema que el equipo puede ver.</h2></div>
        <div><p>El trabajo conecta levantamiento del proceso, modelado de datos, experiencia móvil, automatizaciones, documentos, permisos, analítica y una interfaz espacial adaptada a la forma real del almacén.</p><p>No se trata de sumar pantallas: se trata de que cada movimiento deje evidencia y actualice la misma versión de la operación.</p></div>
      </section>

      <section className="timco-cta">
        <div className="timco-shell">
          <p className="timco-overline">Tu operación puede ser el siguiente caso</p>
          <h2>¿Hay un proceso que hoy depende de hojas, mensajes y memoria?</h2>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Conversemos por WhatsApp <span>↗</span></a>
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
