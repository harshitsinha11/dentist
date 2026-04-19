import Link from "next/link";

import { cn } from "@/lib/utils";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Doctor" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book" },
] as const;

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-auto border-t border-border/80 bg-muted/30 py-8 text-sm text-muted-foreground",
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Dentist. All rights reserved.
        </p>
        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-end"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
