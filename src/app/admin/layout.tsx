"use client";
import { AdminProviders } from "@/components/AdminProviders";
import EmployeeLayout from "@/components/EmployLayout";
import { EmployProviders } from "@/components/EmployProvider";
import AdminLayout from "@/components/new/AdminLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProviders>
      <AdminLayout>{children}</AdminLayout>
    </AdminProviders>
  );
}
