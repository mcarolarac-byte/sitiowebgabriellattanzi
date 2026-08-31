import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Qué hago",
  description:
    "Servicios de Gabriel Lattanzi: planificación de retiro, educación en inversión y mercados, y mentoría financiera 1:1. Acompañamiento personalizado sin venta de productos.",
  openGraph: {
    title: "Qué hago — Gabriel Lattanzi",
    description:
      "Planificación de retiro, educación financiera y mentoría 1:1. Descubre cómo trabaja Gabriel Lattanzi como asesor financiero independiente.",
    url: "https://gabriellattanzi.com/que-hago",
  },
};

export default function QueHagoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
