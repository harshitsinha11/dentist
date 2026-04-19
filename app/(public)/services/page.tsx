import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { dentalServices } from "@/lib/dental-services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our dental services and find the right care for you.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Dental services
        </h1>
        <p className="mt-3 text-muted-foreground">
          From prevention to restorative and cosmetic options—browse what we offer
          and tap a service to learn more.
        </p>
      </div>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dentalServices.map((s) => (
          <li key={s.slug}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link
                  href={`/services/${s.slug}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full sm:w-auto"
                  )}
                >
                  Learn more
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <Button render={<Link href="/book" />}>Book an appointment</Button>
      </div>
    </div>
  );
}
