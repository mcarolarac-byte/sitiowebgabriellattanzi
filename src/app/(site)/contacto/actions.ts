"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { getWriteClient } from "@/sanity/lib/write-client";
import { isRateLimited } from "@/lib/rate-limit";
import { site } from "@/lib/content";
import { contactSchema } from "./contact-schema";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Turnstile todavía no está configurado (falta la cuenta de Cloudflare,
    // ver guía de lanzamiento). No bloqueamos el formulario por esto: el
    // honeypot + el límite de envíos por IP siguen activos como protección
    // base. Configurar Turnstile es una mejora a aplicar antes/después del
    // lanzamiento, no un requisito para que el formulario funcione.
    return true;
  }
  if (!token) return false;

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    }
  );
  const data = (await response.json()) as { success: boolean };
  return data.success;
}

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Demasiados intentos. Espera unos minutos y vuelve a intentar.",
    };
  }

  const raw = {
    name: formData.get("name") ?? undefined,
    email: formData.get("email") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    message: formData.get("message") ?? undefined,
    website: formData.get("website") ?? undefined,
    turnstileToken: formData.get("cf-turnstile-response") ?? undefined,
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Revisa los datos del formulario.",
      fieldErrors,
    };
  }

  // Honeypot lleno => se responde "éxito" para no delatar el filtro al bot,
  // pero no se guarda ni se envía nada.
  if (parsed.data.website) {
    return { status: "success" };
  }

  const isHuman = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!isHuman) {
    return {
      status: "error",
      message: "No pudimos verificar que eres una persona. Intenta de nuevo.",
    };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    await getWriteClient().create({
      _type: "lead",
      name,
      email,
      phone: phone || undefined,
      message,
      receivedAt: new Date().toISOString(),
      status: "nuevo",
    });
  } catch (error) {
    console.error("[contacto] No se pudo guardar el lead en Sanity:", error);
    return {
      status: "error",
      message: "No se pudo guardar tu mensaje. Intenta de nuevo en unos minutos.",
    };
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Sitio web Gabriel Lattanzi <contacto@gabriellattanzi.com>",
        to: site.contactEmail,
        replyTo: email,
        subject: `Nuevo contacto desde la web: ${name}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || "—"}\n\nMensaje:\n${message}`,
      });
    } catch (error) {
      // El lead ya quedó guardado en Sanity aunque falle el correo,
      // así que no se pierde el contacto — pero se registra para poder
      // investigar envíos de correo fallidos.
      console.error("[contacto] No se pudo enviar el correo de aviso:", error);
    }
  }

  return { status: "success" };
}
