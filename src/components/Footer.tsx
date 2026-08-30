import Link from "next/link";
import { Container } from "./Container";
import { complianceNote, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container className="flex flex-col gap-8 py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="mt-1 font-body text-sm text-paper/70">{site.tagline}</p>
          </div>
          <div className="flex flex-col gap-1 font-body text-sm text-paper/80">
            <a className="focus-ring rounded" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
            <a
              className="focus-ring rounded"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <p className="text-paper/60">{site.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed">{complianceNote}</p>
          <Link href="/privacidad" className="focus-ring shrink-0 rounded underline">
            Aviso de privacidad
          </Link>
        </div>
      </Container>
    </footer>
  );
}
