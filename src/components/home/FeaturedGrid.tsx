"use client";

import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";

const features = [
  {
    title: "Galleries",
    subtitle: "Designer Collections",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    href: "/galleries",
  },
  {
    title: "Events",
    subtitle: "Runway & Beyond",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    href: "/events",
  },
  {
    title: "Press",
    subtitle: "In the Media",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    href: "/press-partners",
  },
];

export default function FeaturedGrid() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.12}>
              <Card
                image={feature.image}
                alt={feature.title}
                href={feature.href}
                aspectRatio="aspect-[3/4]"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">
                    {feature.subtitle}
                  </p>
                  <h3 className="text-lg md:text-2xl font-light uppercase tracking-[0.1em] text-white">
                    {feature.title}
                  </h3>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
