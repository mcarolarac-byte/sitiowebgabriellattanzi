import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Escribe a ${site.name} o agenda directamente una llamada.`,
};

export default function ContactoPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20">
          <p className="font-data text-xs uppercase tracking-[0.2em] text-brass">
            Contacto
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-ink">
            Conversemos sobre tu situación financiera
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-slate-soft">
            Escríbeme lo que necesites, o si prefieres ir directo, agenda una
            primera llamada sin costo en el horario que mejor te acomode.
          </p>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-16 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Escríbeme
            </h2>
            <p className="mt-2 font-body text-sm text-slate-soft">
              Te respondo directamente al correo que me dejes.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div id="agenda">
            <h2 className="font-display text-2xl font-semibold text-ink">
              O agenda directamente
            </h2>
            <p className="mt-2 font-body text-sm text-slate-soft">
              Elige el horario que prefieras en mi calendario.
            </p>
            <div className="mt-8 overflow-hidden rounded-sm border border-line">
              <iframe
                src={`${site.calendlyUrl}?hide_gdpr_banner=1`}
                title="Agenda una llamada con Calendly"
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
