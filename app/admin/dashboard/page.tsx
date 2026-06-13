import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { Card } from "../../../components/ui/card";
import { DashboardChart } from "../../../components/admin/dashboard-chart";
import { 
  Users, 
  Inbox, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  MessageSquare,
  TrendingUp,
  FileText,
  Activity
} from "lucide-react";

const metricItems = [
  { 
    label: "Total Leads", 
    key: "leads", 
    icon: Users, 
    colorClass: "text-blue-400", 
    bgGlow: "from-blue-500/10 to-transparent",
    borderColor: "hover:border-blue-500/30",
    href: "/admin/leads"
  },
  { 
    label: "New Leads", 
    key: "newLeads", 
    icon: Inbox, 
    colorClass: "text-emerald-400", 
    bgGlow: "from-emerald-500/10 to-transparent",
    borderColor: "hover:border-emerald-500/30",
    href: "/admin/leads"
  },
  { 
    label: "Blogs", 
    key: "blogs", 
    icon: BookOpen, 
    colorClass: "text-violet-400", 
    bgGlow: "from-violet-500/10 to-transparent",
    borderColor: "hover:border-violet-500/30",
    href: "/admin/blogs"
  },
  { 
    label: "Services", 
    key: "services", 
    icon: Layers, 
    colorClass: "text-amber-400", 
    bgGlow: "from-amber-500/10 to-transparent",
    borderColor: "hover:border-amber-500/30",
    href: "/admin/services"
  },
  { 
    label: "FAQs", 
    key: "faqs", 
    icon: HelpCircle, 
    colorClass: "text-teal-400", 
    bgGlow: "from-teal-500/10 to-transparent",
    borderColor: "hover:border-teal-500/30",
    href: "/admin/faqs"
  },
  { 
    label: "Testimonials", 
    key: "testimonials", 
    icon: MessageSquare, 
    colorClass: "text-rose-400", 
    bgGlow: "from-rose-500/10 to-transparent",
    borderColor: "hover:border-rose-500/30",
    href: "/admin/testimonials"
  },
];

export default async function DashboardPage() {
  const [leadCount, newLeads, blogCount, serviceCount, faqCount, testimonialCount] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.blog.count(),
    prisma.service.count(),
    prisma.fAQ.count(),
    prisma.testimonial.count(),
  ]);

  const metrics = {
    leads: leadCount,
    newLeads,
    blogs: blogCount,
    services: serviceCount,
    faqs: faqCount,
    testimonials: testimonialCount,
  };

  const chartData = [
    { month: "Jan", leads: 18 },
    { month: "Feb", leads: 24 },
    { month: "Mar", leads: 34 },
    { month: "Apr", leads: 29 },
    { month: "May", leads: 38 },
    { month: "Jun", leads: 42 },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">
        {metricItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.key} 
              href={item.href}
              className={`relative overflow-hidden block rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition-all duration-300 hover:scale-[1.03] hover:bg-slate-900/90 ${item.borderColor} group`}
            >
              {/* Glow Ball */}
              <div className={`absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-gradient-to-br ${item.bgGlow} blur-2xl opacity-50 group-hover:opacity-85 transition-opacity duration-300`} />
              
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 group-hover:text-slate-300 transition-colors">{item.label}</p>
                <div className={`rounded-2xl bg-white/5 p-2.5 ${item.colorClass} group-hover:bg-white/10 transition-all duration-300`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-6 text-4xl font-bold tracking-tight text-white">{metrics[item.key as keyof typeof metrics]}</p>
            </Link>
          );
        })}
      </div>
      <DashboardChart data={chartData} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="relative overflow-hidden border-white/10 bg-slate-900/70 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/90 hover:border-amber-500/20 group flex flex-col justify-between">
          <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-gradient-to-br from-amber-500/5 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-500/10 p-2.5 text-amber-400 group-hover:bg-amber-500/20 transition-all duration-300">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Lead distribution</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400 group-hover:text-slate-300 transition-colors">Monitor the volume of inbound contacts and identify your strongest service demand in San Jose.</p>
          </div>
          <div className="mt-6">
            <Link href="/admin/leads" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Manage Leads &rarr;
            </Link>
          </div>
        </Card>
        
        <Card className="relative overflow-hidden border-white/10 bg-slate-900/70 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/90 hover:border-cyan-500/20 group flex flex-col justify-between">
          <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-500/5 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-2.5 text-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Content health</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400 group-hover:text-slate-300 transition-colors">Blogs and service content are ready for local SEO with keyword-rich titles and meta descriptions.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/admin/blogs" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Blogs &rarr;
            </Link>
            <Link href="/admin/services" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Services &rarr;
            </Link>
            <Link href="/admin/service-areas" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Service Areas &rarr;
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-white/10 bg-slate-900/70 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/90 hover:border-emerald-500/20 group flex flex-col justify-between">
          <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-500/5 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/10 p-2.5 text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Publisher status</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400 group-hover:text-slate-300 transition-colors">The admin portal supports draft content, service editing, and media management for a premium contractor website.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/admin/homepage" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Homepage &rarr;
            </Link>
            <Link href="/admin/gallery" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Gallery &rarr;
            </Link>
            <Link href="/admin/settings" className="inline-flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Settings &rarr;
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

