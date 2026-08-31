import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Quién soy",
  description:
    "Conoce la trayectoria de Gabriel Lattanzi: más de 11 años analizando mercados globales, Executive MBA en el IESA y certificación MiFID II. Asesor financiero independiente en Barcelona.",
  openGraph: {
    title: "Quién soy — Gabriel Lattanzi",
    description:
      "Trayectoria, formación y filosofía de trabajo de Gabriel Lattanzi, estratega financiero independiente basado en Barcelona.",
    url: "https://gabriellattanzi.com/quien-soy",
  },
};

export default function QuienSoyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
