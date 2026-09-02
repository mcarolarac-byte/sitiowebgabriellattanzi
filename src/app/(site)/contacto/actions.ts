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
  errorCode?: string;
  fieldErrors?: Record<string, string>;
};

async function verifyTurnstile(token: string | undefined, ip: string) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // En desarrollo: si faltan ambas claves, se omite la verificación.
  // En producción: si falta cualquiera de las dos claves, se rechaza.
  if (!siteKey || !secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] Claves de Turnstile no configuradas en producción.");
      return false;
    }
    return true;
  }

  if (!token) return false;

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
        signal: AbortSignal.timeout(5000),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("[turnstile] Respuesta HTTP no exitosa:", response.status);
      return false;
    }

    const data = (await response.json()) as { success: boolean; "error-codes"?: string[] };

    if (!data.success) {
      console.error("[turnstile] Verificación fallida:", data["error-codes"]);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[turnstile] Error en la verificación:", err);
    return false;
  }
}

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const headerList = await headers();

  // Obtener IP: primero x-real-ip, luego primera entrada de x-forwarded-for
  const ip =
    headerList.get("x-real-ip") ||
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      errorCode: "rate_limited",
    };
  }

  const raw = {
    name: formData.get("name") ?? undefined,
    email: formData.get("email") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    message: formData.get("message") ?? undefined,
    website: formData.get("website") ?? undefined,
    turnstileToken: formData.get("cf-turnstile-response") ?? undefined,
    consent: formData.get("consent") ?? undefined,
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
      errorCode: "validation_error",
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
      errorCode: "turnstile_failed",
    };
  }

  const { name, email, phone, message } = parsed.data;

  // Timestamp compartido para receivedAt y consentAt
  const now = new Date().toISOString();

  try {
    await getWriteClient().create({
      _type: "lead",
      name,
      email,
      phone: phone || undefined,
      message,
      receivedAt: now,
      consentGiven: true,
      consentAt: now,
      privacyPolicyVersion: "2026-08-31",
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
