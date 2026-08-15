import type { Metadata } from "next";
import WarehouseCase from "./WarehouseCase";

export const metadata: Metadata = {
  title: "Inventario visual de almacenes | Paolo Gonzales",
  description:
    "Caso de estudio: registro de unidades, checklist, evidencia fotográfica, PDF con QR, inventario conciliado y layout táctil para el control de almacenes.",
  openGraph: {
    title: "Inventario visual de almacenes | Paolo Gonzales",
    description:
      "Del ingreso y la evidencia al layout táctil, el control de áreas y la salida documentada.",
    images: [
      {
        url: "/assets/projects/timco/og-timco.webp",
        width: 1200,
        height: 630,
        alt: "Inventario visual de almacenes — Paolo Gonzales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inventario visual de almacenes | Paolo Gonzales",
    description: "Ingreso, evidencia, inventario, layout táctil y control de áreas.",
    images: ["/assets/projects/timco/og-timco.webp"],
  },
};

export default function InventoryWarehousePage() {
  return <WarehouseCase />;
}
