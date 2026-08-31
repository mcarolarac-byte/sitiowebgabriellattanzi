'use client';

import { Container } from "@/components/Container";
import { site } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactoPage() {
  const { lang } = useLanguage();

  const t = lang === 'en'
    ? {
        eyebrow: 'Contact',
        headline: "Let's talk about your financial situation",
        intro: "Write to me about what you need, or if you prefer to go straight to it, schedule a free first call at a time that works for you.",
        writeToMe: 'Write to me',
        writeSubtitle: "I'll reply directly to the email you leave.",
        scheduleTitle: 'Or schedule directly',
        scheduleSubtitle: 'Choose the time you prefer in my calendar.',
        calendarTitle: 'Schedule a call with Calendly',
      }
    : {
        eyebrow: 'Contacto',
        headline: 'Conversemos sobre tu situaci\u00f3n financiera',
        intro: "Esc\u00edbeme lo que necesites, o si prefieres ir directo, agenda una primera llamada sin costo en el horario que mejor te acomode.",
        writeToMe: 'Esch\u00edbeme',
        writeSubtitle: 'Te respondo directamente al correo que me dejes.',
        scheduleTitle: 'O agenda directamente',
        scheduleSubtitle: 'Elige el horario que prefieras en mi calendario.',
        calendarTitle: 'Agenda una llamada con Calendly',
      };

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20">
          <p className="font-data text-xs uppercase tracking-[0.2em] text-brass">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink">
            {t.headline}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-slate-soft">
            {t.intro}
          </p>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-16 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {t.writeToMe}
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
            <div className="mt-8 overflow-hidden rounded-sm border border-line">
              <iframe
                src={`${site.calendlyUrl}?hide_gdpr_banner=1`}
                title={t.calendarTitle}
                width="100%"
                height="700"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
