import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "The most thorough exam I have ever had. They explained everything without rushing, and the office feels more like a spa than a clinic.",
    name: "Sarah L.",
    detail: "Cosmetic consultation",
  },
  {
    quote:
      "I used to dread cleanings. The team is gentle, on time, and the space is spotless. I actually look forward to visits now.",
    name: "James R.",
    detail: "Hygiene & prevention",
  },
  {
    quote:
      "Clear treatment plan, fair pricing, and beautiful results on my veneers. Could not recommend them more highly.",
    name: "Priya K.",
    detail: "Smile makeover",
  },
  {
    quote:
      "Our kids actually ask when the next dentist day is. That says everything about how patient and kind everyone is.",
    name: "The Chen family",
    detail: "Pediatric care",
  },
  {
    quote:
      "When I chipped a tooth on a Friday, they fit me in quickly and fixed it the same day. True professionals.",
    name: "Marcus T.",
    detail: "Emergency visit",
  },
] as const;

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-y border-border/60 bg-muted/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Patient stories
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Trusted by our community
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Real feedback from people who value comfort, clarity, and lasting
            results.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <Card className="h-full border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition hover:shadow-md">
                <CardHeader className="pb-2">
                  <blockquote className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs font-medium text-foreground">
                    {t.name}
                  </CardDescription>
                  <p className="mt-1 text-xs text-muted-foreground">{t.detail}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
