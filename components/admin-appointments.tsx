"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { getServiceBySlug } from "@/lib/dental-services";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export const appointmentStatuses = [
  "pending",
  "contacted",
  "confirmed",
  "cancelled",
] as const;

export type AppointmentStatus = (typeof appointmentStatuses)[number];

type AppointmentRow = {
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string | null;
  status: string;
  created_at: string;
};

const selectClass =
  "h-8 min-w-[9.5rem] rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60";

function formatCreatedAt(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function serviceLabel(slug: string) {
  return getServiceBySlug(slug)?.title ?? slug;
}

function isAppointmentStatus(value: string): value is AppointmentStatus {
  return (appointmentStatuses as readonly string[]).includes(value);
}

export function AdminAppointments() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<AppointmentRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    setLoadError(null);
    const { data, error } = await supabase
      .from("appointments")
      .select("id,name,phone,service,message,status,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setLoadError(error.message);
      setRows([]);
      return;
    }

    setRows((data ?? []) as AppointmentRow[]);
  }, []);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    void fetchRows();
  }, [ready, fetchRows]);

  async function handleStatusChange(id: string, next: AppointmentStatus) {
    const row = rows.find((r) => r.id === id);
    const previous = row?.status;
    if (!row || previous === next) return;

    setUpdatingId(id);
    setActionError(null);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)));

    const { error } = await supabase.from("appointments").update({ status: next }).eq("id", id);

    if (error) {
      setRows((prev) =>
        prev.map((r) => (r.id === id && previous !== undefined ? { ...r, status: previous } : r)),
      );
      setActionError(error.message);
    }

    setUpdatingId(null);
  }

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" aria-hidden />
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Appointment requests</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update status as you work each lead.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/dashboard"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Dashboard
          </Link>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void fetchRows()}
            disabled={!!updatingId}
          >
            Refresh
          </Button>
        </div>
      </div>

      {loadError ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {loadError}
        </div>
      ) : null}

      {actionError ? (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {actionError}
        </div>
      ) : null}

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card ring-1 ring-foreground/10">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-4 py-3 font-medium text-foreground">Name</th>
              <th className="px-4 py-3 font-medium text-foreground">Phone</th>
              <th className="px-4 py-3 font-medium text-foreground">Service</th>
              <th className="px-4 py-3 font-medium text-foreground">Message</th>
              <th className="px-4 py-3 font-medium text-foreground">Status</th>
              <th className="px-4 py-3 font-medium text-foreground">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  No appointment requests yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const safeStatus: AppointmentStatus = isAppointmentStatus(r.status)
                  ? r.status
                  : "pending";
                return (
                  <tr key={r.id} className="border-b border-border/80 last:border-0">
                    <td className="px-4 py-3 align-top font-medium text-foreground">{r.name}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground">{r.phone}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground">
                      {serviceLabel(r.service)}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 align-top text-muted-foreground">
                      <span className="line-clamp-3 whitespace-pre-wrap break-words">
                        {r.message?.trim() ? r.message : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <select
                        className={cn(selectClass)}
                        value={safeStatus}
                        disabled={updatingId === r.id}
                        aria-label={`Status for ${r.name}`}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (isAppointmentStatus(v)) void handleStatusChange(r.id, v);
                        }}
                      >
                        {appointmentStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top text-muted-foreground">
                      {formatCreatedAt(r.created_at)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
