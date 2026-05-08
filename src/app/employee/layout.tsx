"use client";
import EmployeeLayout from "@/components/EmployLayout";
import { EmployProviders } from "@/components/EmployProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmployProviders>
      <EmployeeLayout>{children}</EmployeeLayout>
    </EmployProviders>
  );
}
