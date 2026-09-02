'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const GTM_ID = 'GTM-MGW5GBKK';

function loadGTM() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('gtm-script')) return;

  const w = window as unknown as { dataLayer: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function getStoredConsent(): string | null {
  try {
    return localStorage.getItem('cookie_consent');
  } catch {
    return null;
  }
}

// useSyncExternalStore requires a subscribe fn; localStorage has no same-tab
// events so we use a no-op — React still switches to the client snapshot after
// hydration, which is when we first read the real localStorage value.
const noopSubscribe = () => () => {};

export function CookieBanner() {
  const { lang } = useLanguage();

  // Reads localStorage safely across SSR/hydration:
  // - server snapshot → null (localStorage unavailable)
  // - client snapshot → actual stored value (after hydration)
  const storedConsent = useSyncExternalStore(
    noopSubscribe,
    getStoredConsent,
    () => null
  );

  // Tracks the user's choice within this session so the banner hides
  // immediately on click, without waiting for a storage event.
  const [sessionConsent, setSessionConsent] = useState<string | null>(null);

  const consent = sessionConsent ?? storedConsent;

  // Load GTM when consent is accepted.
  // No setState call here → no react-hooks/set-state-in-effect violation.
  useEffect(() => {
    if (consent === 'accepted') loadGTM();
  }, [consent]);

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
    setSessionConsent('accepted');
    loadGTM();
  }

  function handleReject() {
    try {
      localStorage.setItem('cookie_consent', 'rejected');
    } catch {
      // ignore
    }
    setSessionConsent('rejected');
  }

  // Show banner only when no consent decision has been made yet
  if (consent !== null) return null;

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
