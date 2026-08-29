import type { Metadata } from "next";
import PluzCase from "./PluzCase";

export const metadata: Metadata = {
  title: "Evaluación de Liderazgo 360 — PLUZ | Paolo Gonzales",
  description:
    "Caso de estudio de una plataforma a medida para 671 evaluadores, 87 líderes y 1,109 asignaciones, con confidencialidad por rol y dashboard de indicadores.",
  openGraph: {
    title: "Evaluación de Liderazgo 360 — PLUZ",
    description:
      "Asignaciones, evaluación, confidencialidad y lectura ejecutiva dentro de una plataforma construida a medida.",
    type: "article",
    images: [
      {
        url: "/assets/projects/pluz-360/og-pluz-360.png",
        width: 1200,
        height: 675,
        alt: "Promedio agregado dentro del modelo de evaluación de liderazgo 360",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evaluación de Liderazgo 360 — PLUZ",
    description: "Un proceso de evaluación complejo convertido en un recorrido claro, confidencial y medible.",
    images: ["/assets/projects/pluz-360/og-pluz-360.png"],
  },
};

export default function Pluz360Page() {
  return <PluzCase />;
}
