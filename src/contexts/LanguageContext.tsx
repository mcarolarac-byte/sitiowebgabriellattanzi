'use client';

import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
} from 'react';

export type Lang = 'es' | 'en';

const STORAGE_KEY = 'gl-lang';
const EVENT_KEY = 'gl-language-change';

function getSnapshot(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === 'es' || stored === 'en') return stored;
  } catch {}
  return 'es';
}

// El servidor siempre devuelve 'es' (no tiene acceso a localStorage)
function getServerSnapshot(): Lang {
  return 'es';
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(EVENT_KEY, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(EVENT_KEY, callback);
  };
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((newLang: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {}
    // Actualizar atributo lang del HTML
    document.documentElement.lang = newLang;
    // Notificar a todos los suscriptores en la misma pestaña
    window.dispatchEvent(new Event(EVENT_KEY));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
