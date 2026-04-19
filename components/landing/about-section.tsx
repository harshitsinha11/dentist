import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { aboutDoctorImage } from "@/lib/landing-assets";
import { cn } from "@/lib/utils";

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-b border-border/60 bg-muted/20 py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:gap-16 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            About your doctor
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Clinical excellence, human warmth
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground sm:text-lg">
            Dr. Morgan combines advanced training in restorative and cosmetic
            dentistry with a calm, educational approach—so you always understand
            your options and feel at ease in the chair.
          </p>
          <p className="mt-4 text-pretty text-muted-foreground">
            Our philosophy is simple: conservative treatment when possible, clear
            communication always, and outcomes that look natural and feel
            comfortable for years to come.
          </p>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "mt-8"
            )}
          >
            Full biography
          </Link>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-2xl ring-1 ring-border/60">
            <Image
              src={aboutDoctorImage}
              alt="Portrait of Dr. Morgan in the clinic"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
