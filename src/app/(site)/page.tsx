import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Horizon } from "@/components/Horizon";
import { bio, hero, services, site, trustPoints } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-data text-xs uppercase tracking-[0.2em] text-brass">
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
          </div>
          <div>
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
            <Horizon className="mt-8 w-full" />
            <p className="mt-4 font-body text-sm text-slate-soft">
              {site.name} · {site.location}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-dim">
        <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.label}>
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

      <section className="border-b border-line">
        <Container className="py-20">
          <p className="font-data text-xs uppercase tracking-[0.2em] text-brass">
            Qué hago
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-ink">
            Tres formas de acompañarte con tu dinero
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {services.map((service) => (
              <div key={service.title}>
                <p className="font-data text-xs uppercase tracking-[0.15em] text-slate-soft">
                  {service.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-slate-soft">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/que-hago"
            className="focus-ring mt-10 inline-block rounded font-body text-sm font-medium text-ink underline decoration-brass decoration-2 underline-offset-4"
          >
            Ver todos los servicios
          </Link>
        </Container>
      </section>

      <section className="border-b border-line bg-ink text-paper">
        <Container className="grid gap-10 py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="font-data text-xs uppercase tracking-[0.2em] text-brass-light">
              Quién soy
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-paper/85">
              {bio.introShort}
            </p>
            <Link
              href="/quien-soy"
              className="focus-ring mt-6 inline-block rounded font-body text-sm font-medium text-paper underline decoration-brass-light decoration-2 underline-offset-4"
            >
              Conoce mi trayectoria completa
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

      <section>
        <Container className="flex flex-col items-start gap-6 py-20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              ¿Listo para poner en orden tu horizonte financiero?
            </h2>
            <p className="mt-2 max-w-lg font-body text-sm text-slate-soft">
              Agenda una primera llamada sin costo para conversar sobre tu
              situación y ver si puedo ayudarte.
            </p>
          </div>
          <Link
            href="/contacto#agenda"
            className="focus-ring shrink-0 rounded-sm bg-ink px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            Agenda una llamada
          </Link>
        </Container>
      </section>
    </>
  );
}
