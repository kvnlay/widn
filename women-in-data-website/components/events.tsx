import Image from "next/image";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

type EventAttributes = {
  title?: string;
  description?: unknown;
  startDate?: string | null;
  endDate?: string | null;
  location?: string;
  isOnline?: boolean;
  registrationUrl?: string;
};

type EventEntry = {
  id: number;
} & EventAttributes;

function formatDateRange(start?: string | null, end?: string | null) {
  if (!start) return "";
  const startDate = new Date(start);
  const startStr = startDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  if (!end) return startStr;
  const endDate = new Date(end);
  const endStr = endDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return `${startStr} – ${endStr}`;
}

function toPlainText(blocks: unknown): string {
  // Strapi blocks -> very simple fallback
  if (!blocks || !Array.isArray(blocks)) return "";
  try {
    return blocks
      .map((block: any) => {
        if (block.type === "paragraph") {
          return block.children?.map((child: any) => child.text).join("") ?? "";
        }
        return "";
      })
      .join("\n")
      .trim();
  } catch {
    return "";
  }
}

async function getEvents(): Promise<EventEntry[]> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(
      `${STRAPI_URL}/api/events?sort=startDate:asc&pagination[pageSize]=6`,
      {
        next: { revalidate: 60 },
        headers,
      },
    );
    if (!res.ok) {
      console.error('Events fetch failed:', res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    return (json.data as EventEntry[]) ?? [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function Events() {
  const events = await getEvents();
  const hasEvents = events.length > 0;
  const [...rest] = events;

  return (
    <section id="events" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Upcoming Events
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
              Learn, connect, and grow together
            </h2>
          </div>
          <Button
            variant="outline"
            className="self-start md:self-auto bg-transparent"
          >
            View All Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {hasEvents ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">

            {/* Other Events */}
            {rest.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/40"
              >
                <div className="flex items-start justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {event.isOnline ? "Online" : "Event"}
                  </Badge>
                </div>
                <h3 className="mt-3 text-lg font-bold text-foreground">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                  {toPlainText(event.description)}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {formatDateRange(
                      event.startDate,
                      event.endDate,
                    )}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {event.location}
                    </span>
                  )}
                </div>
                {event.registrationUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 self-start bg-transparent"
                    asChild
                  >
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn more
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">
            No upcoming events are published yet. As you add events in Strapi,
            they will appear here automatically.
          </p>
        )}
      </div>
    </section>
  );
}
