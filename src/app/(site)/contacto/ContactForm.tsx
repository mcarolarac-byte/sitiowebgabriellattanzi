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

  const t = lang === 'en'
    ? {
        successTitle: 'Thank you for writing!',
        successMsg: 'I received your message and will get back to you as soon as possible.',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        phoneOptional: '(optional)',
        message: 'Message',
        consent: (
          <>
            I have read and accept the{' '}
            <a href="/privacidad" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{' '}
            and authorize the processing of my personal data so that Gabriel Lattanzi can
            reply to my inquiry. They will not be used for any other purpose without my consent.
          </>
        ),
        sending: 'Sending…',
        submit: 'Send message',
      }
    : {
        successTitle: '¡Gracias por escribir!',
        successMsg: 'Recibí tu mensaje y te voy a responder lo antes posible.',
        name: 'Nombre',
        email: 'Correo',
        phone: 'Teléfono',
        phoneOptional: '(opcional)',
        message: 'Mensaje',
        consent: (
          <>
            He leído y acepto la{' '}
            <a href="/privacidad" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
              Política de Privacidad
            </a>{' '}
            y autorizo el tratamiento de mis datos personales para que Gabriel Lattanzi pueda
            responder a mi consulta. No se usarán para ningún otro fin sin mi consentimiento.
          </>
        ),
        sending: 'Enviando…',
        submit: 'Enviar mensaje',
      };

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="rounded-sm border border-line bg-paper-dim p-8">
        <p className="font-display text-xl font-semibold text-ink">
          {t.successTitle}
        </p>
        <p className="mt-2 font-body text-sm text-slate-soft">
          {t.successMsg}
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
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 font-body text-xs text-red-700">
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
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 font-body text-xs text-red-700">
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
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink"
        />
        {state.fieldErrors?.phone && (
          <p className="mt-1 font-body text-xs text-red-700">
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
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-4 py-2.5 font-body text-sm text-ink"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 font-body text-xs text-red-700">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot: oculto para personas, si un bot lo llena se descarta el envío. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">No llenar este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey && (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
      )}

      {/* GDPR consent */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="focus-ring mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-line accent-ink"
        />
        <label htmlFor="consent" className="font-body text-xs leading-relaxed text-slate">
          {t.consent}
        </label>
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
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}
