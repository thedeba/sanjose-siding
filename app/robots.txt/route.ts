import { NextResponse } from "next/server";

export function GET() {
  const content = `User-agent: *
Allow: /
Sitemap: ${process.env.SITE_URL ?? "http://localhost:3000"}/sitemap.xml
`;  
  return new NextResponse(content, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
