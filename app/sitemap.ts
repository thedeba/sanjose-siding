import { siteConfig } from "../config/site";

export default function sitemap() {
  const routes = [
    "",
    "about",
    "services",
    "service-areas",
    "gallery",
    "blog",
    "faq",
    "reviews",
    "contact",
    "privacy-policy",
    "terms",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}/${route}`.replace(/\/\/$/, "/"),
    lastModified: new Date().toISOString(),
  }));
}
