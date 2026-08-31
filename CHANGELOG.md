# Changelog

Todos los cambios notables de este proyecto se documentan aquí.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [Unreleased]

### Pendiente
- Cambios de Look & Feel solicitados por Gabriel

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
