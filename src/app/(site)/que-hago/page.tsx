import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { complianceNote, services, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Qué hago",
  description: `Servicios de acompañamiento y educación financiera de ${site.name}.`,
};

export default function QueHago() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20">
          <p className="font-data text-xs uppercase tracking-[0.2em] text-brass">
            Qué hago
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink">
            Acompañamiento claro, sin tecnicismos innecesarios
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-slate-soft">
            Trabajo con personas que quieren entender su dinero y tomar
            mejores decisiones de largo plazo — no con quienes buscan que
            alguien más administre su patrimonio.
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
            El primer paso es una conversación, sin costo.
          </h2>
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
