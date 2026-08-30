// Contenido del sitio. Los textos marcados [BORRADOR] deben confirmarse
// con Gabriel antes de publicar en producción.

export const site = {
  name: "Gabriel Lattanzi",
  tagline: "Acompañamiento y educación financiera",
  baseUrl: "https://gabriellattanzi.com", // actualizar cuando exista el dominio real
  contactEmail: "contacto@gabriellattanzi.com",
  location: "Barcelona, España — atiende a LATAM de forma remota",
  linkedin: "https://www.linkedin.com/in/gabriellattanzi/",
  calendlyUrl: "https://calendly.com/gabriellattanzi", // [BORRADOR] confirmar usuario real de Calendly
};

export const hero = {
  eyebrow: "Acompañamiento y educación financiera",
  headline: "Tu retiro no debería depender de la suerte.",
  subhead:
    "Te ayudo a construir un plan claro para tu jubilación y a entender cómo funcionan realmente las inversiones — con el rigor de más de 11 años analizando mercados globales.",
  ctaPrimary: { label: "Agenda una primera llamada", href: "/contacto#agenda" },
  ctaSecondary: { label: "Conoce mi trayectoria", href: "/quien-soy" },
};

export const trustPoints = [
  { label: "Años analizando mercados", value: "11+" },
  { label: "Certificación", value: "MiFID II" },
  { label: "Formación", value: "Executive MBA · IESA" },
  {
    label: "Países de experiencia corporativa (Venezuela, México, Argentina)",
    value: "3",
  },
];

export const bio = {
  // Resumen usado en Inicio (distinto a propósito de `intro`, a pedido de Gabriel).
  introShort:
    "Soy estratega financiero y, antes que nada, alguien que se formó gestionando su propio patrimonio — con los aciertos y los aprendizajes que eso implica. Desde 2015 dedico mi carrera a entender los mercados globales a fondo: renta fija, renta variable y estrategias de inversión, siempre con el mismo rigor analítico que aprendí dirigiendo negocios en multinacionales.",
  // Párrafo 1 completo de la página "Quién soy".
  intro:
    "Soy estratega financiero y, antes que nada, alguien que se formó gestionando su propio patrimonio — con los aciertos y los aprendizajes que eso implica. Desde 2015 dedico mi carrera a entender los mercados globales a fondo: renta fija, renta variable y estrategias de inversión, siempre con el mismo rigor analítico que aprendí en posiciones gerenciales en empresas multinacionales.",
  corporate:
    "Antes de dedicarme por completo a los mercados, pasé más de una década en posiciones de gerencia en Bayer y Schering, liderando análisis de negocio, mercadeo y control financiero en Venezuela, y proyectos regionales en México. Esa mirada corporativa — de presupuestos, proyecciones y decisiones basadas en datos — es la misma que hoy aplico para acompañar a las personas con su dinero.",
  philosophy:
    "No vendo productos financieros ni gestiono el dinero de nadie más que el mío. Lo que ofrezco es acompañamiento: te ayudo a entender tus opciones, a construir un plan de retiro con cabeza fría, y a desarrollar el criterio propio para tomar mejores decisiones financieras — con las herramientas de coaching y comportamiento financiero que también forman parte de mi formación.",
  credentials: [
    {
      title: "Asesoramiento Financiero MiFID II",
      org: "Centro de Estudios Financieros (CEF), España — 2026 (150h)",
    },
    {
      title: "Executive MBA",
      org: "IESA, Caracas — 2013–2014",
    },
    {
      title: "Licenciado en Ciencias Administrativas (Gerencia)",
      org: "Universidad Metropolitana (UNIMET) — 1984–1989",
    },
    {
      title: "Certificaciones de Trading",
      org: "Avanzado, Básico y Criptomonedas — 2023–2024",
    },
    {
      title: "Certificación en Coaching y Diplomado en PNL",
      org: "Especialista en comportamiento financiero",
    },
  ],
  timeline: [
    {
      role: "Consultor Financiero Independiente",
      place: "España / Global",
      period: "2015 — Actualidad",
      detail:
        "Gestión de cartera personal de inversión, diseño de estrategias por perfil de riesgo y horizonte, y acompañamiento financiero a terceros.",
    },
    {
      role: "Gerente de Nuevos Negocios",
      place: "Bayer S.A. – Schering",
      period: "2009 — 2013",
      detail: "Análisis y viabilidad financiera para adquisición de productos y unidades de negocio.",
    },
    {
      role: "Gerente Regional, Salesforce Effectiveness",
      place: "Schering AG (CECLA, México)",
      period: "2006 — 2007",
      detail: "Proyecto regional de efectividad de fuerza de ventas en Argentina, Brasil, Canadá, México y Colombia.",
    },
    {
      role: "Gerente de Marketing Controlling",
      place: "Schering de Venezuela",
      period: "1999 — 2004",
      detail: "Presupuestos trienales, proyecciones de ventas e inversiones de capital.",
    },
  ],
  languages: ["Español (nativo)", "Inglés (avanzado)", "Italiano (intermedio)"],
};

export const services = [
  {
    eyebrow: "Retiro",
    title: "Planificación de retiro",
    description:
      "Construimos juntos un plan concreto para llegar a tu jubilación con tranquilidad: metas, horizonte de tiempo y las decisiones que hoy marcan la diferencia.",
  },
  {
    eyebrow: "Educación",
    title: "Educación en inversión y mercados",
    description:
      "Entiende cómo funcionan realmente la renta fija, la renta variable y las estrategias de inversión — para decidir con criterio propio, no por moda ni por miedo.",
  },
  {
    eyebrow: "Acompañamiento",
    title: "Mentoría financiera 1:1",
    description:
      "Sesiones personalizadas con enfoque conductual: hábitos financieros sólidos, con las herramientas de coaching que también forman parte de mi formación.",
  },
];

export const complianceNote =
  "Gabriel Lattanzi ofrece servicios de acompañamiento, mentoría y educación financiera. Esto no constituye asesoría de inversión regulada ni gestión de patrimonio de terceros.";
