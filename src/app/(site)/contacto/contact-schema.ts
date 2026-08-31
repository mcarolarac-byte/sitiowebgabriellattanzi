import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo.").max(120),
  email: z.string().trim().email("Escribe un correo válido.").max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[0-9+()\-\s]*$/, "Solo números y símbolos de teléfono.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntame un poco más (mínimo 10 caracteres).")
    .max(3000),
  // Campo honeypot: invisible para personas, si llega lleno es un bot.
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
  consent: z.literal("accepted", {
    error: "Debes aceptar la Política de Privacidad.",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
