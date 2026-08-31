'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'es' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  // Restaurar preferencia guardada
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gl-lang') as Lang | null;
      if (stored === 'es' || stored === 'en') {
        setLangState(stored);
      }
    } catch {}
  }, []);

  // Actualizar atributo lang del HTML
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    try {
      localStorage.setItem('gl-lang', newLang);
    } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
