"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  bookingConsultationHref,
  hasCalendlyBooking,
  navLinks,
  siteConfig,
} from "@/lib/site-config";
import { useActiveSection, navHrefToSectionId } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const activeSection = useActiveSection();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/75 backdrop-blur-lg supports-backdrop-filter:bg-background/65">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/#hero"
          className="font-heading text-sm font-semibold tracking-tight text-foreground sm:text-base"
        >
          {siteConfig.name}
          <span className="text-muted-foreground font-normal">
            {" "}
            · Automation
          </span>
        </Link>
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const sectionId = navHrefToSectionId(link.href);
            const isActive = activeSection === sectionId;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/12 text-primary ring-primary/25 shadow-sm ring-1"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={bookingConsultationHref()}
            target={hasCalendlyBooking() ? "_blank" : undefined}
            rel={hasCalendlyBooking() ? "noopener noreferrer" : undefined}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-9 px-4 transition-shadow duration-200",
              !hasCalendlyBooking() &&
                activeSection === "contact" &&
                "ring-primary-foreground/35 shadow-md ring-2"
            )}
            aria-current={
              !hasCalendlyBooking() && activeSection === "contact"
                ? "location"
                : undefined
            }
          >
            Book a call
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger
              render={<Button variant="outline" size="icon" />}
              aria-label="Open menu"
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 px-4 pb-6"
                aria-label="Mobile primary"
              >
                {navLinks.map((link) => {
                  const sectionId = navHrefToSectionId(link.href);
                  const isActive = activeSection === sectionId;
                  return (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className={cn(
                            "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary/12 text-primary ring-primary/20 ring-1"
                              : "text-foreground hover:bg-muted"
                          )}
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  );
                })}
                <SheetClose
                  render={
                    <Link
                      href={bookingConsultationHref()}
                      target={hasCalendlyBooking() ? "_blank" : undefined}
                      rel={
                        hasCalendlyBooking() ? "noopener noreferrer" : undefined
                      }
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "mt-4 justify-center",
                        !hasCalendlyBooking() &&
                          activeSection === "contact" &&
                          "ring-primary-foreground/35 ring-2"
                      )}
                    />
                  }
                >
                  Book a call
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
