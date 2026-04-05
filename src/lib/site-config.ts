export type SiteLocale = "en" | "ge";

export interface SiteConfig {
  brandName: string;
  brandMarkText: string;
  defaultLocale: SiteLocale;
  apiBase: string;
  tenantId: string;
  routes: {
    bookMeeting: string;
    contact: string;
    blog: string;
  };
  external: {
    whatsappNumber?: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: "SEO Pro",
  brandMarkText: "S",
  defaultLocale: "en",
  apiBase: process.env.NEXT_PUBLIC_API_BASE || "https://api.don-va.com",
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID || "socal_media_agency",
  routes: {
    bookMeeting: "/book-meeting",
    contact: "/contact",
    blog: "/blog",
  },
  external: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  },
};

export const normalizeLocale = (locale: string): SiteLocale => {
  const raw = (locale || "").toLowerCase();
  if (raw.startsWith("ge") || raw.startsWith("de")) return "ge";
  return "en";
};

export const localizedPath = (locale: SiteLocale, pathname: string): string => {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${clean}`;
};

export const getWhatsAppUrl = (number?: string): string | null => {
  if (!number) return null;
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
};
