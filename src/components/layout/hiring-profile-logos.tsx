import type { HiringProfileBrand } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Official LinkedIn “in” lockup path (24×24), white on brand blue in footer tiles */
function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6", className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

/** JobStreet-style teal tile with “js” monogram (not an official asset). */
function JobStreetGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6", className)}
      aria-hidden
    >
      <rect width="24" height="24" rx="5" fill="#0f766e" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fill="white"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="-0.02em"
      >
        js
      </text>
    </svg>
  );
}

/** OnlineJobs.ph-style orange tile with “OJ” monogram (not an official asset). */
function OnlineJobsGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6", className)}
      aria-hidden
    >
      <rect width="24" height="24" rx="5" fill="#ea580c" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fill="white"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="-0.03em"
      >
        OJ
      </text>
    </svg>
  );
}

export function HiringProfileGlyph({
  brand,
  className,
}: {
  brand: HiringProfileBrand;
  className?: string;
}) {
  switch (brand) {
    case "linkedin":
      return (
        <LinkedInGlyph className={cn("text-[#0A66C2]", className)} />
      );
    case "jobstreet":
      return <JobStreetGlyph className={className} />;
    case "onlinejobs":
      return <OnlineJobsGlyph className={className} />;
    default:
      return null;
  }
}
