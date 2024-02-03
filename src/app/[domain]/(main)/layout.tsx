import { Metadata } from "next";
import { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar/sidebar";

type DashboardLayoutProps = {
  params: { domain: string }
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Dashboard | Clinica VivaMais",
};

export default function DashboardLayout({ params, children }: DashboardLayoutProps) {
  const domain = decodeURIComponent(params.domain);
  return (
    <div className="">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <h1>Domain Layout ({domain})</h1>
        {children}
      </div>
    </div>
  );
}