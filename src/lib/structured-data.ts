import { Metadata } from "next";

interface BlogStructuredDataProps {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  url: string;
}

export function generateBlogStructuredData({
  title,
  description,
  author,
  publishedAt,
  updatedAt,
  image,
  url,
}: BlogStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "DON VA",
      "url": "https://don-seo.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DON VA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://don-seo.com/logo.png"
      }
    },
    "datePublished": publishedAt,
    "dateModified": updatedAt || publishedAt,
    "image": image,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}

interface ServiceStructuredDataProps {
  serviceName: string;
  description: string;
  provider: string;
  areaServed: string;
  hasOfferCatalog: string;
}

export function generateServiceStructuredData({
  serviceName,
  description,
  provider,
  areaServed,
  hasOfferCatalog,
}: ServiceStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://don-seo.com"
    },
    "areaServed": areaServed,
    "hasOfferCatalog": hasOfferCatalog,
    "serviceType": "Virtual Assistant Services"
  };
}

interface LocalBusinessStructuredDataProps {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address?: string;
}

export function generateLocalBusinessStructuredData({
  name,
  description,
  url,
  telephone,
  email,
  address,
}: LocalBusinessStructuredDataProps) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "email": email,
    "address": address ? {
      "@type": "PostalAddress",
      "addressCountry": "Germany",
      "addressLocality": address
    } : undefined,
    "openingHours": "Mo-Fr 09:00-18:00",
    "availableLanguage": ["English", "German"],
    "serviceArea": "Germany, Austria, Switzerland"
  };
}
