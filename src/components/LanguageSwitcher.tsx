'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1" aria-label="Selector de idioma">
      <button
        onClick={() => setLang('es')}
        aria-label="Español"
        title="Español"
        className={[
          'rounded px-1.5 py-0.5 font-body text-base leading-none transition-opacity focus-ring',
          lang === 'es' ? 'opacity-100' : 'opacity-35 hover:opacity-70',
        ].join(' ')}
      >
        🇪🇸
      </button>
      <button
        onClick={() => setLang('en')}
        aria-label="English"
        title="English"
        className={[
          'rounded px-1.5 py-0.5 font-body text-base leading-none transition-opacity focus-ring',
          lang === 'en' ? 'opacity-100' : 'opacity-35 hover:opacity-70',
        ].join(' ')}
      >
        🇬🇧
      </button>
    </div>
  );
}
