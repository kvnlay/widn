import { Target, Users, BookOpen, Lightbulb } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Community",
    description:
      "A supportive network of women at every stage of their data careers, from students to senior leaders.",
  },
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Workshops, webinars, and resources to keep your skills sharp and stay ahead of industry trends.",
  },
  {
    icon: Target,
    title: "Advocacy",
    description:
      "Championing gender equity in data roles through research, partnerships, and public discourse.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Fostering bold ideas and collaborative projects that push the boundaries of data and AI.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
            Our Mission
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Closing the Gender Gap in Data, One Connection at a Time
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We believe that diverse perspectives drive better data outcomes. Our
            mission is to create an inclusive space where women in data thrive,
            lead, and inspire the next generation.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-xl border border-border bg-background p-8 transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <pillar.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
