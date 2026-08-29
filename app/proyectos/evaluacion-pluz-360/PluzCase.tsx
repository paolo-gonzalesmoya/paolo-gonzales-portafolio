"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PluzRolesAnimation from "./PluzRolesAnimation";

const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20el%20caso%20de%20Evaluaci%C3%B3n%20360%20para%20PLUZ%20y%20quiero%20conversar%20sobre%20un%20proceso%20que%20necesito%20digitalizar.";
const calComUrl = "https://cal.com/paolo-gonzales-8itwaw";
const repositoryUrl = "https://github.com/paolo-gonzalesmoya/evaluacion-pluz-360";

const journeySteps = [
  {
    number: "01",
    eyebrow: "Configuración",
    title: "Hasta cuatro miradas por líder.",
    copy: "Cada líder puede tener Colaboradores, Pares, Jefe directo y Cliente alrededor. Las líneas muestran roles asignados: todavía no representan respuestas ni evaluaciones realizadas.",
    evidence: "El sistema admite de 1 a 4 roles por persona evaluada.",
    image: "/assets/projects/pluz-360/scene-01.webp",
    alt: "Dos configuraciones muestran líderes conectados a tres y cuatro roles",
  },
  {
    number: "02",
    eyebrow: "Variación real",
    title: "La configuración cambia por persona.",
    copy: "No todos reúnen las cuatro perspectivas. Las asignaciones reflejan la estructura real de la campaña y pueden incluir solo uno o dos roles, sin forzar un modelo uniforme.",
    evidence: "La variación pertenece a la asignación, no al resultado.",
    image: "/assets/projects/pluz-360/scene-02.webp",
    alt: "Dos configuraciones muestran líderes conectados a uno y dos roles",
  },
  {
    number: "03",
    eyebrow: "Dirección",
    title: "El feedback siempre avanza hacia el líder.",
    copy: "Las cuatro corrientes viajan en un solo sentido hacia quien es evaluado. No existe autoevaluación ni comparación contra un benchmark externo: el resultado resume la percepción de quienes lo rodean.",
    evidence: "Las flechas y pulsos solo apuntan hacia la persona evaluada.",
    image: "/assets/projects/pluz-360/scene-03.webp",
    alt: "Cuatro roles envían feedback hacia un líder central",
  },
  {
    number: "04",
    eyebrow: "Confidencialidad",
    title: "Combinar protege cada respuesta.",
    copy: "Las respuestas se agregan dentro de su rol antes de llegar al dashboard. Los satélites 6, 4, 1 y 2 son una metáfora ilustrativa del componente: explican la combinación, no el volumen real de la campaña.",
    evidence: "El cliente consulta agregados; no respuestas individuales.",
    image: "/assets/projects/pluz-360/scene-04.webp",
    alt: "Grupos de respuestas anónimas convergen en cuatro roles",
  },
  {
    number: "05",
    eyebrow: "Resultado",
    title: "Un promedio claro, no una opinión aislada.",
    copy: "El feedback agregado termina en un indicador comprensible para la persona evaluada. El 4.2 del ejemplo pertenece a la animación explicativa; no es un resultado global de la campaña.",
    evidence: "Se requieren al menos 2 respuestas para una lectura confiable.",
    image: "/assets/projects/pluz-360/scene-05.webp",
    alt: "Un avatar aparece dentro de un anillo de promedio azul",
  },
] as const;

const systemLayers = [
  {
    number: "01",
    title: "Experiencia evaluador",
    copy: "Login, líderes asignados, formulario por rol, guardado de respuestas y cierre controlado de cada evaluación.",
    tags: ["Next.js 16", "React 19", "Server Actions"],
  },
  {
    number: "02",
    title: "Datos y acceso",
    copy: "Supabase reúne Auth, Postgres y RLS para que cada evaluador solo pueda leer y escribir sus propias respuestas.",
    tags: ["Supabase Auth", "Postgres", "RLS"],
  },
  {
    number: "03",
    title: "Administración",
    copy: "Superadmin, viewer y viewer básico reciben capacidades distintas sin abrir el detalle individual al panel del cliente.",
    tags: ["3 niveles", "Permisos", "Agregados"],
  },
  {
    number: "04",
    title: "Lectura ejecutiva",
    copy: "KPIs, cumplimiento, cuota mínima, métricas, liderazgo por gerencia e indicadores convierten el avance en decisiones.",
    tags: ["Recharts", "6 vistas", "Vercel"],
  },
] as const;

