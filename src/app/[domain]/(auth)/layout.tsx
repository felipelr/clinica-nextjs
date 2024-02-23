import { getSiteData } from "@/common/auth/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Clinica VivaMais",
};

type AuthLayoutProps = {
  params: { domain: string }
  children: ReactNode 
}

export default async function AuthLayout({ children, params }: AuthLayoutProps) {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);

  if (!data) {
    notFound();
  }
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
        {children}
      
        <p className="text-xs text-gray-600 text-center mt-10">&copy; {`${new Date().getFullYear()} ${data.name}`}</p>
      </div>
  );
}