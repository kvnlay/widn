import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Matched with experienced data professionals based on your goals",
  "Structured 6-month program with monthly check-ins",
  "Access to exclusive workshops and resources for mentees",
  "Peer support groups for shared learning experiences",
  "Career guidance, portfolio reviews, and mock interviews",
  "Network expansion through mentor introductions",
];

export function Mentorship() {
  return (
    <section id="mentorship" className="py-24 lg:py-32 bg-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/mentorship.jpg"
                alt="Two women in a mentorship session reviewing data together"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-primary p-6 shadow-2xl lg:block">
              <p className="text-3xl font-bold text-primary-foreground font-mono">
                93%
              </p>
              <p className="text-sm text-primary-foreground/80">
                of mentees report career growth
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Mentorship Program
            </p>
            <h2 className="text-3xl font-bold text-background md:text-4xl text-balance">
              Grow Your Career with Guided Mentorship
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-background/60">
              Our mentorship program pairs aspiring data professionals with
              seasoned leaders who provide guidance, support, and real-world
              insights to accelerate your career.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-background/80">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg">Apply as Mentee</Button>
              <Button
                size="lg"
                variant="outline"
                className="border-background/30 text-background hover:bg-background/10 bg-transparent"
              >
                Become a Mentor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
