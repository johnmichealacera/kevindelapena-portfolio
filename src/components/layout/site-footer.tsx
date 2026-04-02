import Link from "next/link";
import { HiringProfileGlyph } from "@/components/layout/hiring-profile-logos";
import { hiringProfileLinks, navLinks, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="from-muted/40 via-secondary/20 to-background border-t border-border/50 bg-gradient-to-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm space-y-2">
            <p className="font-heading text-sm font-semibold text-foreground">
              {siteConfig.name}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:items-end">
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2"
              aria-label="Footer"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`mailto:${siteConfig.email}`}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Email
              </Link>
            </nav>
            <nav
              className="flex flex-wrap items-center gap-3"
              aria-label="Professional profiles"
            >
              {hiringProfileLinks.map(({ brand, label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="border-border/60 from-card/90 to-card/60 hover:border-primary/35 focus-visible:ring-ring inline-flex size-12 items-center justify-center rounded-2xl border bg-gradient-to-b shadow-sm ring-1 ring-black/[0.04] transition-[transform,box-shadow,colors] hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:ring-white/[0.08]"
                >
                  <HiringProfileGlyph
                    brand={brand}
                    className={brand === "linkedin" ? "size-8" : "size-[2.125rem]"}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <p className="text-muted-foreground mt-10 text-xs">
          © {year} {siteConfig.name}. AI automation & n8n workflow services.
        </p>
      </div>
    </footer>
  );
}
