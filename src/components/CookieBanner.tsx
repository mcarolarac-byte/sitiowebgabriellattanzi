"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem("cookie-consent");
      if (!accepted) setVisible(true);
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem("cookie-consent", "accepted");
    } catch {
      // silently fail
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-paper px-6 py-4 shadow-lg sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-sm sm:border"
    >
      <p className="font-body text-sm leading-relaxed text-slate">
        Este sitio usa únicamente <strong className="text-ink">cookies esenciales</strong> para
        su funcionamiento. No usamos cookies de seguimiento ni publicidad.{" "}
        <Link href="/privacidad" className="underline hover:text-ink">
          Más información
        </Link>
        .
      </p>
      <button
        onClick={accept}
        className="focus-ring mt-3 rounded-sm bg-ink px-5 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
      >
        Entendido
      </button>
    </div>
  );
}
