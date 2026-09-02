import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Información sobre el tratamiento de datos personales en gabriellattanzi.com, conforme al Reglamento General de Protección de Datos (RGPD/GDPR).",
};

export default function PrivacidadPage() {
  return (
    <section>
      <Container className="max-w-2xl py-20">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Política de Privacidad
        </h1>
        <p className="mt-3 font-body text-sm text-slate-soft">
          Última actualización: 31 de agosto de 2026
        </p>

        <div className="mt-8 flex flex-col gap-8 font-body leading-relaxed text-slate">

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">1. Responsable del tratamiento</h2>
            <p className="mt-3">
              <strong>{site.name}</strong><br />
              Actividad: Acompañamiento y educación financiera<br />
              Barcelona, España<br />
              Correo electrónico de contacto:{" "}
              <a href={`mailto:${site.contactEmail}`} className="underline hover:text-ink">
                {site.contactEmail}
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">2. Datos que recopilamos y con qué finalidad</h2>
            <p className="mt-3">
              Cuando completas el formulario de contacto de este sitio, recopilamos los
              siguientes datos personales:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li><strong>Nombre:</strong> para dirigirnos a ti correctamente.</li>
              <li><strong>Correo electrónico:</strong> para responderte.</li>
              <li><strong>Teléfono</strong> (opcional): si deseas que te contactemos por esa vía.</li>
              <li><strong>Mensaje:</strong> para entender tu consulta.</li>
              <li>
                <strong>Registro de consentimiento:</strong> guardamos si aceptaste esta política,
                la fecha y hora en que lo hiciste, y la versión de la política vigente en ese momento.
                Esto nos permite acreditar que el tratamiento tiene base legal válida.
              </li>
            </ul>
            <p className="mt-3">
              Estos datos se usan exclusivamente para responder a tu solicitud. No se
              utilizan con fines comerciales, publicitarios ni se ceden a terceros.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">3. Base legal del tratamiento</h2>
            <p className="mt-3">
              El tratamiento de tus datos se basa en tu <strong>consentimiento expreso</strong>,
              otorgado mediante la casilla de verificación del formulario de contacto,
              conforme al artículo 6(1)(a) del Reglamento General de Protección de Datos
              (RGPD / GDPR — Reglamento UE 2016/679).
            </p>
            <p className="mt-2">
              Puedes retirar tu consentimiento en cualquier momento escribiendo a{" "}
              <a href={`mailto:${site.contactEmail}`} className="underline hover:text-ink">
                {site.contactEmail}
              </a>. La retirada del consentimiento no afecta a la licitud del tratamiento
              previo a su retirada.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">4. Plazo de conservación</h2>
            <p className="mt-3">
              Tus datos se conservarán durante el tiempo necesario para gestionar tu consulta
              y, en su caso, la relación de servicio. Si no se establece ninguna relación
              contractual, realizamos una revisión manual periódica de los datos almacenados
              con el objetivo de eliminarlos en un plazo máximo de <strong>12 meses</strong> desde
              la recepción del formulario, salvo que solicites su eliminación antes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">5. Servicios de terceros utilizados</h2>
            <p className="mt-3">
              Para el funcionamiento del sitio y la gestión de los datos se utilizan los
              siguientes servicios. En los casos en que procesan datos personales tuyo, existe
              o se gestionará el correspondiente acuerdo de encargo de tratamiento:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                <strong>Sanity (Sanity Inc., EE.UU.):</strong> plataforma de gestión de
                contenidos donde se almacenan los mensajes del formulario, incluyendo nombre,
                correo, teléfono, mensaje y registro de consentimiento.
              </li>
              <li>
                <strong>Vercel (Vercel Inc., EE.UU.):</strong> infraestructura de alojamiento
                del sitio web. Procesa las solicitudes entrantes y puede registrar IPs con fines
                de diagnóstico y seguridad.
              </li>
              <li>
                <strong>Resend (Resend Inc., EE.UU.):</strong> servicio de envío de correo
                electrónico utilizado para notificar al responsable del sitio cuando llega un
                nuevo mensaje del formulario. No almacena datos del visitante de forma permanente.
              </li>
              <li>
                <strong>Cloudflare Turnstile (Cloudflare Inc., EE.UU.):</strong> widget de
                verificación CAPTCHA que protege el formulario de contacto contra envíos
                automatizados. Procesa información técnica del navegador para distinguir
                humanos de bots. Consulta la{" "}
                <a href="https://www.cloudflare.com/privacypolicy/" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
                  política de privacidad de Cloudflare
                </a>.
              </li>
              <li>
                <strong>Sentry (Functional Software Inc., EE.UU.):</strong> servicio de
                monitorización de errores en tiempo real. Puede capturar información técnica
                (trazas de pila, URL, navegador) cuando se produce un error en el sitio.
                Está configurado en la región de la UE para minimizar transferencias.
              </li>
              <li>
                <strong>Calendly (Calendly LLC, EE.UU.):</strong> si eliges agendar una llamada,
                se abrirá en una pestaña nueva el sitio de Calendly. Calendly solo se carga
                cuando haces clic en el enlace; no se incrusta en el sitio ni se cargan sus
                scripts sin tu acción. Desde ese momento, la reserva la gestiona directamente
                Calendly conforme a su propia{" "}
                <a href="https://calendly.com/legal/privacy-notice" className="underline hover:text-ink" target="_blank" rel="noopener noreferrer">
                  política de privacidad
                </a>.
              </li>
            </ul>
            <p className="mt-3">
              <strong>Google Analytics no está activo en este sitio.</strong> No se instalan
              cookies publicitarias, de seguimiento ni analíticas de terceros.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">6. Preferencia de idioma</h2>
            <p className="mt-3">
              Si el sitio ofrece selección de idioma (español / inglés), la preferencia se
              guarda únicamente en el almacenamiento local de tu navegador (<code>localStorage</code>).
              No se envía al servidor, no se vincula a ningún dato personal y no se utiliza
              para seguimiento ni análisis de comportamiento.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">7. Transferencias internacionales</h2>
            <p className="mt-3">
              Algunos servicios mencionados (Sanity, Vercel, Resend, Cloudflare, Sentry)
              están ubicados en Estados Unidos u otras jurisdicciones fuera del Espacio
              Económico Europeo. Las transferencias de datos a estos proveedores pueden
              realizarse bajo distintas garantías — como cláusulas contractuales tipo
              aprobadas por la Comisión Europea (art. 46 RGPD) u otros mecanismos válidos —,
              dependiendo de las condiciones vigentes con cada proveedor en el momento del
              tratamiento. Se recomienda consultar las políticas de privacidad de cada
              servicio para conocer las garantías que aplican en cada caso.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">8. Cookies</h2>
            <p className="mt-3">
              Este sitio web <strong>no utiliza cookies publicitarias, analíticas ni de
              seguimiento de terceros</strong>. Pueden usarse cookies técnicas estrictamente
              necesarias para el funcionamiento del sitio (por ejemplo, las que genera el
              propio servidor Next.js o las del widget de Turnstile durante la verificación).
            </p>
            <p className="mt-2">
              Si en el futuro se incorporaran herramientas de analítica u otras tecnologías
              que requieran cookies no esenciales, se actualizará esta política y se solicitará
              tu consentimiento previo.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">9. Tus derechos</h2>
            <p className="mt-3">
              Como titular de los datos, tienes derecho a:
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li><strong>Acceso:</strong> solicitar qué datos tuyos tenemos.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión («derecho al olvido»):</strong> solicitar la eliminación de tus datos.</li>
              <li><strong>Limitación del tratamiento:</strong> solicitar que restrinjamos el uso de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
              <li><strong>Retirada del consentimiento</strong> en cualquier momento, sin efecto retroactivo.</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a href={`mailto:${site.contactEmail}`} className="underline hover:text-ink">
                {site.contactEmail}
              </a>{" "}
              indicando tu nombre, el derecho que deseas ejercer y adjuntando una copia de
              tu documento de identidad. Responderemos en un plazo máximo de 30 días.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">10. Derecho a reclamar ante la autoridad de control</h2>
            <p className="mt-3">
              Si consideras que el tratamiento de tus datos no se ajusta a la normativa vigente,
              tienes derecho a presentar una reclamación ante la{" "}
              <a
                href="https://www.aepd.es"
                className="underline hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agencia Española de Protección de Datos (AEPD)
              </a>{" "}
              — autoridad de control competente en España — o ante la autoridad de protección
              de datos de tu país de residencia.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">11. Cambios en esta política</h2>
            <p className="mt-3">
              Esta política puede actualizarse para reflejar cambios en la legislación o en
              el funcionamiento del sitio. La fecha de la última actualización aparece al
              inicio de este documento. Te recomendamos revisarla periódicamente.
            </p>
            <p className="mt-2 text-sm text-slate-soft">
              <em>Nota:</em> la redacción técnica de esta política describe el tratamiento real
              de datos a la fecha indicada y no constituye asesoramiento legal definitivo.
              Se recomienda revisión por un profesional jurídico especializado en protección
              de datos antes de considerarla compliant con cualquier regulación aplicable.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}
