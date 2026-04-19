import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PHONE_E164 = "+917380830936";
const PHONE_DISPLAY = "+91 73808 30936";
const WHATSAPP_URL = "https://wa.me/917380830936";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${PHONE_DISPLAY}, message us on WhatsApp, or view our office details.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
      <p className="mt-4 text-muted-foreground">
        Call or WhatsApp us for questions, appointment requests, or urgent concerns. We
        will get back to you as soon as we can.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={`tel:${PHONE_E164}`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "inline-flex w-full items-center justify-center gap-2 sm:w-auto sm:min-w-[200px]"
          )}
        >
          <Phone className="size-4" aria-hidden />
          Call {PHONE_DISPLAY}
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "inline-flex w-full items-center justify-center gap-2 border-[#25D366]/40 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/15 hover:text-[#075E54] dark:border-[#25D366]/30 dark:bg-[#25D366]/15 dark:text-[#dcf8c6] dark:hover:bg-[#25D366]/25 sm:w-auto sm:min-w-[200px]"
          )}
        >
          <MessageCircle className="size-4" aria-hidden />
          WhatsApp
        </a>
      </div>

      <section className="mt-14 rounded-2xl border border-border/60 bg-muted/30 p-6 sm:p-8">
        <h2 className="text-lg font-semibold tracking-tight">Contact information</h2>
        <dl className="mt-6 space-y-5 text-sm">
          <div>
            <dt className="font-medium text-foreground">Phone</dt>
            <dd className="mt-1">
              <a
                href={`tel:${PHONE_E164}`}
                className="text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
              >
                {PHONE_DISPLAY}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Chat on WhatsApp
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Hours</dt>
            <dd className="mt-1 text-muted-foreground">
              Monday–Friday: 8:00–17:00
              <br />
              Saturday: By appointment
            </dd>
          </div>
        </dl>
      </section>

      <div className="mt-10">
        <Link href="/book" className={cn(buttonVariants({ variant: "secondary" }))}>
          Book appointment online
        </Link>
      </div>
    </div>
  );
}
