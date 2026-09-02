'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  es: string;
  en: string;
  siteName?: string;
}

/**
 * Updates document.title client-side when the language changes.
 * Use this inside pages whose Next.js metadata is server-side (static Spanish).
 */
export function DocumentTitle({ es, en, siteName = 'Gabriel Lattanzi' }: Props) {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = lang === 'en'
      ? `${en} — ${siteName}`
      : `${es} — ${siteName}`;
  }, [lang, es, en, siteName]);

  return null;
}
