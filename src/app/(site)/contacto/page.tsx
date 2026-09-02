'use client';

import { Container } from "@/components/Container";
import { site } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { DocumentTitle } from "@/components/DocumentTitle";

export default function ContactoPage() {
  const { lang } = useLanguage();

  const t = lang === 'en'
    ? {
        label: 'Contact',
        headline: "Let's talk about your financial situation",
        subhead:
          "Write me whatever you need, or if you prefer to go straight to it, schedule a free first call at the time that works best for you.",
        writeTitle: 'Write to me',
        writeSubtitle: "I'll reply directly to the email you leave.",
        scheduleTitle: 'Or schedule directly',
        scheduleSubtitle: 'Choose the time that suits you on my calendar.',
        scheduleBody:
          'To schedule a call, click the button below. It will open Calendly in a new tab where you can choose the day and time that suits you best.',
        calendarBtn: 'Open calendar',
      }
    : {
        label: 'Contacto',
        headline: 'Conversemos sobre tu situación financiera',
        subhead:
          'Escríbeme lo que necesites, o si prefieres ir directo, agenda una primera llamada sin costo en el horario que mejor te acomode.',
        writeTitle: 'Escríbeme',
        writeSubtitle: 'Te respondo directamente al correo que me dejes.',
        scheduleTitle: 'O agenda directamente',
        scheduleSubtitle: 'Elige el horario que prefieras en mi calendario.',
        scheduleBody:
          'Para agendar una llamada, haz clic en el botón de abajo. Se abrirá el calendario de Calendly en una pestaña nueva, donde podrás elegir el día y la hora que mejor te convenga.',
        calendarBtn: 'Abrir calendario',
      };

  return (
    <>
      <DocumentTitle es="Contacto" en="Contact" />
      <section className="border-b border-line">
        <Container className="py-20">
          <p className="font-data text-xs uppercase tracking-[0.2em] text-brass-text">
            {t.label}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink">
            {t.headline}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-slate-soft">
            {t.subhead}
          </p>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-16 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {t.writeTitle}
            </h2>
            <p className="mt-2 font-body text-sm text-slate-soft">
              {t.writeSubtitle}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div id="agenda">
            <h2 className="font-display text-2xl font-semibold text-ink">
              {t.scheduleTitle}
            </h2>
            <p className="mt-2 font-body text-sm text-slate-soft">
              {t.scheduleSubtitle}
            </p>
            {/*
              Calendly se abre en una pestaña nueva mediante enlace externo.
              No se incrusta como iframe para respetar tu privacidad: Calendly
              carga su propia analítica y cookies solo cuando haces clic.
              Schedule using Calendly — opens in a new tab so their scripts
              only load when you choose to open it.
            */}
            <div className="mt-8 rounded-sm border border-line bg-paper-dim p-8">
              <p className="font-body text-sm leading-relaxed text-slate">
                {t.scheduleBody}
              </p>
              <a
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-6 inline-block rounded-sm border border-ink bg-ink px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                {t.calendarBtn}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
