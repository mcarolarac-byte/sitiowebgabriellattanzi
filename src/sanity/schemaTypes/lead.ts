import { defineField, defineType } from "sanity";

// Documento de solo lectura desde el Studio: lo crea el formulario de
// contacto del sitio (ver src/app/(site)/contacto/actions.ts). No editable
// a mano salvo el campo "estado", para llevar seguimiento de cada contacto.
export const leadType = defineType({
  name: "lead",
  title: "Contacto recibido",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Correo", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Teléfono", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Mensaje", type: "text", readOnly: true }),
    defineField({
      name: "receivedAt",
      title: "Recibido",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "consentGiven",
      title: "Consentimiento otorgado",
      type: "boolean",
      readOnly: true,
    }),
    defineField({
      name: "consentAt",
      title: "Fecha de consentimiento",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "privacyPolicyVersion",
      title: "Versión de la política de privacidad",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "Nuevo", value: "nuevo" },
          { title: "Contactado", value: "contactado" },
          { title: "Cerrado", value: "cerrado" },
        ],
      },
      initialValue: "nuevo",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});
