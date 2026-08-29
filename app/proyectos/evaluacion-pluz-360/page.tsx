import type { Metadata } from "next";
import PluzCase from "./PluzCase";

export const metadata: Metadata = {
  title: "Evaluación de Liderazgo 360 — PLUZ | Paolo Gonzales",
  description:
    "Caso de estudio de una plataforma que convierte las reglas de una medición 360 en asignaciones precisas, respuestas protegidas y lectura ejecutiva.",
  openGraph: {
    title: "Evaluación de Liderazgo 360 — PLUZ",
    description:
      "Un proceso 360 convertido en asignaciones precisas, respuestas protegidas y una lectura ejecutiva clara.",
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
    description: "Las reglas de la medición convertidas en una experiencia clara, confidencial y medible.",
    images: ["/assets/projects/pluz-360/og-pluz-360.png"],
  },
};

export default function Pluz360Page() {
  return <PluzCase />;
}
