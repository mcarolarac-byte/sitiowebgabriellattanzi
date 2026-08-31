import { useLanguage } from '@/contexts/LanguageContext';
import * as es from './content';
import * as en from './content.en';

/**
 * Devuelve el contenido en el idioma activo (es | en).
 * Usar solo en Client Components ('use client').
 */
export function useContent() {
  const { lang } = useLanguage();
  return lang === 'en' ? en : es;
}
