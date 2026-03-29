import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/site-config";

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
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
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
        </div>
        <p className="text-muted-foreground mt-10 text-xs">
          © {year} {siteConfig.name}. AI automation & n8n workflow services.
        </p>
      </div>
    </footer>
  );
}
