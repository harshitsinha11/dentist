import type { Metadata } from "next";

import { BookingRequestForm } from "@/components/booking-request-form";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Send a booking request—we will contact you to confirm details.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Book appointment
      </h1>
      <p className="mt-4 text-muted-foreground">
        Fill in your details and the service you are interested in. We will reach out
        shortly—no time-slot selection on this page.
      </p>
      <div className="mt-10">
        <BookingRequestForm />
      </div>
    </div>
  );
}
