import type { StructureResolver } from "sanity/structure";

// Organiza el menú del Studio: "Artículos del blog" arriba (lo que usa
// Gabriel a diario) y "Contactos recibidos" abajo, en modo solo-lectura
// salvo el campo de estado.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.documentTypeListItem("post").title("Artículos del blog"),
      S.divider(),
      S.documentTypeListItem("lead").title("Contactos recibidos"),
    ]);
