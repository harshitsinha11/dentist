import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-2 text-muted-foreground">
        Admin routes live under{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">/admin</code>.
        Sign in to open the dashboard.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/login" className={cn(buttonVariants())}>
          Sign in
        </Link>
        <Link
          href="/admin/dashboard"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
