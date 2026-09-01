'use client';

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/lib/content";
import { useContent } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { hero, services, bio, trustPoints } = useContent();
  const { lang } = useLanguage();

  const t = lang === 'en'
    ? {
        whatIDoLabel: 'What I Do',
        threeWays: 'Three ways I can help with your finances',
        seeAllServices: 'See all services',
        whoIAmLabel: 'Who I Am',
        executiveExp: 'Executive experience. Human perspective',
        fullBackground: 'See my full background',
        ctaHeadline: 'Ready to put your financial future in order?',
        ctaBody: 'Schedule a free first call to discuss your situation and see if I can help.',
        ctaButton: 'Schedule a call',
      }
    : {
        whatIDoLabel: '\u00bfQu\u00e9 hago?',
        threeWays: 'Tres formas de acompa\u00f1arte con tu dinero',
        seeAllServices: 'Ver todos los servicios',
        whoIAmLabel: '\u00bfQui\u00e9n soy?',
        executiveExp: 'Experiencia ejecutiva. Mirada humana',
        fullBackground: 'Conoce mi trayectoria completa',
        ctaHeadline: '\u00bfListo para poner en orden tu horizonte financiero?',
        ctaBody: 'Agenda una primera llamada sin costo para conversar sobre tu situaci\u00f3n y ver si puedo ayudarte.',
        ctaButton: 'Agenda una llamada',
      };

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-paper-hero">
        <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          {/* Columna izquierda */}
          <div>
            <p className="font-data text-sm uppercase tracking-[0.2em] text-brass-text">
              {hero.eyebrow}
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-slate-soft">
              {hero.subhead}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={hero.ctaPrimary.href}
                className="focus-ring rounded-sm bg-ink px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                {hero.ctaPrimary.label}
              </Link>
              <Link
                href={hero.ctaSecondary.href}
                className="focus-ring rounded-sm border border-ink/20 px-6 py-3 font-body text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                {hero.ctaSecondary.label}
              </Link>
            </div>
            {/* Cita: debajo de los botones */}
            <blockquote className="mt-8 border-l-2 border-brass pl-4">
              <p className="font-display text-base italic leading-snug text-ink">
                &ldquo;{hero.quote}&rdquo;
              </p>
            </blockquote>
            <p className="mt-6 font-body text-sm text-slate-soft">
              {hero.modalidad}
            </p>
          </div>

          {/* Columna derecha — foto */}
          <div className="relative">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -right-4 -top-4 h-full w-full bg-ink"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-dim">
                <Image
                  src="/fotos/gabriel-lattanzi.png"
                  alt={site.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ESTAD\u00cdSTICAS */}
      <section className="border-b border-line bg-paper-dim">
        <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-ink">
                {point.value}
              </p>
              <p className="mt-1 font-body text-sm text-slate-soft">
                {point.label}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* QU\u00c9 HAGO */}
      <section className="border-b border-line">
        <Container className="py-20">
          <p className="font-data text-sm uppercase tracking-[0.2em] text-brass-text">
            {t.whatIDoLabel}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink">
            {t.threeWays}
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {services.map((service) => (
              <div key={service.title}>
                <p className="font-data text-sm uppercase tracking-[0.15em] text-slate-soft">
                  {service.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-slate-soft">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/que-hago"
            className="focus-ring mt-10 inline-block rounded font-body text-sm font-medium text-ink underline decoration-brass decoration-2 underline-offset-4"
          >
            {t.seeAllServices}
          </Link>
        </Container>
      </section>

      {/* QUI\u00c9N SOY */}
      <section className="border-b border-line bg-ink text-paper">
        <Container className="grid gap-10 py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="font-data text-sm uppercase tracking-[0.2em] text-brass-light">
              {t.whoIAmLabel}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-paper">
              {t.executiveExp}
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-paper/85">
              {bio.introShort}
            </p>
            <Link
              href="/quien-soy"
              className="focus-ring mt-6 inline-block rounded font-body text-sm font-medium text-paper underline decoration-brass-light decoration-2 underline-offset-4"
            >
              {t.fullBackground}
            </Link>
          </div>
          <div className="border-l border-paper/20 pl-8">
            <ul className="flex flex-col gap-4">
              {bio.credentials.slice(0, 3).map((credential) => (
                <li key={credential.title}>
                  <p className="font-body text-sm font-medium text-paper">
                    {credential.title}
                  </p>
                  <p className="font-body text-xs text-paper/60">
                    {credential.org}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section>
        <Container className="flex flex-col items-start gap-6 py-20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {t.ctaHeadline}
            </h2>
            <p className="mt-2 max-w-lg font-body text-sm text-slate-soft">
              {t.ctaBody}
            </p>
          </div>
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
