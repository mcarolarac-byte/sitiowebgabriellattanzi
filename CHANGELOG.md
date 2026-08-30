# Changelog

Todos los cambios notables de este proyecto se documentan aquí.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [Unreleased]

### Pendiente
- Cambios de Look & Feel solicitados por Gabriel

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
