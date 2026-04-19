import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Admin login",
  description: "Sign in to the admin area.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Admin sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in with a user from your Supabase project (Authentication → Users).
      </p>
      <AdminLoginForm />
    </div>
  );
}
