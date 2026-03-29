"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SHOW_AFTER_SCROLL_Y = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_SCROLL_Y);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("hero")?.focus({ preventScroll: true });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            onClick={scrollToTop}
            className={cn(
              "border-border/70 bg-card/90 text-foreground shadow-lg shadow-primary/10 backdrop-blur-md",
              "hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
              "ring-primary/15 focus-visible:ring-2"
            )}
            aria-label="Back to top"
          >
            <ChevronUpIcon className="size-5" aria-hidden />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
