import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbele a Gabriel Lattanzi o agenda una conversación directamente en su calendario. Atención presencial en Barcelona y online para todo el mundo.",
  openGraph: {
    title: "Contacto — Gabriel Lattanzi",
    description:
      "Escríbele a Gabriel o agenda una conversación. Atención en Barcelona y online para todo el mundo.",
    url: "https://gabriellattanzi.com/contacto",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
