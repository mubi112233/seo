import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en", "/ge", "/blog", "/case-study", "/book-meeting", "/contact"],
        disallow: ["/api/", "/admin/", "/_next/", "/static/"],
      },
    ],
    sitemap: "https://don-seo.com/sitemap.xml",
    host: "https://don-seo.com",
  };
}
