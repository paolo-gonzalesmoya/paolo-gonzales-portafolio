import type { Metadata } from "next";
import RacCase from "./RacCase";

export const metadata: Metadata = {
  title: "RAC 360 | Gestión de hallazgos SSOMA — Paolo Gonzales",
  description:
    "Caso de estudio de una aplicación que controla metas semanales, automatiza informes, estructura hallazgos SSOMA y prepara el historial para detectar patrones con IA.",
  openGraph: {
    title: "RAC 360 | Gestión de hallazgos SSOMA",
    description:
      "Metas semanales, informes automáticos y una base confiable para reconocer patrones, prevenir accidentes y reducir riesgos.",
    type: "article",
    images: [
      {
        url: "/assets/projects/rac-360/og-rac-360.png",
        width: 1200,
        height: 630,
        alt: "RAC 360, gestión de hallazgos SSOMA en obra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAC 360 | Gestión de hallazgos SSOMA",
    description: "Hallazgos trazables y datos preparados para analítica preventiva e IA dentro del marco SST.",
    images: ["/assets/projects/rac-360/og-rac-360.png"],
  },
};

export default function Rac360Page() {
  return <RacCase />;
}
