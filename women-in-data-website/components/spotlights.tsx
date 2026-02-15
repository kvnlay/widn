import Image from "next/image";
import { Quote } from "lucide-react";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

type SpotlightAttributes = {
  name?: string;
  role?: string;
  image?: {
    data?: Array<{
      url?: string;
      attributes?: {
        url?: string;
      };
    }> | null;
  };
  quote?: unknown;
};

type SpotlightEntry = {
  id: number;
} & SpotlightAttributes;

function quoteFromBlocks(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  try {
    return blocks
      .map((block: any) => {
        if (block.type === "paragraph") {
          return block.children?.map((child: any) => child.text).join("") ?? "";
        }
        return "";
      })
      .join(" ")
      .trim();
  } catch {
    return "";
  }
}

async function getSpotlights(): Promise<SpotlightEntry[]> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(
      `${STRAPI_URL}/api/spotlights?populate=image&sort=createdAt:desc&pagination[pageSize]=6`,
      {
        next: { revalidate: 60 },
        headers,
      },
    );
    if (!res.ok) {
      console.error('Spotlights fetch failed:', res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    return (json.data as SpotlightEntry[]) ?? [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function Spotlights() {
  const spotlights = await getSpotlights();

  return (
    <section id="spotlights" className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
            Member Spotlights
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Voices from Our Community
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Hear from the women who are shaping the future of data and making an
            impact every day.
          </p>
        </div>

        {spotlights.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground">
            <p>No spotlights available at the moment.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {spotlights.map((person) => {
              const imageData = person.image?.data?.[0];
              const imageUrl = imageData?.url ?? imageData?.attributes?.url
                ? `${STRAPI_URL}${imageData.url ?? imageData.attributes?.url}`
                : "/placeholder.svg";
              const quote = quoteFromBlocks(person.quote);

              return (
                <div
                  key={person.id}
                  className="group flex flex-col rounded-xl border border-border bg-background p-8 transition-all hover:shadow-lg hover:border-primary/40"
                >
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <blockquote className="text-sm leading-relaxed text-muted-foreground flex-1">
                    {quote ? `"${quote}"` : ""}
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={imageUrl}
                        alt={`Portrait of ${person.name || "Community member"}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{person.name || "Community Member"}</p>
                      <p className="text-xs text-muted-foreground">{person.role || ""}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
