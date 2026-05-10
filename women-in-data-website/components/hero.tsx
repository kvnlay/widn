import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isStrapiCmsEnabled, resolveMediaUrl } from "@/lib/cms";
import { staticHero } from "@/lib/static-site-content";

type HeroAttributes = {
  title?: string;
  description?: string;
  callToActionText?: string;
  callToActionLink?: string;
  backgroundImage?: {
    data?: {
      url?: string;
    } | null;
    url?: string;
  };
};

/** Only called when `NEXT_PUBLIC_STRAPI_CMS=true`; otherwise `Hero` uses `staticHero`. */
async function getHeroSection(): Promise<HeroAttributes | null> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
    const res = await fetch(
      `${strapiUrl}/api/hero-section?populate=backgroundImage`,
      {
        next: { revalidate: 60 },
        headers,
      },
    );
    if (!res.ok) {
      console.error('Hero fetch failed:', res.status, res.statusText);
      return null;
    }
    const json = await res.json();
    // Strapi single type response: { data: {...} } where data contains the attributes directly
    return (json.data as HeroAttributes) ?? null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function Hero() {
  const hero = isStrapiCmsEnabled() ? await getHeroSection() : null;

  const title = hero?.title ?? staticHero.title;
  const description = hero?.description ?? staticHero.description;
  const ctaText = hero?.callToActionText ?? staticHero.callToActionText;
  const ctaLink = hero?.callToActionLink ?? staticHero.callToActionLink;
  const rawBg =
    hero?.backgroundImage?.data?.url ?? hero?.backgroundImage?.url;
  const backgroundUrl = rawBg
    ? resolveMediaUrl(rawBg)
    : staticHero.backgroundImageSrc;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundUrl}
          alt="Women in data connecting at an event"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:py-40">
        <div>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
            A community for women in data
          </p>
          <h1 className="text-4xl font-bold leading-tight text-background md:text-6xl lg:text-7xl text-balance">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/80">
            {description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="text-base" asChild>
              <Link href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base border-background/30 text-background hover:bg-background/10 bg-transparent"
              asChild
            >
              <Link href="#about">Learn more about the community</Link>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="text-3xl font-bold text-background font-mono">
                100%
              </p>
              <p className="text-sm text-background/60">
                Centred on women in data
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-background font-mono">
                Events
              </p>
              <p className="text-sm text-background/60">
                Intentional, intimate, and practical
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-background font-mono">
                Mentors
              </p>
              <p className="text-sm text-background/60">
                Real stories from real careers
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-background font-mono">
                Resources
              </p>
              <p className="text-sm text-background/60">
                Curated for women in data roles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
