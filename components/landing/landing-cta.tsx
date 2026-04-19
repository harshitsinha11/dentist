import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-background to-primary/10 px-8 py-16 text-center ring-1 ring-border/60 sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-primary/5 blur-3xl"
            aria-hidden
          />
          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready for your next visit?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">
            Book a time that works for you. New patients welcome—we will confirm
            your appointment shortly.
          </p>
          <Link
            href="/book"
            className={cn(
              buttonVariants({ size: "lg" }),
              "relative mt-10 min-w-[220px] shadow-lg shadow-primary/25"
            )}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
