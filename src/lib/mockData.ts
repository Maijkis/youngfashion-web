// ——— Type Definitions ———

export interface Designer {
  id: string;
  name: string;
  year: 2022 | 2023 | 2024 | 2025;
  image: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
}

export interface PressArticle {
  id: string;
  title: string;
  publication: string;
  date: string;
  link: string;
  excerpt: string;
  thumbnail: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  type: "runway" | "pop-up" | "workshop" | "dinner" | "other";
  date: string;
  description: string;
  images: string[];
  upcoming?: boolean;
  location?: string;
  longDescription?: string;
  sponsors?: Sponsor[];
  galleryPhotos?: string[];
}

export interface BtsPhoto {
  id: string;
  src: string;
  alt: string;
  year: 2022 | 2023 | 2024 | 2025;
}

// ——— Mock Data ———

export const designers: Designer[] = [
  {
    id: "d1",
    name: "Karina Panina",
    year: 2025,
    image: "/events/2022/DSC_6387.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
  {
    id: "d2",
    name: "Valdemara Jasulaitytė",
    year: 2025,
    image: "/events/2022/DSC_6412.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
  {
    id: "d3",
    name: "Emilija Bilevičiūtė",
    year: 2025,
    image: "/events/2022/DSC_6423.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
  {
    id: "d4",
    name: "Liutauras Suvorovas",
    year: 2025,
    image: "/events/2022/DSC_6439.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
  {
    id: "d5",
    name: "Aušrinė Kepežinskaitė",
    year: 2025,
    image: "/events/2022/DSC_6456.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
  {
    id: "d6",
    name: "Adelė Burokaitė",
    year: 2025,
    image: "/events/2022/DSC_6458.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
  {
    id: "d7",
    name: "Margarita Stračkaitytė",
    year: 2025,
    image: "/events/2022/DSC_6460.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
  {
    id: "d8",
    name: "Kamilė Ginelevičiūtė",
    year: 2025,
    image: "/events/2022/DSC_6462.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
  {
    id: "d9",
    name: "Jomilė Balvočiūtė",
    year: 2025,
    image: "/events/2022/DSC_6491.jpg",
    description:
      "Young Fashion 2025 designer — presented at K2 Comedy Club closing Vilnius Fashion Week.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Nerija Kanapkaitė",
    role: "Team Member",
    image: "/behind-the-scenes/2025/IMG_0005.jpg",
  },
  {
    id: "t2",
    name: "Žygimantas Juška",
    role: "Team Member",
    image: "/behind-the-scenes/2025/IMG_0008.jpg",
  },
  {
    id: "t3",
    name: "Rusnė Butrimaitė",
    role: "Team Member",
    image: "/behind-the-scenes/2025/IMG_0014.jpg",
  },
  {
    id: "t4",
    name: "Jonas Latoža",
    role: "Team Member",
    image: "/behind-the-scenes/2025/IMG_0020.jpg",
  },
  {
    id: "t5",
    name: "Ąžuolas Stabingis",
    role: "Team Member",
    image: "/behind-the-scenes/2025/IMG_0031.jpg",
  },
  {
    id: "t6",
    name: "Karolis Danys",
    role: "Team Member",
    image: "/behind-the-scenes/2025/IMG_0037.jpg",
  },
];

// ——— Sponsors & Partners ———

export const sponsors2026: Sponsor[] = [
  { id: "s1", name: "Jung", logo: "https://placehold.co/200x80/111/fff?text=Jung" },
  { id: "s2", name: "Make Up Forever", logo: "https://placehold.co/200x80/111/fff?text=Make+Up+Forever" },
  { id: "s3", name: "Keune", logo: "https://placehold.co/200x80/111/fff?text=Keune" },
  { id: "s4", name: "Femina Bona", logo: "https://placehold.co/200x80/111/fff?text=Femina+Bona" },
  { id: "s5", name: "Akvilė", logo: "https://placehold.co/200x80/111/fff?text=Akvil%C4%97" },
  { id: "s6", name: "1664 Kronenbourg", logo: "https://placehold.co/200x80/111/fff?text=1664+Kronenbourg" },
];

export const infoPartners: Sponsor[] = [
  { id: "ip1", name: "ELLE Lithuania", logo: "https://placehold.co/200x80/111/fff?text=ELLE" },
  { id: "ip2", name: "Delfi", logo: "https://placehold.co/200x80/111/fff?text=Delfi" },
  { id: "ip3", name: "Piksel", logo: "https://placehold.co/200x80/111/fff?text=Piksel" },
];

export const pastPartners: Sponsor[] = [
  { id: "pp1", name: "ELLE Lithuania", logo: "https://placehold.co/200x80/111/fff?text=ELLE" },
  { id: "pp2", name: "Delfi", logo: "https://placehold.co/200x80/111/fff?text=Delfi" },
  { id: "pp3", name: "Piksel", logo: "https://placehold.co/200x80/111/fff?text=Piksel" },
  { id: "pp4", name: "Jung", logo: "https://placehold.co/200x80/111/fff?text=Jung" },
  { id: "pp5", name: "Make Up Forever", logo: "https://placehold.co/200x80/111/fff?text=Make+Up+Forever" },
];

export const pressArticles: PressArticle[] = [
  {
    id: "p1",
    title: "Young Fashion Puts Vilnius on the European Design Map",
    publication: "Vogue Scandinavia",
    date: "2024-09-15",
    link: "#",
    excerpt:
      "The annual showcase has quickly become a must-watch event for scouts seeking fresh talent from the Baltics.",
    thumbnail: "/events/2022/DSC_6491.jpg",
  },
  {
    id: "p2",
    title: "Sustainability Meets Style at Young Fashion 2023",
    publication: "Dezeen",
    date: "2023-11-02",
    link: "#",
    excerpt:
      "This year's edition proved that eco-conscious design and high-fashion aesthetics are not mutually exclusive.",
    thumbnail: "/behind-the-scenes/2025/IMG_0076.jpg",
  },
  {
    id: "p3",
    title: "The Rise of Baltic Fashion: A New Generation",
    publication: "i-D Magazine",
    date: "2023-06-20",
    link: "#",
    excerpt:
      "From Vilnius to the world — how a grassroots platform is nurturing the next wave of European designers.",
    thumbnail: "/behind-the-scenes/2025/IMG_0082.jpg",
  },
  {
    id: "p4",
    title: "Young Fashion 2022: A Bold Debut",
    publication: "Hypebeast",
    date: "2022-10-08",
    link: "#",
    excerpt:
      "The inaugural edition delivered an electrifying mix of streetwear, couture, and experimental design.",
    thumbnail: "/events/2022/DSC_6382.jpg",
  },
];

// ——— Events: Real Timeline ———

export const events: EventItem[] = [
  // 2026 — Upcoming (5th edition)
  {
    id: "e-upcoming",
    slug: "young-fashion-2026",
    title: "Young Fashion 2026",
    type: "runway",
    date: "2026-09-01",
    description:
      "The fifth edition of Young Fashion is coming September 2026. Stay tuned for our biggest and most ambitious event yet.",
    images: [
      "/behind-the-scenes/2025/IMG_0160.jpg",
    ],
    upcoming: true,
    location: "Vilnius, Lithuania",
    longDescription:
      "Young Fashion 2026 is currently in development and will continue the platform's mission of spotlighting emerging fashion talent in Vilnius. The fifth edition will build on four years of runway shows, workshops, and community-building.",
  },
  // 2025 — 4th edition
  {
    id: "e-2025",
    slug: "young-fashion-2025-closing-vilnius-fashion-week",
    title: "Young Fashion 2025 — Closing of Vilnius Fashion Week",
    type: "runway",
    date: "2025-09-06",
    description:
      "The fourth edition of Young Fashion officially closed Vilnius Fashion Week. The program featured a 'Future of Fashion' discussion with Odeta Jace and presentations by nine emerging designers.",
    images: [
      "/behind-the-scenes/2025/IMG_0170.jpg",
    ],
    location: "K2 Comedy Club, A. Goštauto g. 25, Vilnius",
    longDescription:
      "Young Fashion 2025 closed Vilnius Fashion Week on September 6 at K2 Comedy Club. The evening featured a 'Future of Fashion' discussion with Odeta Jace followed by collections from Karina Panina, Valdemara Jasulaitytė, Emilija Bilevičiūtė, Liutauras Suvorovas, Aušrinė Kepežinskaitė, Adelė Burokaitė, Margarita Stračkaitytė, Kamilė Ginelevičiūtė, and Jomilė Balvočiūtė.",
    sponsors: [
      { id: "ev25-s1", name: "Jung", logo: "https://placehold.co/320x120/111/fff?text=Jung" },
      { id: "ev25-s2", name: "Make Up Forever", logo: "https://placehold.co/320x120/111/fff?text=Make+Up+Forever" },
      { id: "ev25-s3", name: "Keune", logo: "https://placehold.co/320x120/111/fff?text=Keune" },
      { id: "ev25-s4", name: "Femina Bona", logo: "https://placehold.co/320x120/111/fff?text=Femina+Bona" },
      { id: "ev25-s5", name: "Akvilė", logo: "https://placehold.co/320x120/111/fff?text=Akvil%C4%97" },
      { id: "ev25-s6", name: "1664 Kronenbourg", logo: "https://placehold.co/320x120/111/fff?text=1664+Kronenbourg" },
    ],
  },
  // 2023
  {
    id: "e-2024-workshop",
    slug: "young-fashion-workshop-2024",
    title: "Young Fashion Workshop",
    type: "workshop",
    date: "2024-03-15",
    description:
      "Young Fashion expanded beyond the runway with a dedicated workshop focused on creative development, process, and emerging designer support.",
    images: [
      "/behind-the-scenes/2025/IMG_0182.jpg",
    ],
    location: "Vilnius, Lithuania",
    longDescription:
      "The Young Fashion Workshop created a more intimate educational format, giving participants hands-on insight into creative process, development, and the realities of building a practice as an emerging designer.",
  },
  {
    id: "e-2024-popup",
    slug: "young-fashion-sample-research-pop-up-2024",
    title: "Young Fashion x Sample Research Pop-Up",
    type: "pop-up",
    date: "2024-06-10",
    description:
      "A special collaborative pop-up with Sample Research, bringing fashion, community, and experimental retail together in Vilnius.",
    images: [
      "/behind-the-scenes/2025/IMG_0201.jpg",
    ],
    location: "Vilnius, Lithuania",
    longDescription:
      "This collaborative pop-up with Sample Research expanded Young Fashion into a retail and community experience, presenting emerging design in a more direct, public-facing format.",
  },
  {
    id: "e-2024-runway",
    slug: "young-fashion-2024-national-art-gallery",
    title: "Young Fashion 2024 — National Art Gallery",
    type: "runway",
    date: "2024-10-12",
    description:
      "The main runway show at the National Art Gallery marked Young Fashion's most ambitious edition yet, placing emerging design in one of Vilnius's most important cultural spaces.",
    images: [
      "/events/2022/DSC_6453 2.jpg",
    ],
    location: "National Art Gallery, Vilnius",
    longDescription:
      "With the National Art Gallery as its backdrop, the 2024 runway show elevated Young Fashion's cultural presence and framed emerging collections within one of the city's strongest institutional settings.",
  },
  // 2023
  {
    id: "e-2023",
    slug: "young-fashion-2023-second-event",
    title: "Young Fashion 2023 — The Second Event",
    type: "runway",
    date: "2023-10-08",
    description:
      "The second Young Fashion event built on the momentum of the debut and further established the platform within Vilnius's creative scene.",
    images: [
      "/events/2022/DSC_6426 2.jpg",
    ],
    location: "Vilnius, Lithuania",
    longDescription:
      "The second edition of Young Fashion expanded the platform's reach and confirmed the appetite for a dedicated space focused on emerging fashion voices in Vilnius.",
  },
  // 2022
  {
    id: "e-2022",
    slug: "young-fashion-2022-the-beginning",
    title: "Young Fashion 2022 — The Beginning",
    type: "other",
    date: "2022-10-15",
    description:
      "The very first Young Fashion event. A bold beginning that introduced the platform and laid the foundation for its future editions.",
    images: [
      "/events/2022/04AA7123-1CD6-43FA-8A52-B54BEDA7A644.JPG",
    ],
    location: "Vilnius, Lithuania",
    longDescription:
      "Young Fashion 2022 marked the beginning of the platform. The first event introduced the identity, atmosphere, and ambition behind Young Fashion, setting the tone for the editions that followed.",
    sponsors: [
      {
        id: "ev22-s1",
        name: "Vilnius Creative Community",
        logo: "https://placehold.co/320x120/111/fff?text=Vilnius+Creative+Community",
      },
      {
        id: "ev22-s2",
        name: "Young Talent Support",
        logo: "https://placehold.co/320x120/111/fff?text=Young+Talent+Support",
      },
      {
        id: "ev22-s3",
        name: "Baltic Fashion Network",
        logo: "https://placehold.co/320x120/111/fff?text=Baltic+Fashion+Network",
      },
    ],
    galleryPhotos: [
      "/events/2022/04AA7123-1CD6-43FA-8A52-B54BEDA7A644.JPG",
      "/events/2022/1299A90B-EE78-48A1-A0D4-04B62EFDB372.JPG",
      "/events/2022/1B3CDFB0-3B7A-4537-B50D-A08B3B4D1830 2.JPG",
      "/events/2022/1B3CDFB0-3B7A-4537-B50D-A08B3B4D1830.JPG",
      "/events/2022/3019608F-3E4C-48A0-8565-22F4C845E62D.JPG",
      "/events/2022/42A626E1-E0C7-45BB-9FE5-2514AB9BFBFF.JPG",
      "/events/2022/65E00EF9-75EA-406B-A55A-70E39D409CFA 2.JPG",
      "/events/2022/65F48F2C-2E58-4A12-B63C-3F26A618D0F0.JPG",
      "/events/2022/80DF0C57-2BCC-48C4-A5B7-11D82DA81771.JPG",
      "/events/2022/C117A669-C352-4774-B4D6-EBFC55A32E39 3.JPG",
      "/events/2022/DSC_6382.jpg",
      "/events/2022/DSC_6387.jpg",
      "/events/2022/DSC_6412.jpg",
      "/events/2022/DSC_6421.jpg",
      "/events/2022/DSC_6423.jpg",
      "/events/2022/DSC_6426 2.jpg",
      "/events/2022/DSC_6436.jpg",
      "/events/2022/DSC_6439.jpg",
      "/events/2022/DSC_6453 2.jpg",
      "/events/2022/DSC_6456.jpg",
      "/events/2022/DSC_6458.jpg",
      "/events/2022/DSC_6460.jpg",
      "/events/2022/DSC_6462.jpg",
      "/events/2022/DSC_6491.jpg",
      "/events/2022/IMG_5010 2.JPG",
    ],
  },
];

export const btsPhotos: BtsPhoto[] = [
  { id: "b1", src: "/behind-the-scenes/2025/IMG_0086.jpg", alt: "Backstage preparations", year: 2025 },
  { id: "b2", src: "/behind-the-scenes/2025/IMG_0095.jpg", alt: "Model fitting session", year: 2025 },
  { id: "b3", src: "/behind-the-scenes/2025/IMG_0105.jpg", alt: "Runway rehearsal", year: 2024 },
  { id: "b4", src: "/behind-the-scenes/2025/IMG_0134.jpg", alt: "Designer at work", year: 2024 },
  { id: "b5", src: "/behind-the-scenes/2025/IMG_0139.jpg", alt: "Behind the curtain", year: 2023 },
  { id: "b6", src: "/behind-the-scenes/2025/IMG_0169.jpg", alt: "Makeup station", year: 2023 },
  { id: "b7", src: "/behind-the-scenes/2025/IMG_0174.jpg", alt: "Final touches before show", year: 2022 },
  { id: "b8", src: "/behind-the-scenes/2025/IMG_0210.jpg", alt: "Crowd at the venue", year: 2022 },
];

export const photowallPhotos2025: BtsPhoto[] = [
  { id: "pw25-1", src: "/photowall/2025/KristinaPetrikonyte-4184835.jpg", alt: "Young Fashion 2025 photowall guest portrait 1", year: 2025 },
  { id: "pw25-2", src: "/photowall/2025/KristinaPetrikonyte-4184873.jpg", alt: "Young Fashion 2025 photowall guest portrait 2", year: 2025 },
  { id: "pw25-3", src: "/photowall/2025/KristinaPetrikonyte-4184878.jpg", alt: "Young Fashion 2025 photowall guest portrait 3", year: 2025 },
  { id: "pw25-4", src: "/photowall/2025/KristinaPetrikonyte-4184880.jpg", alt: "Young Fashion 2025 photowall guest portrait 4", year: 2025 },
  { id: "pw25-5", src: "/photowall/2025/KristinaPetrikonyte-4184885.jpg", alt: "Young Fashion 2025 photowall guest portrait 5", year: 2025 },
  { id: "pw25-6", src: "/photowall/2025/KristinaPetrikonyte-4184894.jpg", alt: "Young Fashion 2025 photowall guest portrait 6", year: 2025 },
  { id: "pw25-7", src: "/photowall/2025/KristinaPetrikonyte-4184904.jpg", alt: "Young Fashion 2025 photowall guest portrait 7", year: 2025 },
  { id: "pw25-8", src: "/photowall/2025/KristinaPetrikonyte-4184910.jpg", alt: "Young Fashion 2025 photowall guest portrait 8", year: 2025 },
  { id: "pw25-9", src: "/photowall/2025/KristinaPetrikonyte-4184921.jpg", alt: "Young Fashion 2025 photowall guest portrait 9", year: 2025 },
  { id: "pw25-10", src: "/photowall/2025/KristinaPetrikonyte-4184929.jpg", alt: "Young Fashion 2025 photowall guest portrait 10", year: 2025 },
  { id: "pw25-11", src: "/photowall/2025/KristinaPetrikonyte-4184932.jpg", alt: "Young Fashion 2025 photowall guest portrait 11", year: 2025 },
  { id: "pw25-12", src: "/photowall/2025/KristinaPetrikonyte-4184936.jpg", alt: "Young Fashion 2025 photowall guest portrait 12", year: 2025 },
  { id: "pw25-13", src: "/photowall/2025/KristinaPetrikonyte-4184946.jpg", alt: "Young Fashion 2025 photowall guest portrait 13", year: 2025 },
  { id: "pw25-14", src: "/photowall/2025/KristinaPetrikonyte-4184951.jpg", alt: "Young Fashion 2025 photowall guest portrait 14", year: 2025 },
  { id: "pw25-15", src: "/photowall/2025/KristinaPetrikonyte-4184955.jpg", alt: "Young Fashion 2025 photowall guest portrait 15", year: 2025 },
  { id: "pw25-16", src: "/photowall/2025/KristinaPetrikonyte-4184959.jpg", alt: "Young Fashion 2025 photowall guest portrait 16", year: 2025 },
  { id: "pw25-17", src: "/photowall/2025/KristinaPetrikonyte-4184968.jpg", alt: "Young Fashion 2025 photowall guest portrait 17", year: 2025 },
  { id: "pw25-18", src: "/photowall/2025/KristinaPetrikonyte-4184970.jpg", alt: "Young Fashion 2025 photowall guest portrait 18", year: 2025 },
  { id: "pw25-19", src: "/photowall/2025/KristinaPetrikonyte-4184977.jpg", alt: "Young Fashion 2025 photowall guest portrait 19", year: 2025 },
  { id: "pw25-20", src: "/photowall/2025/KristinaPetrikonyte-4184987.jpg", alt: "Young Fashion 2025 photowall guest portrait 20", year: 2025 },
  { id: "pw25-21", src: "/photowall/2025/KristinaPetrikonyte-4184989.jpg", alt: "Young Fashion 2025 photowall guest portrait 21", year: 2025 },
  { id: "pw25-22", src: "/photowall/2025/KristinaPetrikonyte-4184995.jpg", alt: "Young Fashion 2025 photowall guest portrait 22", year: 2025 },
  { id: "pw25-23", src: "/photowall/2025/KristinaPetrikonyte-4185003.jpg", alt: "Young Fashion 2025 photowall guest portrait 23", year: 2025 },
  { id: "pw25-24", src: "/photowall/2025/KristinaPetrikonyte-4185008.jpg", alt: "Young Fashion 2025 photowall guest portrait 24", year: 2025 },
  { id: "pw25-25", src: "/photowall/2025/KristinaPetrikonyte-4185015.jpg", alt: "Young Fashion 2025 photowall guest portrait 25", year: 2025 },
  { id: "pw25-26", src: "/photowall/2025/KristinaPetrikonyte-4185021.jpg", alt: "Young Fashion 2025 photowall guest portrait 26", year: 2025 },
  { id: "pw25-27", src: "/photowall/2025/KristinaPetrikonyte-4185024.jpg", alt: "Young Fashion 2025 photowall guest portrait 27", year: 2025 },
  { id: "pw25-28", src: "/photowall/2025/KristinaPetrikonyte-4185030.jpg", alt: "Young Fashion 2025 photowall guest portrait 28", year: 2025 },
  { id: "pw25-29", src: "/photowall/2025/KristinaPetrikonyte-4185048.jpg", alt: "Young Fashion 2025 photowall guest portrait 29", year: 2025 },
  { id: "pw25-30", src: "/photowall/2025/KristinaPetrikonyte-4185075.jpg", alt: "Young Fashion 2025 photowall guest portrait 30", year: 2025 },
  { id: "pw25-31", src: "/photowall/2025/KristinaPetrikonyte-4185078.jpg", alt: "Young Fashion 2025 photowall guest portrait 31", year: 2025 },
  { id: "pw25-32", src: "/photowall/2025/KristinaPetrikonyte-4185089.jpg", alt: "Young Fashion 2025 photowall guest portrait 32", year: 2025 },
  { id: "pw25-33", src: "/photowall/2025/KristinaPetrikonyte-4185095.jpg", alt: "Young Fashion 2025 photowall guest portrait 33", year: 2025 },
  { id: "pw25-34", src: "/photowall/2025/KristinaPetrikonyte-4185108.jpg", alt: "Young Fashion 2025 photowall guest portrait 34", year: 2025 },
  { id: "pw25-35", src: "/photowall/2025/KristinaPetrikonyte-4185116.jpg", alt: "Young Fashion 2025 photowall guest portrait 35", year: 2025 },
  { id: "pw25-36", src: "/photowall/2025/KristinaPetrikonyte-4185122.jpg", alt: "Young Fashion 2025 photowall guest portrait 36", year: 2025 },
  { id: "pw25-37", src: "/photowall/2025/KristinaPetrikonyte-4185132.jpg", alt: "Young Fashion 2025 photowall guest portrait 37", year: 2025 },
  { id: "pw25-38", src: "/photowall/2025/KristinaPetrikonyte-4185136.jpg", alt: "Young Fashion 2025 photowall guest portrait 38", year: 2025 },
  { id: "pw25-39", src: "/photowall/2025/KristinaPetrikonyte-4185139.jpg", alt: "Young Fashion 2025 photowall guest portrait 39", year: 2025 },
  { id: "pw25-40", src: "/photowall/2025/KristinaPetrikonyte-4185155.jpg", alt: "Young Fashion 2025 photowall guest portrait 40", year: 2025 },
  { id: "pw25-41", src: "/photowall/2025/KristinaPetrikonyte-4185165.jpg", alt: "Young Fashion 2025 photowall guest portrait 41", year: 2025 },
  { id: "pw25-42", src: "/photowall/2025/KristinaPetrikonyte-4185171.jpg", alt: "Young Fashion 2025 photowall guest portrait 42", year: 2025 },
  { id: "pw25-43", src: "/photowall/2025/KristinaPetrikonyte-4185176.jpg", alt: "Young Fashion 2025 photowall guest portrait 43", year: 2025 },
  { id: "pw25-44", src: "/photowall/2025/KristinaPetrikonyte-4185181.jpg", alt: "Young Fashion 2025 photowall guest portrait 44", year: 2025 },
  { id: "pw25-45", src: "/photowall/2025/KristinaPetrikonyte-4185191.jpg", alt: "Young Fashion 2025 photowall guest portrait 45", year: 2025 },
  { id: "pw25-46", src: "/photowall/2025/KristinaPetrikonyte-4185200.jpg", alt: "Young Fashion 2025 photowall guest portrait 46", year: 2025 },
  { id: "pw25-47", src: "/photowall/2025/KristinaPetrikonyte-4185205.jpg", alt: "Young Fashion 2025 photowall guest portrait 47", year: 2025 },
  { id: "pw25-48", src: "/photowall/2025/KristinaPetrikonyte-4185212.jpg", alt: "Young Fashion 2025 photowall guest portrait 48", year: 2025 },
  { id: "pw25-49", src: "/photowall/2025/KristinaPetrikonyte-4185215.jpg", alt: "Young Fashion 2025 photowall guest portrait 49", year: 2025 },
  { id: "pw25-50", src: "/photowall/2025/KristinaPetrikonyte-4185221.jpg", alt: "Young Fashion 2025 photowall guest portrait 50", year: 2025 },
  { id: "pw25-51", src: "/photowall/2025/KristinaPetrikonyte-4185224.jpg", alt: "Young Fashion 2025 photowall guest portrait 51", year: 2025 },
  { id: "pw25-52", src: "/photowall/2025/KristinaPetrikonyte-4206834.jpg", alt: "Young Fashion 2025 photowall guest portrait 52", year: 2025 },
  { id: "pw25-53", src: "/photowall/2025/KristinaPetrikonyte-4206838.jpg", alt: "Young Fashion 2025 photowall guest portrait 53", year: 2025 },
  { id: "pw25-54", src: "/photowall/2025/KristinaPetrikonyte-4206842.jpg", alt: "Young Fashion 2025 photowall guest portrait 54", year: 2025 },
  { id: "pw25-55", src: "/photowall/2025/KristinaPetrikonyte-4206852.jpg", alt: "Young Fashion 2025 photowall guest portrait 55", year: 2025 },
  { id: "pw25-56", src: "/photowall/2025/KristinaPetrikonyte-4206859.jpg", alt: "Young Fashion 2025 photowall guest portrait 56", year: 2025 },
  { id: "pw25-57", src: "/photowall/2025/KristinaPetrikonyte-4206868.jpg", alt: "Young Fashion 2025 photowall guest portrait 57", year: 2025 },
];

export const behindTheScenesPhotos2025: BtsPhoto[] = [
  { id: "bts25-1", src: "/behind-the-scenes/2025/IMG_0005.jpg", alt: "Young Fashion 2025 behind the scenes photo 1", year: 2025 },
  { id: "bts25-2", src: "/behind-the-scenes/2025/IMG_0008.jpg", alt: "Young Fashion 2025 behind the scenes photo 2", year: 2025 },
  { id: "bts25-3", src: "/behind-the-scenes/2025/IMG_0014.jpg", alt: "Young Fashion 2025 behind the scenes photo 3", year: 2025 },
  { id: "bts25-4", src: "/behind-the-scenes/2025/IMG_0020.jpg", alt: "Young Fashion 2025 behind the scenes photo 4", year: 2025 },
  { id: "bts25-5", src: "/behind-the-scenes/2025/IMG_0031.jpg", alt: "Young Fashion 2025 behind the scenes photo 5", year: 2025 },
  { id: "bts25-6", src: "/behind-the-scenes/2025/IMG_0037.jpg", alt: "Young Fashion 2025 behind the scenes photo 6", year: 2025 },
  { id: "bts25-7", src: "/behind-the-scenes/2025/IMG_0049.jpg", alt: "Young Fashion 2025 behind the scenes photo 7", year: 2025 },
  { id: "bts25-8", src: "/behind-the-scenes/2025/IMG_0076.jpg", alt: "Young Fashion 2025 behind the scenes photo 8", year: 2025 },
  { id: "bts25-9", src: "/behind-the-scenes/2025/IMG_0082.jpg", alt: "Young Fashion 2025 behind the scenes photo 9", year: 2025 },
  { id: "bts25-10", src: "/behind-the-scenes/2025/IMG_0086.jpg", alt: "Young Fashion 2025 behind the scenes photo 10", year: 2025 },
  { id: "bts25-11", src: "/behind-the-scenes/2025/IMG_0095.jpg", alt: "Young Fashion 2025 behind the scenes photo 11", year: 2025 },
  { id: "bts25-12", src: "/behind-the-scenes/2025/IMG_0105.jpg", alt: "Young Fashion 2025 behind the scenes photo 12", year: 2025 },
  { id: "bts25-13", src: "/behind-the-scenes/2025/IMG_0115.jpg", alt: "Young Fashion 2025 behind the scenes photo 13", year: 2025 },
  { id: "bts25-14", src: "/behind-the-scenes/2025/IMG_0134.jpg", alt: "Young Fashion 2025 behind the scenes photo 14", year: 2025 },
  { id: "bts25-15", src: "/behind-the-scenes/2025/IMG_0139.jpg", alt: "Young Fashion 2025 behind the scenes photo 15", year: 2025 },
  { id: "bts25-16", src: "/behind-the-scenes/2025/IMG_0160.jpg", alt: "Young Fashion 2025 behind the scenes photo 16", year: 2025 },
  { id: "bts25-17", src: "/behind-the-scenes/2025/IMG_0169.jpg", alt: "Young Fashion 2025 behind the scenes photo 17", year: 2025 },
  { id: "bts25-18", src: "/behind-the-scenes/2025/IMG_0170.jpg", alt: "Young Fashion 2025 behind the scenes photo 18", year: 2025 },
  { id: "bts25-19", src: "/behind-the-scenes/2025/IMG_0174.jpg", alt: "Young Fashion 2025 behind the scenes photo 19", year: 2025 },
  { id: "bts25-20", src: "/behind-the-scenes/2025/IMG_0182.jpg", alt: "Young Fashion 2025 behind the scenes photo 20", year: 2025 },
  { id: "bts25-21", src: "/behind-the-scenes/2025/IMG_0201.jpg", alt: "Young Fashion 2025 behind the scenes photo 21", year: 2025 },
  { id: "bts25-22", src: "/behind-the-scenes/2025/IMG_0210.jpg", alt: "Young Fashion 2025 behind the scenes photo 22", year: 2025 },
  { id: "bts25-23", src: "/behind-the-scenes/2025/IMG_0250.jpg", alt: "Young Fashion 2025 behind the scenes photo 23", year: 2025 },
  { id: "bts25-24", src: "/behind-the-scenes/2025/IMG_0256.jpg", alt: "Young Fashion 2025 behind the scenes photo 24", year: 2025 },
  { id: "bts25-25", src: "/behind-the-scenes/2025/IMG_0267.jpg", alt: "Young Fashion 2025 behind the scenes photo 25", year: 2025 },
  { id: "bts25-26", src: "/behind-the-scenes/2025/IMG_0285.jpg", alt: "Young Fashion 2025 behind the scenes photo 26", year: 2025 },
  { id: "bts25-27", src: "/behind-the-scenes/2025/IMG_0289.jpg", alt: "Young Fashion 2025 behind the scenes photo 27", year: 2025 },
  { id: "bts25-28", src: "/behind-the-scenes/2025/IMG_0300.jpg", alt: "Young Fashion 2025 behind the scenes photo 28", year: 2025 },
  { id: "bts25-29", src: "/behind-the-scenes/2025/IMG_0304.jpg", alt: "Young Fashion 2025 behind the scenes photo 29", year: 2025 },
  { id: "bts25-30", src: "/behind-the-scenes/2025/IMG_0321.jpg", alt: "Young Fashion 2025 behind the scenes photo 30", year: 2025 },
  { id: "bts25-31", src: "/behind-the-scenes/2025/IMG_0324.jpg", alt: "Young Fashion 2025 behind the scenes photo 31", year: 2025 },
  { id: "bts25-32", src: "/behind-the-scenes/2025/IMG_0326.jpg", alt: "Young Fashion 2025 behind the scenes photo 32", year: 2025 },
  { id: "bts25-33", src: "/behind-the-scenes/2025/IMG_0342.jpg", alt: "Young Fashion 2025 behind the scenes photo 33", year: 2025 },
  { id: "bts25-34", src: "/behind-the-scenes/2025/IMG_0351.jpg", alt: "Young Fashion 2025 behind the scenes photo 34", year: 2025 },
  { id: "bts25-35", src: "/behind-the-scenes/2025/IMG_0371.jpg", alt: "Young Fashion 2025 behind the scenes photo 35", year: 2025 },
  { id: "bts25-36", src: "/behind-the-scenes/2025/IMG_0409.jpg", alt: "Young Fashion 2025 behind the scenes photo 36", year: 2025 },
  { id: "bts25-37", src: "/behind-the-scenes/2025/IMG_0428.jpg", alt: "Young Fashion 2025 behind the scenes photo 37", year: 2025 },
  { id: "bts25-38", src: "/behind-the-scenes/2025/IMG_0442.jpg", alt: "Young Fashion 2025 behind the scenes photo 38", year: 2025 },
];
