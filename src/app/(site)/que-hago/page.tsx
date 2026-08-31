'use client';

import Link from "next/link";
import { Container } from "@/components/Container";
import { useContent } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function QueHago() {
  const { services, complianceNote } = useContent();
  const { lang } = useLanguage();

  const t = lang === 'en'
    ? {
        eyebrow: 'What I Do',
        headline: 'Clear guidance, without unnecessary jargon',
        intro: "I work with people who want to understand their money and make better long-term decisions — not with those looking for someone to manage their wealth for them.",
        ctaHeadline: 'The first step is a conversation, at no cost',
        ctaButton: 'Schedule a call',
      }
    : {
        eyebrow: 'Qu\u00e9 hago',
        headline: 'Acompa\u00f1amiento claro, sin tecnicismos innecesarios',
        intro: "Trabajo con personas que quieren entender su dinero y tomar mejores decisiones de largo plazo \u2014 no con quienes buscan que alguien m\u00e1s administre su patrimonio.",
        ctaHeadline: 'El primer paso es una conversaci\u00f3n, sin costo',
        ctaButton: 'Agenda una llamada',
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
        <Container className="py-16">
          <div className="grid gap-14 sm:grid-cols-1">
            {services.map((service) => (
              <div
                key={service.title}
                className="grid gap-6 border-b border-line pb-14 last:border-b-0 last:pb-0 sm:grid-cols-[0.3fr_0.7fr]"
              >
                <div>
                  <p className="font-data text-xs uppercase tracking-[0.15em] text-brass">
                    {service.eyebrow}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                    {service.title}
                  </h2>
                </div>
                <p className="font-body leading-relaxed text-slate-soft">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-dim">
        <Container className="py-12">
          <p className="max-w-2xl font-body text-sm leading-relaxed text-slate-soft">
            {complianceNote}
          </p>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-lg font-display text-2xl font-semibold text-ink">
            {t.ctaHeadline}
          </h2>
          <Link
            href="/contacto#agenda"
            className="focus-ring shrink-0 rounded-sm bg-ink px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            {t.ctaButton}
          </Link>
        </Container>
      </section>
    </>
  );
}
