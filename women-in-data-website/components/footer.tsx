import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Community: [
    { label: "About Us", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Mentorship", href: "#mentorship" },
    // { label: "Job Board", href: "#jobs" },
    // { label: "Local Chapters", href: "#" },
  ],
  Resources: [
    { label: "Blog", href: "#resources" },
    { label: "Guides", href: "#resources" },
    { label: "Podcast", href: "#resources" },
    { label: "Webinars", href: "#resources" },
    { label: "Templates", href: "#resources" },
  ],
  Connect: [
    { label: "LinkedIn", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Instagram", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Sponsor Us", href: "#" },
    { label: "Code of Conduct", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/widn_logo.svg"
                alt="Women in Data Network"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-lg font-bold text-foreground">
                Women in Data Network
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A global community empowering women in data science, analytics,
              engineering, and AI through mentorship, events, and resources.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-foreground">{category}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Women in Data. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care for the data community worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
