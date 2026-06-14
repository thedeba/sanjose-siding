import Link from "next/link";
import { siteConfig } from "../config/site";
import { Badge } from "./ui/badge";
import { prisma } from "../lib/prisma";

export async function Footer() {
  const settings = await prisma.siteSetting.findUnique({
    where: { id: "site-settings" },
  });

  const companyName = settings?.companyName || siteConfig.name;
  const address = settings?.address || siteConfig.address;
  const email = settings?.email || siteConfig.email;
  const phone = settings?.phone || siteConfig.phone;
  const logo = settings?.logo;

  return (
    <footer className="border-t border-slate-200/10 bg-slate-950/95 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-4">
          <div className="flex items-center gap-3">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={logo} 
                alt={companyName} 
                className="h-12 w-auto max-w-[150px] object-contain rounded-lg"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white font-bold">SJ</div>
            )}
            <div>
              <p className="font-semibold text-white">{companyName}</p>
              <p className="text-sm text-slate-400">San Jose, CA premium siding company.</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-400">Professional siding solutions that protect homes and boost curb appeal across the South Bay.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Quick links</p>
            <ul className="space-y-3 text-sm text-slate-300">
              {siteConfig.nav.slice(0, 5).map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Service areas</p>
            <ul className="space-y-3 text-sm text-slate-300">
              {siteConfig.nav.find((item) => item.title === "Service Areas")?.children?.slice(0, 4).map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contact</p>
            <div className="space-y-3 text-sm text-slate-300">
              <p>{address}</p>
              <Link href={`mailto:${email}`} className="block transition hover:text-white">
                {email}
              </Link>
              <Link href={`tel:${phone}`} className="block transition hover:text-white">
                {phone}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800/70 bg-slate-950/95 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Licensed</Badge>
            <Badge>Insured</Badge>
            <Badge>Local</Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}
