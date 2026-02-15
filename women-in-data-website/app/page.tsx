import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Events } from "@/components/events";
import { Mentorship } from "@/components/mentorship";
import { Resources } from "@/components/resources";
import { Jobs } from "@/components/jobs";
import { Spotlights } from "@/components/spotlights";
import { Newsletter } from "@/components/newsletter";
import { JoinCTA } from "@/components/join-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Events />
      {/* <Mentorship /> */}
      <Resources />
      {/* <Jobs /> */}
      <Spotlights />
      <Newsletter />
      <JoinCTA />
      <Footer />
    </main>
  );
}
