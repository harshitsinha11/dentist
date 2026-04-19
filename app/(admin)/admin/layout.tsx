import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border/80 bg-muted/30">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
          <span className="text-sm font-medium text-muted-foreground">
            Admin
          </span>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Back to site
          </Link>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
