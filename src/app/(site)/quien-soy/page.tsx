'use client';

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/lib/content";
import { useContent } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function QuienSoy() {
  const { bio } = useContent();
  const { lang } = useLanguage();

  const t = lang === 'en'
    ? {
        eyebrow: 'Who I Am',
        howIWork: 'How I Work',
        timeline: 'Career Timeline',
        education: 'Education & Certifications',
        languages: 'Languages',
        cta: "Want to talk about your financial situation?",
        ctaButton: 'Schedule a call',
      }
    : {
        eyebrow: 'Qui\u00e9n soy',
        howIWork: 'Mi forma de trabajar',
        timeline: 'Trayectoria',
        education: 'Formaci\u00f3n y certificaciones',
        languages: 'Idiomas',
        cta: '\u00bfHablamos de tu situaci\u00f3n financiera?',
        ctaButton: 'Agenda una llamada',
      };

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid gap-12 py-20 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 h-full w-full bg-brass/25"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-dim">
              <Image
                src="/fotos/gabriel-lattanzi.png"
                alt={site.name}
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-data text-xs uppercase tracking-[0.2em] text-brass-text">
              {t.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
              {site.name}
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-slate-soft">
              {bio.intro}
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-slate-soft">
              {bio.corporate}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-dim">
        <Container className="py-16">
          <h2 className="font-display text-2xl font-semibold text-ink">
            {t.howIWork}
          </h2>
          <p className="mt-4 max-w-2xl font-body leading-relaxed text-slate-soft">
            {bio.philosophy}
          </p>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-16">
          <h2 className="font-display text-2xl font-semibold text-ink">
            {t.timeline}
          </h2>
          <ol className="mt-8 flex flex-col gap-8 border-l border-line pl-8">
            {bio.timeline.map((item) => (
              <li key={item.role + item.period} className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-brass" />
                <p className="font-data text-xs uppercase tracking-[0.1em] text-slate-soft">
                  {item.period}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  {item.role}
                </h3>
                <p className="font-body text-sm text-slate-soft">{item.place}</p>
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-slate-soft">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-dim">
        <Container className="grid gap-12 py-16 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {t.education}
            </h2>
            <ul className="mt-6 flex flex-col gap-5">
              {bio.credentials.map((credential) => (
                <li key={credential.title}>
                  <p className="font-body text-sm font-medium text-ink">
                    {credential.title}
                  </p>
                  <p className="font-body text-xs text-slate-soft">
                    {credential.org}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {t.languages}
            </h2>
            <ul className="mt-6 flex flex-col gap-2">
              {bio.languages.map((l) => (
                <li key={l} className="font-body text-sm text-slate-soft">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-lg font-display text-2xl font-semibold text-ink">
            {t.cta}
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
