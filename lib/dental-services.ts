export type DentalService = {
  slug: string;
  title: string;
  excerpt: string;
  /** Long-form paragraphs describing the treatment. */
  description: string[];
  /** Short bullet-style benefits for the detail page. */
  benefits: string[];
};

export const dentalServices: readonly DentalService[] = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    excerpt: "Exams, cleanings, fillings, and preventive care for the whole family.",
    description: [
      "Routine checkups and professional cleanings help catch issues early and keep your gums healthy.",
      "We offer tooth-colored fillings, sealants, and personalized hygiene plans tailored to your smile.",
    ],
    benefits: [
      "Catch decay and gum disease before they become bigger problems",
      "Comfortable hygiene visits with guidance you can use at home",
      "Tooth-colored fillings and sealants when prevention needs a little help",
      "Care plans for every age, from first visits to maintenance for busy adults",
    ],
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    excerpt: "Whitening, bonding, and veneers for a confident smile.",
    description: [
      "From professional whitening to subtle reshaping, we focus on natural-looking results.",
      "Porcelain veneers and cosmetic bonding can address chips, gaps, and uneven edges in fewer visits.",
    ],
    benefits: [
      "Professional whitening options calibrated for your enamel",
      "Veneers and bonding designed to look like natural teeth",
      "Digital planning so you can preview the direction of your smile",
      "Conservative approaches—we only remove what the plan truly needs",
    ],
  },
  {
    slug: "orthodontics",
    title: "Orthodontics",
    excerpt: "Straightening options including clear aligners and traditional braces.",
    description: [
      "We evaluate bite alignment and spacing to recommend the right approach for adults and teens.",
      "Clear aligner therapy and conventional braces are both available—ask which fits your lifestyle.",
    ],
    benefits: [
      "Personalized plans for crowding, spacing, and bite issues",
      "Clear aligners for discreet treatment when you qualify",
      "Traditional braces when precision and control matter most",
      "Progress checks so treatment stays on track with minimal surprises",
    ],
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    excerpt: "Stable, long-lasting replacement teeth that feel more like your own.",
    description: [
      "Implants replace tooth roots and support crowns or bridges with excellent stability.",
      "Treatment planning includes bone assessment and restorative options matched to your case.",
    ],
    benefits: [
      "Fixed-in-place stability that does not slip like removable dentures",
      "Preserves bone volume in the area of a missing tooth",
      "Single-tooth, multiple-tooth, and full-arch solutions",
      "Step-by-step planning so you know timelines and what to expect",
    ],
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    excerpt: "Gentle care for children in a welcoming, kid-friendly environment.",
    description: [
      "Early visits build comfort with the dental chair and teach healthy habits for life.",
      "We monitor growth, offer protective treatments, and coordinate with parents every step of the way.",
    ],
    benefits: [
      "Kid-paced appointments that build trust visit by visit",
      "Preventive care including sealants and fluoride when appropriate",
      "Growth and eruption monitoring with clear parent communication",
      "A calm team trained in behavior-friendly techniques",
    ],
  },
  {
    slug: "emergency-care",
    title: "Emergency Care",
    excerpt: "Same-day attention for pain, swelling, or dental trauma when you need it most.",
    description: [
      "Call us for urgent symptoms—we prioritize emergencies and guide you on immediate steps.",
      "Common urgent visits include toothaches, broken teeth, and lost restorations.",
    ],
    benefits: [
      "Same-day slots when you are in pain or have acute swelling",
      "Clear triage advice over the phone before you arrive",
      "Focused visits to stabilize the problem and plan next steps",
      "Coordination with your regular dentist if follow-up care is needed",
    ],
  },
] as const;

export function getServiceBySlug(slug: string): DentalService | undefined {
  return dentalServices.find((s) => s.slug === slug);
}
