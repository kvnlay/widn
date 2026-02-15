import { ArrowRight, Slack, MessageCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const channels = [
  {
    icon: Slack,
    name: "WhatsApp Community",
    description: "Join 100+ members in real-time discussions, project collabs, and daily support.",
  },
  {
    icon: MessageCircle,
    name: "Discussion Forum",
    description: "Share knowledge, ask questions, and connect through threaded conversations.",
  },
  {
    icon: Globe,
    name: "Local Chapters",
    description: "Find or start a chapter in your city for in-person meetups and events.",
  },
];

export function JoinCTA() {
  return (
    <section id="join" className="py-24 lg:py-32 bg-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
            Join Us
          </p>
          <h2 className="text-3xl font-bold text-background md:text-4xl text-balance">
            Ready to Be Part of Something Bigger?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-background/60">
            Whether you are just starting out or a seasoned leader, there is a
            place for you here. Join our community and help shape the future of
            data.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="rounded-xl border border-background/10 bg-background/5 p-8 text-center transition-all hover:bg-background/10"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                <channel.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-background">
                {channel.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-background/60">
                {channel.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="text-base">
            Join Women in Data
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-4 text-sm text-background/40">
            Free to join. Always will be.
          </p>
        </div>
      </div>
    </section>
  );
}
