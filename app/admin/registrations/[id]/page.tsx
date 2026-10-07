import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getRegistrationById } from "@/actions/admin";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { RegistrationDetailClient } from "@/components/admin/RegistrationDetailClient";

export const metadata = {
  title: "Registration Details | VCET Admin Portal",
  description: "View and verify competition registration and payment screenshot.",
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminRegistrationDetailPage({ params }: PageProps) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const registration = await getRegistrationById(id);

  if (!registration) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <AdminNavbar adminEmail={session.email} />

      <main className="w-full flex-1 py-8 sm:py-10">
        <div style={{ maxWidth: "1400px", marginLeft: "auto", marginRight: "auto", paddingLeft: "24px", paddingRight: "24px", width: "100%" }}>
          <RegistrationDetailClient registration={registration} />
        </div>
      </main>
    </div>
  );
}
