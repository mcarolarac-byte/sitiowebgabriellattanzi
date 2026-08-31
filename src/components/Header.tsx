'use client';

import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { site } from "@/lib/content";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { lang } = useLanguage();

  const navLinks =
    lang === 'en'
      ? [
          { href: "/quien-soy", label: "Who I Am" },
          { href: "/que-hago", label: "What I Do" },
          { href: "/blog", label: "Blog" },
          { href: "/contacto", label: "Contact" },
        ]
      : [
          { href: "/quien-soy", label: "\u00bfQui\u00e9n soy?" },
          { href: "/que-hago", label: "\u00bfQu\u00e9 hago?" },
          { href: "/blog", label: "Blog" },
          { href: "/contacto", label: "Contacto" },
        ];

  const ctaLabel = lang === 'en' ? 'Schedule a call' : 'Agenda una llamada';

  return (
    <header className="border-b border-line bg-paper">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="focus-ring rounded font-display text-xl font-semibold tracking-tight text-ink"
        >
          <Image
            src="/logo-gl.png"
            alt={site.name}
            width={40}
            height={40}
            className="block"
            priority
          />
          <span className="hidden md:inline ml-3">{site.name}</span>
        </Link>
        <nav aria-label="Principal" className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded font-body text-sm text-slate transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 sm:flex">
          <LanguageSwitcher />
          <Link
            href="/contacto#agenda"
            className="focus-ring rounded-sm bg-ink px-4 py-2 font-body text-sm text-paper transition-colors hover:bg-ink-soft"
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
      {/* Navegaci\u00f3n m\u00f3vil simple: enlaces visibles en una fila con scroll */}
      <nav
        aria-label="Principal m\u00f3vil"
        className="flex items-center gap-6 overflow-x-auto border-t border-line px-6 py-3 md:hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="focus-ring shrink-0 rounded font-body text-sm text-slate"
          >
            {link.label}
          </Link>
        ))}
        <div className="ml-auto shrink-0">
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
