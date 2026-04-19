import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  dentalServices,
  getServiceBySlug,
} from "@/lib/dental-services";
import { serviceCardImages } from "@/lib/landing-assets";
import { cn } from "@/lib/utils";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return dentalServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.excerpt,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const { slug } = params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const heroSrc =
    serviceCardImages[service.slug] ?? serviceCardImages["general-dentistry"];

  return (
    <article>
      {/* Hero */}
      <section className="relative isolate min-h-[min(52vh,28rem)] overflow-hidden">
        <Image
          src={heroSrc}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
          <nav className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-border">
                /
              </li>
              <li>
                <Link href="/services" className="transition hover:text-foreground">
                  Services
                </Link>
              </li>
              <li aria-hidden className="text-border">
                /
              </li>
              <li className="font-medium text-foreground">{service.title}</li>
            </ol>
          </nav>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Dental care
          </p>
          <h1 className="mt-2 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            {service.excerpt}
          </p>
        </div>
      </section>

      {/* Treatment description */}
      <section className="border-b border-border/60 bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            About this treatment
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground sm:text-lg">
            {service.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/35 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Benefits for you
            </h2>
            <p className="mt-3 text-muted-foreground sm:text-lg">
              What patients value most when they choose this area of care with us.
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-5">
            {service.benefits.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm backdrop-blur-sm sm:p-5"
              >
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-foreground sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-background to-primary/10 px-8 py-14 text-center ring-1 ring-border/60 sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-primary/5 blur-3xl"
              aria-hidden
            />
            <h2 className="relative text-2xl font-semibold tracking-tight sm:text-3xl">
              Book your appointment
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-muted-foreground sm:text-lg">
              Interested in {service.title}? Pick a time that works for you—we will
              confirm your visit and help you prepare for your first appointment.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/book"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "min-w-[220px] shadow-lg shadow-primary/25"
                )}
              >
                Book appointment
              </Link>
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "min-w-[180px] bg-background/60 backdrop-blur-sm"
                )}
              >
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
