import type { Metadata } from "next";
import RacCase from "./RacCase";

export const metadata: Metadata = {
  title: "RAC 360 | Gestión de hallazgos SSOMA — Paolo Gonzales",
  description:
    "Caso de estudio de una aplicación AppSheet para registrar, priorizar, asignar, corregir y analizar hallazgos SSOMA en obra.",
  openGraph: {
    title: "RAC 360 | Gestión de hallazgos SSOMA",
    description:
      "Del hallazgo en campo al cierre con evidencia y al dashboard de control.",
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
    description: "Del hallazgo en campo al cierre con evidencia y al dashboard de control.",
    images: ["/assets/projects/rac-360/og-rac-360.png"],
  },
};

export default function Rac360Page() {
  return <RacCase />;
}
