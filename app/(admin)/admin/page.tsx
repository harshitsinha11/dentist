export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Admin dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Admin routes live under{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm">/admin</code>
        .
      </p>
    </div>
  );
}
