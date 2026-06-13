import { getCurrentUser } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 py-10 sm:px-8 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <AdminNav />
          <main className="flex-grow w-full min-w-0">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}

