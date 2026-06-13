"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Layers, 
  Image as ImageIcon, 
  Home, 
  MapPin, 
  Menu, 
  HelpCircle, 
  MessageSquare, 
  Settings, 
  Search 
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Homepage", href: "/admin/homepage", icon: Home },
  { label: "Service Areas", href: "/admin/service-areas", icon: MapPin },
  { label: "Navigation", href: "/admin/navigation", icon: Menu },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0">
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur-xl space-y-2">
        <div className="hidden lg:block mb-2 px-3 py-2 border-b border-white/5">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-400 font-semibold">Menu</p>
        </div>
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 no-scrollbar pb-1 lg:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

