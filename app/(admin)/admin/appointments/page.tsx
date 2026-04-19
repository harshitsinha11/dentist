import type { Metadata } from "next";

import { AdminAppointments } from "@/components/admin-appointments";

export const metadata: Metadata = {
  title: "Appointments",
  robots: { index: false, follow: false },
};

export default function AdminAppointmentsPage() {
  return <AdminAppointments />;
}
