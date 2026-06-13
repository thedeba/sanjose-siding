import Link from "next/link";
import { Phone, Menu } from "lucide-react";
import { siteConfig } from "../config/site";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-slate-100">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight text-white">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-slate-900 text-lg shadow-lg shadow-cyan-500/20">
            SJ
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((item) => (
            <div key={item.title} className="relative group">
              <Link href={item.href} className="transition hover:text-white">
                {item.title}
              </Link>
              {item.children ? (
                <div className="pointer-events-none absolute left-0 top-full w-52 pt-3 opacity-0 invisible group-hover:pointer-events-auto group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="flex flex-col rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/20">
                    {item.children.map((sub) => (
                      <Link key={sub.title} href={sub.href} className="rounded-2xl px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-900/80 hover:text-white">
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-white">
            <Phone className="h-4 w-4 text-cyan-600 animate-pulse" />
            Call Now: {siteConfig.phone}
          </Link>
        </div>

        <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 text-white lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
