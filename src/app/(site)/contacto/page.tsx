import { Container } from "@/components/Container";
import { site } from "@/lib/content";
import { ContactForm } from "./ContactForm";

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
            Escríbeme lo que necesites, o si prefieres ir directo, agenda una primera
            llamada sin costo en el horario que mejor te acomode.
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
            {/*
              Calendly se abre en una pestaña nueva mediante enlace externo.
              No se incrusta como iframe para respetar tu privacidad: Calendly
              carga su propia analítica y cookies solo cuando haces clic.
              Schedule using Calendly — opens in a new tab so their scripts
              only load when you choose to open it.
            */}
            <div className="mt-8 rounded-sm border border-line bg-paper-dim p-8">
              <p className="font-body text-sm leading-relaxed text-slate">
                Para agendar una llamada, haz clic en el botón de abajo. Se
                abrirá el calendario de Calendly en una pestaña nueva, donde
                podrás elegir el día y la hora que mejor te convenga.
              </p>
              <p className="mt-2 font-body text-xs text-slate-soft">
                To schedule a call, click the button below. It will open
                Calendly in a new tab so you can choose the time that suits
                you best.
              </p>
              <a
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-6 inline-block rounded-sm border border-ink bg-ink px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                Abrir calendario → Open calendar
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
