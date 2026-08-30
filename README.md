# Sitio web de Gabriel Lattanzi

Guía de puesta en marcha, sin tecnicismos. Sigue estos pasos en orden.

## 1. Qué es esto

Un sitio con: Inicio, Quién soy, Qué hago, Blog (editable desde un panel visual)
y Contacto (formulario de leads + agenda de Calendly). Construido con Next.js,
pensado para alojarse gratis en Vercel.

## 2. Cuentas gratuitas que hay que crear

Ninguna la creó Claude por ustedes — son cuentas personales de Gabriel/Carolina.

| Servicio | Para qué | Link |
|---|---|---|
| **Vercel** | Alojar el sitio (gratis) | vercel.com |
| **Sanity** | El panel donde Gabriel escribe el blog, y donde quedan guardados los contactos del formulario (gratis hasta un buen volumen) | sanity.io |
| **Resend** | Enviar el correo de aviso cuando alguien llena el formulario (gratis hasta 3,000 correos/mes) | resend.com |
| **Cloudflare Turnstile** | Protección anti-spam del formulario (gratis) | dash.cloudflare.com → Turnstile |
| **Calendly** | Ya lo eligieron — la agenda de citas (gratis en plan básico) | calendly.com |

## 3. Variables de entorno

Copia `.env.local.example` a un archivo nuevo llamado `.env.local` y completa
los valores a medida que crees cada cuenta de arriba (cada plataforma te da
sus propias claves en su panel, sección "API keys" o similar). **Nunca subas
`.env.local` a ningún repositorio ni lo compartas por correo/chat** — son las
llaves de acceso del sitio.

Cuando despliegues en Vercel, esas mismas variables se cargan en
Vercel → Settings → Environment Variables.

⚠️ Importante sobre el token de Sanity (`SANITY_WRITE_TOKEN`): al crearlo en
sanity.io/manage, dale permiso **solo de "Create"**, nunca "Admin" o
"Editor" completo. El formulario de contacto solo necesita poder crear un
tipo de documento ("lead"), no el resto de tu panel.

## 4. Cómo Gabriel publica una entrada del blog

Una vez configurado Sanity, entra a `tu-dominio.com/studio`, inicia sesión
con su cuenta de Sanity, y ahí puede escribir y publicar artículos como en un
procesador de texto — no requiere tocar código.

## 5. Antes de publicar el sitio en vivo

- [x] Foto de Gabriel — cargada en `public/fotos/gabriel-lattanzi.png`.
- [ ] Confirmar el usuario real de Calendly en `src/lib/content.ts` (línea
      `calendlyUrl`) — hoy tiene un valor de ejemplo.
- [ ] `contactEmail` en `src/lib/content.ts` ya apunta a
      `contacto@gabriellattanzi.com`, pero falta **confirmar que ese buzón
      existe y se revisa** (dominio + correo, o reenvío configurado) antes
      de publicar — si no, los avisos de leads no van a llegar a nadie.
- [ ] **Confirmar con un asesor legal/de cumplimiento en España qué puede
      anunciar públicamente Gabriel**, dado que tiene certificación MiFID II
      pero el sitio está redactado como acompañamiento/educación financiera,
      no asesoría de inversión regulada. Esto no lo puede validar Claude.
- [ ] Crear las cuentas de la sección 2 y completar `.env.local`.

## 6. Revisión de seguridad (OWASP Top 10)

Se hizo una revisión completa contra el checklist OWASP Top 10. Se
encontraron y corrigieron 3 problemas reales durante la revisión:

1. **El formulario de contacto se habría rechazado a sí mismo en
   producción** si se publicaba antes de configurar Cloudflare Turnstile.
   Corregido: ahora funciona con protección básica (campo trampa anti-bot +
   límite de envíos) mientras se configura Turnstile.
2. **La política de seguridad (CSP) bloqueaba la carga de la página** en
   producción (se comprobó con una build real, no solo en desarrollo).
   Corregido siguiendo el patrón oficial de Next.js para sitios estáticos.
3. Los errores al guardar un contacto o enviar el correo de aviso fallaban
   en silencio. Corregido: ahora quedan registrados en los logs del
   servidor (visibles en Vercel) para poder investigarlos.

Controles ya implementados: HTTPS forzado, cabeceras de seguridad
(CSP, HSTS, X-Frame-Options, etc.), validación de todos los campos del
formulario en el servidor, sin datos financieros sensibles en el
formulario, tokens con permisos mínimos, sin secretos en el código.

Pendiente conocido (bajo riesgo): algunas dependencias del panel de Sanity
(no del sitio público) tienen alertas menores de `npm audit`, heredadas de
su propia herramienta de línea de comandos — no son alcanzables por un
visitante del sitio. Revisar con `npm audit` cuando Sanity publique una
actualización.

## Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).
