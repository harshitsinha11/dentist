"use client";

import { type FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { dentalServices } from "@/lib/dental-services";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const fieldClass =
  "mt-1.5 flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const labelClass = "text-sm font-medium text-foreground";

export function BookingRequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!service) {
      setError("Please select a service.");
      return;
    }

    setIsSubmitting(true);
    const { error: insertError } = await supabase.from("appointments").insert({
      name: name.trim(),
      phone: phone.trim(),
      service,
      message: message.trim() ? message.trim() : null,
    });

    setIsSubmitting(false);

    if (insertError) {
      setError(insertError.message || "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
    setName("");
    setPhone("");
    setService("");
    setMessage("");
    setError(null);
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl border border-border bg-card p-8 text-center ring-1 ring-foreground/10"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-medium text-foreground">
          Request received, we will contact you shortly
        </p>
        <Button type="button" variant="outline" className="mt-6" onClick={handleReset}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/10 sm:p-8"
      aria-busy={isSubmitting}
    >
      {error ? (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}
      <div className="space-y-5">
        <div>
          <label htmlFor="booking-name" className={labelClass}>
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={isSubmitting}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            className={fieldClass}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="booking-phone" className={labelClass}>
            Phone <span className="text-destructive">*</span>
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            disabled={isSubmitting}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError(null);
            }}
            className={fieldClass}
            placeholder="+91 …"
          />
        </div>
        <div>
          <label htmlFor="booking-service" className={labelClass}>
            Service <span className="text-destructive">*</span>
          </label>
          <select
            id="booking-service"
            name="service"
            required
            disabled={isSubmitting}
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setError(null);
            }}
            className={cn(fieldClass, "h-auto min-h-9 py-2")}
          >
            <option value="">Select a service</option>
            {dentalServices.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="booking-message" className={labelClass}>
            Message <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <textarea
            id="booking-message"
            name="message"
            rows={4}
            disabled={isSubmitting}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError(null);
            }}
            className={cn(fieldClass, "min-h-[100px] resize-y py-2")}
            placeholder="Anything we should know before we call you?"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="mt-8 w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send request"
        )}
      </Button>
    </form>
  );
}
