"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2400&q=80",
    alt: "Bright modern dental treatment room",
  },
  {
    src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=2400&q=80",
    alt: "Patient receiving gentle dental care",
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=2400&q=80",
    alt: "Healthy confident smile",
  },
  {
    src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=2400&q=80",
    alt: "Professional dental instruments",
  },
] as const;

const INTERVAL_MS = 6000;

export function HeroSlider() {
  const [index, setIndex] = React.useState(0);
  const n = slides.length;

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [n]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + n) % n);
  };

  return (
    <section className="w-full" aria-label="Hero">
      {/* Slideshow only — full viewport minus header */}
      <div
        className="relative min-h-[calc(100svh-3.5rem)] w-full overflow-hidden sm:min-h-[calc(100svh-4rem)]"
        aria-roledescription="carousel"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "z-0 opacity-100" : "z-0 opacity-0"
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Light bottom gradient so controls stay readable on bright photos */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-transparent to-transparent"
          aria-hidden
        />

        <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-3 sm:bottom-8">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="border-white/30 bg-black/25 text-white backdrop-blur-sm hover:bg-black/40"
            aria-label="Previous slide"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70"
                )}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="border-white/30 bg-black/25 text-white backdrop-blur-sm hover:bg-black/40"
            aria-label="Next slide"
            onClick={() => go(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Intro + CTAs — below the slideshow, normal document flow */}
      <div className="border-b border-border/60 bg-background px-4 py-14 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary sm:text-sm">
            Premier dental care
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Where precision meets{" "}
            <span className="text-balance text-primary">comfort</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:mx-auto sm:text-lg">
            A calm, modern clinic focused on lasting oral health—tailored treatment
            plans and a team that listens.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-[200px] shadow-lg shadow-primary/20"
              )}
            >
              Book Appointment
            </Link>
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
