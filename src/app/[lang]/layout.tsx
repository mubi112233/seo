import type { Metadata } from "next";

const seoData = {
  en: {
    lang: "en",
    title: "DON VA - Premium Virtual Assistants | Save 70% on Operations",
    description:
      "Hire pre-vetted, German-speaking virtual assistants for 80% less than local hires. Scale your team in days, not months.",
    canonical: "https://don-seo.com/en",
  },
  ge: {
    lang: "de",
    title: "DON VA - Premium Virtuelle Assistenten | 70% Kosten sparen",
    description:
      "Stellen Sie geprüfte, deutschsprachige virtuelle Assistenten für 80% weniger als lokale Einstellungen ein. Skalieren Sie Ihr Team in Tagen.",
    canonical: "https://don-seo.com/ge",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const key = resolvedParams.lang === "ge" || resolvedParams.lang === "de" ? "ge" : "en";
  const seo = seoData[key];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
      languages: {
        en: "https://don-seo.com/en",
      de: "https://don-seo.com/ge",
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      locale: key === "ge" ? "de_DE" : "en_US",
      alternateLocale: key === "ge" ? "en_US" : "de_DE",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  return <>{children}</>;
}
