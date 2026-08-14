import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos de AppSheet | Paolo Gonzales",
  description:
    "Cursos prácticos de AppSheet con sesiones en vivo, clases grabadas y acompañamiento de Paolo Gonzales.",
};

const whatsappCourseUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20quiero%20informaci%C3%B3n%20sobre%20tus%20cursos%20de%20AppSheet.";

const paypalRecipient = "luiggi.comfortablynumb@gmail.com";

function createPayPalUrl(itemName: string, amount: string) {
  const params = new URLSearchParams({
    cmd: "_xclick",
    business: paypalRecipient,
    item_name: itemName,
    amount,
    currency_code: "USD",
    no_shipping: "1",
  });

  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}

const courses = [
  {
    eyebrow: "Empieza y construye",
    level: "Básico e Intermedio",
    price: "20",
    paymentUrl: createPayPalUrl("Curso AppSheet - Básico e Intermedio", "20.00"),
    description:
      "Aprende a convertir hojas de cálculo y procesos manuales en aplicaciones funcionales, ordenadas y listas para usar.",
    topics: [
      "Estructura de datos y relaciones",
      "Vistas, formularios y experiencia de usuario",
      "Expresiones, validaciones y acciones",
      "Automatizaciones esenciales",
      "Proyecto práctico aplicado",
    ],
    featured: false,
  },
  {
    eyebrow: "Escala y automatiza",
    level: "Avanzado",
    price: "40",
    paymentUrl: createPayPalUrl("Curso AppSheet - Avanzado", "40.00"),
    description:
      "Diseña soluciones empresariales más robustas con seguridad, automatizaciones avanzadas e integraciones para procesos reales.",
    topics: [
      "Roles, permisos y acceso a la información",
      "Bots y flujos de automatización avanzados",
      "Generación de documentos y reportes",
      "Integraciones con Apps Script y bases de datos",
      "Arquitectura y optimización de aplicaciones",
    ],
    featured: true,
  },
];

export default function CoursesPage() {
  return (
    <main className="courses-page">
      <header className="site-header">
        <nav className="nav shell" aria-label="Navegación de cursos">
          <a className="brand" href="/" aria-label="Volver al portafolio">
            PAOLO<span>/</span>GONZALES
          </a>
          <div className="nav-links course-nav-links">
            <a href="/">Portafolio</a>
            <a href="#programas">Programas</a>
            <a href="#metodologia">Metodología</a>
          </div>
          <a className="nav-contact" href={whatsappCourseUrl} target="_blank" rel="noreferrer">
            Consultar <span>↗</span>
          </a>
        </nav>
      </header>

      <section className="courses-hero">
        <div className="course-hero-orb orb-a" aria-hidden="true" />
        <div className="course-hero-orb orb-b" aria-hidden="true" />
        <div className="shell courses-hero-content">
          <a className="back-link" href="/">← Volver al portafolio</a>
          <p className="overline">Formación práctica · AppSheet</p>
          <h1>De una idea a una app que realmente funciona.</h1>
          <p className="courses-lead">
            Aprende conmigo a crear soluciones en AppSheet para procesos reales. Combina sesiones en vivo, clases grabadas y práctica guiada a tu ritmo.
          </p>
          <div className="course-benefits" aria-label="Beneficios incluidos">
            <span><i>●</i> Sesiones en vivo</span>
            <span><i>▶</i> Clases grabadas</span>
            <span><i>✓</i> Proyecto práctico</span>
            <span><i>↗</i> Acceso desde cualquier lugar</span>
          </div>
        </div>
      </section>

      <section id="programas" className="course-programs section">
        <div className="shell">
          <div className="course-section-heading">
            <div>
              <p className="overline accent">Elige tu siguiente nivel</p>
              <h2>Dos rutas. Un objetivo: construir mejor.</h2>
            </div>
            <p>Precios de lanzamiento en dólares estadounidenses. Cada curso se compra por separado.</p>
          </div>

          <div className="course-grid">
            {courses.map((course) => (
              <article className={`course-card ${course.featured ? "featured" : ""}`} key={course.level}>
                {course.featured && <span className="course-badge">Para dar el siguiente salto</span>}
                <p className="course-eyebrow">{course.eyebrow}</p>
                <h3>AppSheet<br /><strong>{course.level}</strong></h3>
                <p className="course-description">{course.description}</p>
                <div className="course-price">
                  <span>US$</span><strong>{course.price}</strong><small>pago único</small>
                </div>
                <div className="course-includes">
                  <p>Contenido principal</p>
                  <ul>
                    {course.topics.map((topic) => <li key={topic}>{topic}</li>)}
                  </ul>
                </div>
                <a
                  className="paypal-button"
                  href={course.paymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Inscribirme en el curso AppSheet ${course.level} por US$${course.price}`}
                >
                  Pagar con PayPal <span>→</span>
                </a>
                <small className="secure-note">Pago único en USD procesado por PayPal</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="metodologia" className="course-method">
        <div className="shell method-grid">
          <div>
            <p className="overline accent">Cómo aprenderás</p>
            <h2>Explicación clara, práctica real y acompañamiento.</h2>
          </div>
          <div className="method-steps">
            <article><span>01</span><div><h3>Nos conectamos en vivo</h3><p>Desarrollamos cada tema paso a paso y resolvemos preguntas en contexto.</p></div></article>
            <article><span>02</span><div><h3>Repasas con las grabaciones</h3><p>Vuelves a cada explicación cuando la necesites y avanzas a tu propio ritmo.</p></div></article>
            <article><span>03</span><div><h3>Construyes una solución</h3><p>Aplicamos lo aprendido en un proyecto práctico, no solo en ejercicios aislados.</p></div></article>
          </div>
        </div>
      </section>

      <section className="paypal-status">
        <div className="shell paypal-status-inner">
          <div>
            <p className="overline">Pago protegido</p>
            <h2>Reserva tu curso mediante PayPal.</h2>
            <p>Elige tu nivel y realiza un pago único en dólares. PayPal te mostrará el curso y el importe antes de confirmar. Si no sabes qué nivel elegir, escríbeme y te orientaré.</p>
          </div>
          <a className="button button-primary" href={whatsappCourseUrl} target="_blank" rel="noreferrer">Consultar por WhatsApp <span>↗</span></a>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand">PAOLO<span>/</span>GONZALES</div>
        <p>© 2026 Paolo Gonzales · Formación práctica en AppSheet.</p>
        <a href="mailto:paolo.gonzalesmoya@gmail.com">paolo.gonzalesmoya@gmail.com</a>
      </footer>
    </main>
  );
}
