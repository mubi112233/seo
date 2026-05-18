import Image, { type ImageProps } from "next/image";

const ALLOWED_HOSTS = [
  "api.don-va.com",
  "images.unsplash.com",
  "unsplash.com",
  "sp.yimg.com",
];

function isAllowedHost(src: string): boolean {
  try {
    return ALLOWED_HOSTS.includes(new URL(src).hostname);
  } catch {
    return true; // relative paths are fine
  }
}

export function SafeImage({ src, alt, ...props }: ImageProps) {
  const srcStr = typeof src === "string" ? src : "";
  const unoptimized = srcStr.startsWith("http") && !isAllowedHost(srcStr);
  return <Image src={src} alt={alt} unoptimized={unoptimized} {...props} />;
}
