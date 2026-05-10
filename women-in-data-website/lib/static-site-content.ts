/** Local copy used when NEXT_PUBLIC_STRAPI_CMS is not "true". */

export const staticHero = {
  title: "Empowering women to lead in data, together.",
  description:
    "Join a vibrant network of women across data, analytics, and AI. Learn, share, and grow through intentional events, mentorship, and real-world connections.",
  callToActionText: "Join the community",
  callToActionLink: "#join" as const,
  backgroundImageSrc: "/images/widn_hero.webp" as const,
};

function paragraph(text: string) {
  return [
    {
      type: "paragraph" as const,
      children: [{ text }],
    },
  ];
}

export const staticEvents = [
  {
    id: 1,
    title: "Inside Data interviews: Skills, Signals and Common Pitfalls",
    description: paragraph(
      "Join us for a candid conversation with Inside Data, where we'll explore the skills, signals, and common pitfalls that successful data professionals look for. This is a great opportunity to gain insights from industry experts and connect with other women in data.",
    ),
    startDate: "2026-07-10T17:00:00.000Z",
    endDate: "2026-07-10T18:30:00.000Z",
    location: "In Person (Location TBD)",
    isOnline: false,
    registrationUrl: "#join",
  },
  // {
  //   id: 2,
  //   title: "In-person meetup — Toronto",
  //   description: paragraph(
  //     "Casual networking for women in analytics, BI, and ML. New members welcome.",
  //   ),
  //   startDate: "2026-07-03T22:00:00.000Z",
  //   endDate: null,
  //   location: "Toronto, ON",
  //   isOnline: false,
  //   registrationUrl: "#join",
  // },
];

export const staticSpotlights = [
  {
    id: 1,
    name: "Sam Adeyemi",
    role: "Analytics lead",
    quote: paragraph(
      "This community reframed how I think about sponsorship and finding sponsors who really show up.",
    ),
    image: { data: [{ url: "/images/spotlight-1.jpg" }] },
  },
  {
    id: 2,
    name: "Jordan Lee",
    role: "ML engineer",
    quote: paragraph(
      "I found mentors here who understood both the technical bar and the politics of growing in data.",
    ),
    image: { data: [{ url: "/images/spotlight-2.jpg" }] },
  },
  {
    id: 3,
    name: "Priya N.",
    role: "Data strategist",
    quote: paragraph(
      "The events are intentionally small — you actually talk to people instead of sitting in the back row.",
    ),
    image: { data: [{ url: "/images/spotlight-3.jpg" }] },
  },
];

export const staticResources = [
  {
    id: 1,
    title: "SQL foundations refresher",
    type: "article" as const,
    description: paragraph(
      "A practical checklist for joins, window functions, and readable queries — geared toward analytics interviews.",
    ),
    link: "https://www.kaggle.com/learn/intro-to-sql",
    sourceName: "Kaggle Learn",
  },
  {
    id: 2,
    title: "Ethics & fairness in ML",
    type: "video" as const,
    description: paragraph(
      "Short talks on bias, measurement, and accountability — good prep for team discussions.",
    ),
    link: "https://pair.withgoogle.com/",
    sourceName: "Google PAIR",
  },
  {
    id: 3,
    title: "Women in Data podcasts round-up",
    type: "podcast" as const,
    description: paragraph(
      "Community-curated listens on careers, analytics leadership, and switching into data.",
    ),
    link: "#resources",
    sourceName: "Community",
  },
];
