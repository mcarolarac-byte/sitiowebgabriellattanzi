import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { site } from "@/lib/content";

const navLinks = [
  { href: "/quien-soy", label: "¿Quién soy?" },
  { href: "/que-hago", label: "¿Qué hago?" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
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
        <Link
          href="/contacto#agenda"
          className="focus-ring hidden rounded-sm bg-ink px-4 py-2 font-body text-sm text-paper transition-colors hover:bg-ink-soft sm:inline-block"
        >
          Agenda una llamada
        </Link>
      </Container>
      {/* Navegación móvil simple: enlaces visibles en una fila con scroll */}
      <nav
        aria-label="Principal móvil"
        className="flex gap-6 overflow-x-auto border-t border-line px-6 py-3 md:hidden"
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
      </nav>
    </header>
  );
}
