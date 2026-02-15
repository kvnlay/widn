import {
  ArrowRight,
  BookOpen,
  Video,
  FileText,
  Headphones,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

type ResourceAttributes = {
  title?: string;
  type?: "article" | "podcast" | "tool" | "video" | "community";
  description?: unknown;
  link?: string;
  sourceName?: string;
};

type ResourceEntry = {
  id: number;
} & ResourceAttributes;

function descriptionFromBlocks(blocks: unknown): string {
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

function iconForType(type?: string) {
  switch (type) {
    case "article":
    case "community":
      return BookOpen;
    case "podcast":
      return Headphones;
    case "video":
      return Video;
    case "tool":
    default:
      return FileText;
  }
}

async function getResources(): Promise<ResourceEntry[]> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(
      `${STRAPI_URL}/api/resources?sort=title:asc&pagination[pageSize]=12`,
      {
        next: { revalidate: 120 },
        headers,
      },
    );
    if (!res.ok) {
      console.error('Resources fetch failed:', res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    return (json.data as ResourceEntry[]) ?? [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function Resources() {
  const resources = await getResources();

  return (
    <section id="resources" className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
            Resources & Learning
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Level Up Your Data Skills
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Free guides, tutorials, webinars, and tools curated by our community
            of data professionals.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No resources have been published yet. As you add articles,
              podcasts, tools, and more in Strapi, they will show up here
              automatically.
            </p>
          ) : (
            resources.map((item) => {
              const Icon = iconForType(item.type);
              const description = descriptionFromBlocks(item.description);

              return (
                <article
                  key={item.id}
                  className="group flex flex-col rounded-xl border border-border bg-background p-6 transition-all hover:shadow-lg hover:border-primary/40 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {item.type ?? "Resource"}
                      </span>
                    </div>
                    {item.sourceName && (
                      <Badge variant="secondary" className="text-xs">
                        {item.sourceName}
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                    {description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                    >
                      Open resource
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
