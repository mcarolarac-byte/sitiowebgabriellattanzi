'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1.5" aria-label="Language selector">
      <button
        onClick={() => setLang('es')}
        aria-label="Espa\u00f1ol"
        title="Espa\u00f1ol"
        className={[
          'rounded focus-ring transition-opacity',
          lang === 'es' ? 'opacity-100 ring-1 ring-brass/40' : 'opacity-40 hover:opacity-75',
        ].join(' ')}
      >
        <Image src="/flags/es.svg" alt="ES" width={24} height={16} className="block rounded-[2px]" />
      </button>
      <button
        onClick={() => setLang('en')}
        aria-label="English"
        title="English"
        className={[
          'rounded focus-ring transition-opacity',
          lang === 'en' ? 'opacity-100 ring-1 ring-brass/40' : 'opacity-40 hover:opacity-75',
        ].join(' ')}
      >
        <Image src="/flags/gb.svg" alt="EN" width={24} height={16} className="block rounded-[2px]" />
      </button>
    </div>
  );
}
