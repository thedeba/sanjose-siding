import { Metadata } from "next";
import { siteConfig } from "../config/site";

export type PageMetadataProps = {
  title: string;
  description: string;
  pathname?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  pathname = "/",
  image = "/og-default.png",
}: PageMetadataProps): Metadata {
  const url = `${siteConfig.url}${pathname}`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
