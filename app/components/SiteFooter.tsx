import Link from "next/link";

const linkedInUrl = "https://www.linkedin.com/in/luiggigonzalesmoya/";
const calComUrl = "https://cal.com/paolo-gonzales-8itwaw";
const whatsappUrl =
  "https://wa.me/51925180724?text=Hola%20Paolo%2C%20vi%20tu%20portafolio%20y%20quiero%20conversar%20sobre%20un%20proyecto.";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <span>PG</span>
          <div>
            <strong>Paolo Gonzales</strong>
            <small>Automatización que sí se usa</small>
          </div>
        </div>

        <div className="site-footer-links" aria-label="Redes sociales y contacto">
          <p>Conecta</p>
          <a href={linkedInUrl} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          <a href="mailto:paolo.gonzalesmoya@gmail.com">Correo <span>↗</span></a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
        </div>

        <div className="site-footer-conversation">
          <p>¿Tienes un proceso que necesita orden, trazabilidad o automatización?</p>
          <a href={calComUrl} target="_blank" rel="noreferrer">Agendar una conversación <span>↗</span></a>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© 2026 Paolo Gonzales · Lima, Perú</p>
        <Link href="/">Volver al portafolio</Link>
      </div>
    </footer>
  );
}
