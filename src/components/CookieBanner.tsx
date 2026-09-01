'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const GTM_ID = 'GTM-MGW5GBKK';

function loadGTM() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('gtm-script')) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

export function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent === 'accepted') {
        loadGTM();
      } else if (!consent) {
        setVisible(true);
      }
    } catch {
      // localStorage no disponible
    }
  }, []);

  const t =
    lang === 'en'
      ? {
          message:
            'This site uses cookies to understand how visitors use it and improve the experience.',
          privacy: 'Privacy policy',
          accept: 'Accept',
          reject: 'Reject',
        }
      : {
          message:
            'Este sitio usa cookies para entender cómo lo usan los visitantes y mejorar la experiencia.',
          privacy: 'Política de privacidad',
          accept: 'Aceptar',
          reject: 'Rechazar',
        };

  function handleAccept() {
    try {
      localStorage.setItem('cookie_consent', 'accepted');
    } catch {
      // ignore
    }
    loadGTM();
    setVisible(false);
  }

  function handleReject() {
    try {
      localStorage.setItem('cookie_consent', 'rejected');
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-paper px-4 py-4 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-sm leading-relaxed text-slate-soft">
          {t.message}{' '}
          <Link
            href="/privacidad"
            className="underline underline-offset-2 hover:text-ink"
          >
            {t.privacy}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleReject}
            className="rounded-sm border border-line px-4 py-2 font-body text-sm text-slate-soft transition-colors hover:border-ink hover:text-ink"
          >
            {t.reject}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-sm bg-ink px-4 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
