import type { Metadata } from "next";
import { BlogListingClient } from "./BlogListingClient";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const { languages } = hreflangAlternates("blog");
  const canonical = absoluteUrl(`/${seg}/blog`);

  const isDe = seg === "de";
  const title = isDe
    ? "Blog — SEO Tipps & Suchmaschinenoptimierung | DON SEO"
    : "Blog — SEO Tips & Search Engine Optimization | DON SEO";
  const description = isDe
    ? "Einblicke, Tipps und Best Practices zu SEO, technischer Optimierung und Content-Strategie — auf Deutsch."
    : "Insights, tips, and best practices for SEO, technical optimization, and content strategy.";

  return {
    title,
    description,
    keywords: isDe
      ? [
          "SEO Blog",
          "Suchmaschinenoptimierung Tipps",
          "SEO deutsch",
          "Content Strategie",
          "DON SEO",
        ]
      : [
          "SEO blog",
          "search engine optimization tips",
          "technical SEO",
          "content strategy",
          "DON SEO",
        ],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDe ? "de_DE" : "en_US",
      alternateLocale: isDe ? "en_US" : "de_DE",
      siteName: "DON SEO",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DON SEO" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: { index: true, follow: true },
  };
}

export default function BlogPage() {
  return <BlogListingClient />;
}