export default function PluzCase() {
  const [activeJourney, setActiveJourney] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const journeyRefs = useRef<Array<HTMLElement | null>>([]);
  const journeySection = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveJourney(Number((visible.target as HTMLElement).dataset.journey));
      },
      { rootMargin: "-30% 0px -38%", threshold: [0.12, 0.35, 0.62] },
    );
    journeyRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = journeySection.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setJourneyProgress(Math.max(0, Math.min(1, -rect.top / distance)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main className="timco-case pluz-case">
      <header className="timco-header pluz-header">
        <Link className="timco-brand" href="/" aria-label="Volver al portafolio de Paolo Gonzales">
          <span>PG</span><strong>Paolo Gonzales</strong>
        </Link>
        <nav aria-label="Navegación del caso PLUZ 360">
          <a href="#recorrido">Recorrido</a>
          <a href="#modelo">Modelo 360</a>
          <a href="#arquitectura">Arquitectura</a>
        </nav>
        <Link className="timco-header-link" href="/">Volver al portafolio <span>↗</span></Link>
      </header>

      <section id="top" className="pluz-hero">
        <div className="timco-shell pluz-hero-shell">
          <img className="pluz-hero-art" src="/assets/projects/pluz-360/scene-01.webp" alt="Configuraciones de tres y cuatro roles alrededor de líderes evaluados" />
          <div className="pluz-hero-wash" aria-hidden="true" />
          <div className="pluz-hero-copy">
            <div className="pluz-project-mark">
              <img src="/assets/projects/pluz-360/logo-pluz.png" alt="PLUZ" />
              <span>Caso de estudio · Liderazgo</span>
            </div>
            <h1>Evaluación<br /><em>360.</em></h1>
            <p className="pluz-hero-lead">Una campaña compleja convertida en un recorrido claro, confidencial y medible.</p>
            <p className="pluz-hero-description">Plataforma construida a medida por VUCA Consultoría para Asertiva Consulting y PLUZ Energía Perú. Conecta asignaciones, evaluación, administración y lectura ejecutiva sin reducir el proceso a una encuesta genérica.</p>
            <div className="pluz-hero-actions">
              <a href="#recorrido">Entender el modelo <span>↓</span></a>
              <a href="#modelo">Ver la animación</a>
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

      <section id="recorrido" ref={journeySection} className="pluz-journey">
        <div className="pluz-journey-progress" aria-hidden="true"><span style={{ width: `${journeyProgress * 100}%` }} /></div>
        <div className="timco-shell pluz-journey-intro">
          <p>El modelo, escena por escena</p>
          <h2>Antes del dashboard,<br />hay que entender el recorrido.</h2>
          <span>Las cinco escenas nacen de la animación real incluida en Dashboard / KPI&apos;s. La cámara avanza hacia el mismo líder mientras cambia el significado de lo que ocurre a su alrededor.</span>
        </div>
        <div className="timco-shell pluz-journey-grid">
          <div className="pluz-journey-copy">
            {journeySteps.map((step, index) => (
              <article
                key={step.number}
                data-journey={index}
                ref={(node) => { journeyRefs.current[index] = node; }}
                className={activeJourney === index ? "is-active" : ""}
              >
                <img src={step.image} alt={step.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                <p className="pluz-overline"><span>{step.number}</span>{step.eyebrow}</p>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <small><i />{step.evidence}</small>
              </article>
            ))}
          </div>
          <div className="pluz-journey-stage" aria-hidden="true">
            <div>
              <div className="pluz-stage-orbit" />
              {journeySteps.map((step, index) => (
                <img
                  key={step.number}
                  className={index === activeJourney ? "is-active" : index < activeJourney ? "is-before" : "is-after"}
                  src={step.image}
                  alt=""
                />
              ))}
              <div className="pluz-stage-status">
                <span>{journeySteps[activeJourney].number} / 05</span>
                <div>{journeySteps.map((step, index) => <i key={step.number} className={index <= activeJourney ? "is-active" : ""} />)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modelo" className="pluz-model-section">
        <div className="timco-shell">
          <div className="pluz-section-heading">
            <div>
              <p className="pluz-overline">Una explicación que se mueve</p>
              <h2>La animación resume la lógica antes de mostrar cifras.</h2>
            </div>
            <p>Esta adaptación conserva los cinco estados del componente original. Puedes dejarla avanzar o seleccionar una escena para revisar cómo cambia la lectura.</p>
          </div>
          <PluzRolesAnimation />
        </div>
      </section>

      <section className="pluz-scale">
        <div className="timco-shell">
          <div className="pluz-scale-heading">
            <p className="pluz-overline">Escala verificada</p>
            <h2>No es una encuesta genérica.<br />Es una campaña con estructura propia.</h2>
          </div>
          <div className="pluz-scale-grid">
            <article><span>Evaluadores</span><strong>671</strong><p>Personas habilitadas para completar evaluaciones según sus asignaciones.</p></article>
            <article><span>Líderes evaluados</span><strong>87</strong><p>Personas que reciben feedback agregado desde los roles definidos.</p></article>
            <article><span>Relaciones</span><strong>1,109</strong><p>Vínculos evaluador ↔ evaluado ↔ rol controlados por el sistema.</p></article>
            <article><span>Instrumento</span><strong>52 + 4</strong><p>Preguntas de escala 1–5 y preguntas abiertas de cierre.</p></article>
          </div>
          <p className="pluz-scale-note"><span /> Las cantidades 6/4/1/2 de la escena de confidencialidad son ilustrativas. Las cifras de esta sección sí corresponden a la campaña documentada.</p>
        </div>
      </section>

      <section id="arquitectura" className="pluz-architecture">
        <div className="timco-shell">
          <div className="pluz-section-heading is-light">
            <div>
              <p className="pluz-overline">Arquitectura de la solución</p>
              <h2>La confidencialidad vive en el diseño del sistema.</h2>
            </div>
            <p>No depende de un aviso en pantalla. El acceso, las políticas RLS y las funciones de indicadores separan respuestas individuales de las vistas agregadas que consume el cliente.</p>
          </div>

          <div className="pluz-architecture-flow" aria-label="Flujo técnico de la plataforma">
            <div><span>01</span><strong>Experiencia web</strong><small>Next.js + React</small></div>
            <i>→</i>
            <div><span>02</span><strong>Identidad y reglas</strong><small>Supabase Auth + RLS</small></div>
            <i>→</i>
            <div><span>03</span><strong>Datos protegidos</strong><small>Postgres</small></div>
            <i>→</i>
            <div><span>04</span><strong>Lectura agregada</strong><small>Dashboard + Recharts</small></div>
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

          <div className="pluz-security-rule">
            <div><span>Regla crítica</span><strong>≥ 2</strong></div>
            <p>Un líder necesita al menos dos respuestas antes de considerar confiable su resultado. Con una sola, el promedio revelaría literalmente la opinión de una persona.</p>
            <small>El dashboard incorpora una vista de “Cuota mínima” para supervisar este umbral.</small>
          </div>
        </div>
      </section>

      <section className="pluz-scope">
        <div className="timco-shell">
          <div className="pluz-section-heading">
            <div><p className="pluz-overline">Alcance construido</p><h2>Un proceso completo, no una colección de pantallas.</h2></div>
            <p>La plataforma acompaña el recorrido desde el acceso de cada evaluador hasta la lectura ejecutiva, con controles distintos para quienes operan, administran y consultan resultados.</p>
          </div>
          <div className="pluz-scope-list">
            <article><span>01</span><h3>Autenticación y asignaciones</h3><p>Cada persona accede únicamente a los líderes y roles que le corresponden.</p></article>
            <article><span>02</span><h3>Evaluación por rol</h3><p>El formulario aplica reglas específicas y conserva el avance de cada relación.</p></article>
            <article><span>03</span><h3>Administración con niveles</h3><p>Superadmin, viewer y viewer básico separan operación, consulta y exposición.</p></article>
            <article><span>04</span><h3>Dashboard accionable</h3><p>Cumplimiento, cuota mínima, métricas e indicadores convierten respuestas en seguimiento.</p></article>
          </div>
          <a className="pluz-repository-link" href={repositoryUrl} target="_blank" rel="noreferrer">Revisar código y documentación en GitHub <span>↗</span></a>
        </div>
      </section>

      <section id="consulta" className="pluz-cta">
        <div className="timco-shell pluz-cta-grid">
          <div>
            <p className="pluz-overline">Conversemos</p>
            <h2>Tu proceso también puede convertirse en un sistema claro.</h2>
            <p>Si hoy coordinas personas, formularios, permisos y reportes entre varias herramientas, podemos empezar entendiendo el recorrido antes de elegir la tecnología.</p>
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
