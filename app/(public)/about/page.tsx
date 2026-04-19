import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Doctor",
  description: "Meet your dentist and learn about our approach to care.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        About Doctor
      </h1>
      <p className="mt-4 text-muted-foreground">
        Our practice is built on clear communication, evidence-based treatment, and
        a calm chairside experience. We take time to explain options and help you
        feel confident in your care plan.
      </p>
      <p className="mt-4 text-muted-foreground">
        Education and continuing training keep our team aligned with modern materials
        and techniques—so you get care that fits your goals and your schedule.
      </p>
    </div>
  );
}
