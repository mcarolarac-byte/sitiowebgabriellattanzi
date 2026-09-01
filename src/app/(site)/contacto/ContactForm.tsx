"use client";

import { useActionState, useEffect, useRef } from "react";
import Script from "next/script";
import { submitContactForm, type ContactState } from "./actions";
import { useLanguage } from "@/contexts/LanguageContext";

const initialState: ContactState = { status: "idle" };

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const { lang } = useLanguage();
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const t = lang === 'en'
    ? {
        successTitle: 'Thank you for writing!',
        successBody: 'I received your message and will reply as soon as possible.',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        phoneOptional: '(optional)',
        message: 'Message',
        honeypot: 'Do not fill this field',
        consentText: 'I have read and accept the',
        privacyPolicy: 'Privacy Policy',
        consentText2: 'and authorize the processing of my personal data so that Gabriel Lattanzi can respond to my inquiry. They will not be used for any other purpose without my consent.',
        submit: 'Send message',
        submitting: 'Sending…',
      }
    : {
        successTitle: '¡Gracias por escribir!',
        successBody: 'Recibí tu mensaje y te voy a responder lo antes posible.',
        name: 'Nombre',
        email: 'Correo',
        phone: 'Teléfono',
        phoneOptional: '(opcional)',
        message: 'Mensaje',
        honeypot: 'No llenar este campo',
        consentText: 'He leído y acepto la',
        privacyPolicy: 'Política de Privacidad',
        consentText2: 'y autorizo el tratamiento de mis datos personales para que Gabriel Lattanzi pueda responder a mi consulta. No se usarán para ningún otro fin sin mi consentimiento.',
        submit: 'Enviar mensaje',
        submitting: 'Enviando…',
      };

  if (state.status === "success") {
    return (
      <div className="rounded-sm border border-line bg-paper-dim p-8">
        <p className="font-display text-xl font-semibold text-ink">
          {t.successTitle}
        </p>
        <p className="mt-2 font-body text-sm text-slate-soft">
          {t.successBody}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      )}
      <div>
        <label htmlFor="name" className="font-body text-sm font-medium text-ink">
          {t.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={!!state.fieldErrors?.name}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink"
        />
        {state.fieldErrors?.name && (
          <p id="name-error" role="alert" className="mt-1 font-body text-xs text-red-700">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="font-body text-sm font-medium text-ink">
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink"
        />
        {state.fieldErrors?.email && (
          <p id="email-error" role="alert" className="mt-1 font-body text-xs text-red-700">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="font-body text-sm font-medium text-ink">
          {t.phone} <span className="text-slate-soft">{t.phoneOptional}</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!state.fieldErrors?.phone}
          aria-describedby={state.fieldErrors?.phone ? "phone-error" : undefined}
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink"
        />
        {state.fieldErrors?.phone && (
          <p id="phone-error" role="alert" className="mt-1 font-body text-xs text-red-700">
            {state.fieldErrors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="font-body text-sm font-medium text-ink">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink"
        />
        {state.fieldErrors?.message && (
          <p id="message-error" role="alert" className="mt-1 font-body text-xs text-red-700">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot: oculto para personas, si un bot lo llena se descarta el envío. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">{t.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey && (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
      )}

      {/* GDPR: consentimiento obligatorio para tratamiento de datos */}
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            value="accepted"
            required
            aria-invalid={!!state.fieldErrors?.consent}
            aria-describedby={state.fieldErrors?.consent ? "consent-error" : undefined}
            className="focus-ring mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-line accent-ink"
          />
          <label htmlFor="consent" className="font-body text-xs leading-relaxed text-slate">
            {t.consentText}{" "}
            <a href="/privacidad" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
              {t.privacyPolicy}
            </a>{" "}
            {t.consentText2}
          </label>
        </div>
        {state.fieldErrors?.consent && (
          <p id="consent-error" role="alert" className="mt-1 font-body text-xs text-red-700">
            {state.fieldErrors.consent}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="font-body text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="focus-ring rounded-sm bg-ink px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {pending ? t.submitting : t.submit}
      </button>
    </form>
  );
}
