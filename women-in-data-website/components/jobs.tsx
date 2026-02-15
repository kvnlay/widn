import { MapPin, Banknote, Building2, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const jobs = [
  {
    title: "Senior Data Scientist",
    company: "Meridian Health",
    location: "Remote",
    salary: "$140K - $180K",
    type: "Full-time",
    tags: ["Python", "ML", "Healthcare"],
    posted: "2 days ago",
  },
  {
    title: "Data Engineering Lead",
    company: "Bloom Analytics",
    location: "New York, NY",
    salary: "$160K - $200K",
    type: "Full-time",
    tags: ["Spark", "Airflow", "AWS"],
    posted: "3 days ago",
  },
  {
    title: "Analytics Manager",
    company: "Verdant Finance",
    location: "San Francisco, CA",
    salary: "$130K - $165K",
    type: "Full-time",
    tags: ["SQL", "Tableau", "Strategy"],
    posted: "5 days ago",
  },
  {
    title: "ML Engineer",
    company: "NovaTech AI",
    location: "Remote",
    salary: "$150K - $195K",
    type: "Full-time",
    tags: ["PyTorch", "MLOps", "NLP"],
    posted: "1 week ago",
  },
];

export function Jobs() {
  return (
    <section id="jobs" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Job Board
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
              Opportunities at Inclusive Companies
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-lg">
              Curated roles from companies committed to gender equity and diverse
              data teams.
            </p>
          </div>
          <Button variant="outline" className="self-start md:self-auto bg-transparent">
            Browse All Jobs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          {jobs.map((job) => (
            <div
              key={`${job.title}-${job.company}`}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/40 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">
                    {job.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Banknote className="h-3.5 w-3.5" />
                    {job.salary}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {job.posted}
                </span>
                <Button size="sm" className="whitespace-nowrap">
                  Apply
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
