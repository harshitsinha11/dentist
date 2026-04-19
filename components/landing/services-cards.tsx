import Image from "next/image";
import Link from "next/link";

import { dentalServices } from "@/lib/dental-services";
import { serviceCardImages } from "@/lib/landing-assets";

export function ServicesCards() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            What we offer
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Services tailored to your smile
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            From prevention to full-mouth rehabilitation—explore our core areas of
            care.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dentalServices.map((service) => {
            const src =
              serviceCardImages[service.slug] ??
              serviceCardImages["general-dentistry"];
            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60 transition-shadow duration-300 hover:shadow-2xl hover:ring-primary/25"
                >
                  <Image
                    src={src}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 transition duration-300 group-hover:from-black/80 group-hover:via-black/45" />
                  <div className="absolute inset-0 flex items-end justify-start p-6 transition duration-300 group-hover:items-center group-hover:justify-center group-hover:p-8">
                    <span className="max-w-[90%] text-balance text-lg font-semibold tracking-tight text-white drop-shadow-md transition duration-300 group-hover:max-w-none group-hover:text-center group-hover:text-2xl group-hover:sm:text-3xl">
                      {service.title}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="text-sm font-medium text-primary underline-offset-4 transition hover:underline"
          >
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
