import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
};

export default function PrivacidadPage() {
  return (
    <section>
      <Container className="max-w-2xl py-20">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Aviso de privacidad
        </h1>
        <div className="prose-financiero mt-8 font-body leading-relaxed text-slate">
          <p>
            Cuando completas el formulario de contacto de este sitio, {site.name}{" "}
            recibe el nombre, correo electrónico, teléfono (si lo dejas) y el
            mensaje que escribes. Esta información se usa únicamente para
            responder a tu solicitud y no se comparte con terceros con fines
            comerciales.
          </p>
          <h2>¿Dónde se guardan tus datos?</h2>
          <p>
            Tu mensaje se almacena de forma segura en la plataforma de
            contenidos del sitio y se notifica por correo a {site.name}. No se
            solicita ni se debe enviar información financiera sensible
            (números de cuenta, tarjetas o documentos de identidad) a través
            de este formulario.
          </p>
          <h2>Agenda de citas</h2>
          <p>
            Si agendas una llamada a través del calendario embebido, esa
            reserva la gestiona directamente la plataforma de agenda
            (Calendly), conforme a su propia política de privacidad.
          </p>
          <h2>Tus derechos</h2>
          <p>
            Puedes solicitar en cualquier momento que se elimine la
            información que dejaste en el formulario escribiendo a{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
