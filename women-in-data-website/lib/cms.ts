/**
 * CMS integration: Strapi is opt-in so the site runs fully static by default.
 * Omit `NEXT_PUBLIC_STRAPI_CMS` or set it to anything other than `"true"` to use only
 * local copy in `lib/static-site-content.ts` (hero image: `public/images/hero.jpg`).
 * Set `NEXT_PUBLIC_STRAPI_CMS=true` to fetch hero, events, resources, spotlights, and
 * newsletter subscriptions from Strapi.
 */
export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export function isStrapiCmsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_STRAPI_CMS === "true";
}

/** Strapi serves uploads under /uploads; paths like /images/* are local public files. */
export function resolveMediaUrl(url: string | undefined): string {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return `${STRAPI_URL}${url}`;
  return url;
}
