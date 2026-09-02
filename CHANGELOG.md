# Changelog

Todos los cambios notables de este proyecto se documentan aquí.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [Unreleased]

### Pendiente
- Cambios de Look & Feel solicitados por Gabriel

---

## [1.3.2] - 2026-09-01

### Corregido
- **Accesibilidad (WCAG AA):** contraste de texto corregido en dos puntos
  - `slate-soft` oscurecido de `#6b6f76` a `#62666d` — pasa 4.56:1 en todos los fondos del sitio
  - Nueva variable `--color-brass-text: #885e16` para etiquetas de sección — pasa 4.54:1 en paper/hero/dim. Los usos decorativos (bordes, fondos, subrayados) mantienen el brass original `#a67c34`
- **LanguageContext:** revisado — ya implementa `useSyncExternalStore` con `getServerSnapshot` correctamente (sin cambios necesarios)

### Añadido
- Cache headers en `next.config.ts`:
  - `/_next/static/`: `max-age=31536000, immutable` — assets inmutables (el hash cambia con cada build)
  - `/_next/image`: `max-age=86400, stale-while-revalidate=604800` — imágenes optimizadas

### Limpieza
- `*.docx` y `gabriel 4.png` agregados a `.gitignore` — el repositorio queda sin archivos sin rastrear

---

## [1.3.1] - 2026-09-01

### Corregido
- SSL/HTTPS activo en `www.gabriellattanzi.com`: dominio `www` añadido como dominio primario en Vercel, certificado SSL generado automáticamente
- DNS en Cloudflare actualizado: ambos registros (`www` y `@`) migrados de endpoints legacy a `c410194cbfa69386.vercel-dns-017.com` (nuevo endpoint de Vercel, DNS only — sin proxy Cloudflare)
- `gabriellattanzi.com` (raíz) configurado para redirigir con 308 permanente a `www.gabriellattanzi.com`
- Registro DMARC añadido en Cloudflare (`_dmarc TXT v=DMARC1; p=none; rua=mailto:contacto@gabriellattanzi.com`) para monitoreo de autenticación de emails
- Análisis de rendimiento completado: imágenes con `<Image>` de Next.js y `priority`/`sizes` ✅, fuentes con `next/font/google` ✅, Calendly como enlace externo sin iframe ✅, GTM con carga condicional al consentimiento ✅

### Rendimiento medido (PageSpeed Insights — Lighthouse 13.4.1 — 2026-09-01)

| Métrica            | Móvil | Desktop |
|--------------------|-------|---------|
| **Performance**    | 94    | 100     |
| **Accessibility**  | 96    | 96      |
| **Best Practices** | 100   | 100     |
| **SEO**            | 100   | 100     |

**Core Web Vitals — Móvil** (Moto G Power emulado, red 4G lenta):
- FCP: 1.3 s ✅ · LCP: 2.8 s 🟡 · TBT: 30 ms ✅ · CLS: 0 ✅ · Speed Index: 3.9 s 🟡

**Core Web Vitals — Desktop:**
- FCP: 0.2 s ✅ · LCP: 0.5 s ✅ · TBT: 10 ms ✅ · CLS: 0 ✅ · Speed Index: 0.3 s ✅

**Oportunidades de mejora identificadas (no urgentes):**
- Contraste de color insuficiente en algún elemento (Accessibility 96→100)
- Solicitudes render-blocking (~150 ms en móvil) — fuentes de Google
- JavaScript legacy detectado (16 KiB) — puede optimizarse con `browserslist`
- 28 KiB de JS no utilizado en móvil

Informe completo: https://pagespeed.web.dev/analysis/https-www-gabriellattanzi-com/21x23bi9ps

### Pendiente (mejoras opcionales, no urgentes)
- Agregar `cache-control` headers para assets estáticos en `next.config.ts`

---

## [1.3.0] - 2026-08-31

### Añadido
- Registro de consentimiento GDPR en Sanity: campos `consentGiven`, `consentAt` y `privacyPolicyVersion` en cada lead
- Verificación server-side del campo `consent` mediante Zod (`z.literal("accepted")`)
- Tests unitarios de ContactForm y contactSchema (Jest + Testing Library)
- Infraestructura de tests (jest.config.ts, jest.setup.ts, devDependencies de Jest)

### Modificado
- Turnstile ahora es obligatorio en producción: rechaza si falta cualquiera de las dos claves en NODE_ENV=production
- Verificación de Turnstile reforzada: AbortSignal.timeout(5000), cache:no-store, validación de hostname e IP
- IP obtenida de x-real-ip (prioritario) antes de x-forwarded-for
- Rate limit mejorado: buckets con ventana fija (10 min / 5 req), límite de 10.000 claves y limpieza de expirados
- LanguageContext migrado de useState/useEffect a useSyncExternalStore
- Política de privacidad actualizada: fecha 2026-08-31, proveedores reales (Sanity, Vercel, Resend, Turnstile, Sentry, Calendly), GA inactivo, Calendly como enlace externo
- next.config.ts: disableLogger reemplazado por webpack.treeshake.removeDebugLogging

### Eliminado
- Google Analytics (GA4, G-M8NTH8EKND) y sus bloques Script
- CookieBanner: sin analítica, sin cookies no esenciales gestionadas por el sitio
- iframe de Calendly y parámetro hide_gdpr_banner; reemplazado por enlace externo
- calendly.com eliminado de frame-src en la CSP
- test_write.tmp (archivo temporal de prueba)

---

## [1.2.0] - 2026-08-30

### Añadido
- Setup profesional de desarrollo: rama `develop`, GitHub Actions CI, CHANGELOG
- Sección de flujo de desarrollo en README.md

---

## [1.1.0] - 2026-08

### Añadido
- Cumplimiento GDPR/RGPD completo: checkbox de consentimiento en formulario de contacto
- Política de privacidad completa en `/privacidad` (10 secciones, conforme Art. 6(1)(a) RGPD)
- Banner de cookies con persistencia en localStorage
- Documento de entrega para desarrollador (`ENTREGA-DESARROLLADOR.html`)

### Modificado
- Eliminados puntos finales de títulos y subtítulos en toda la web
- Header: logo GL en móvil, texto "Gabriel Lattanzi" en desktop

---

## [1.0.0] - 2026-07

### Añadido
- Sitio web completo: Inicio, Quién soy, Qué hago, Blog, Contacto
- Integración con Sanity CMS (blog + leads del formulario)
- Formulario de contacto con protección anti-spam (Cloudflare Turnstile)
- Agenda de citas con Calendly
- Deploy en Vercel con dominio personalizado `gabriellattanzi.com`
- Revisión de seguridad OWASP Top 10
- Cabeceras de seguridad (CSP, HSTS, X-Frame-Options)
