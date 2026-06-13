import { prisma } from "../../../lib/prisma";
import { Card } from "../../../components/ui/card";

export default async function AdminUsersPage() {
  const users = (await prisma.user.findMany({ include: { role: true } })) as Array<{
    id: string;
    name: string;
    email: string;
    role: { name: string };
  }>;

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl shadow-slate-950/20">
        <h1 className="text-3xl font-semibold">Users</h1>
        <p className="mt-3 text-sm text-slate-400">Manage admin users, roles, and permissions for secured access.</p>
      </div>
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="border-white/10 bg-slate-900/95 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-300">{user.role.name}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
