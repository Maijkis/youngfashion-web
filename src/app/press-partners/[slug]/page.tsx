import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import CommunicationMap from "@/components/press/CommunicationMap";
import { partnerProfiles } from "@/lib/content";

interface PartnerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return partnerProfiles.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = partnerProfiles.find((p) => p.slug === slug);

  if (!partner) return {};

  return {
    title: `${partner.name} | Young Fashion Partners`,
    description: partner.blurb,
  };
}

export default async function PartnerPage({ params }: PartnerPageProps) {
  const { slug } = await params;
  const partner = partnerProfiles.find((p) => p.slug === slug);

  if (!partner) {
    notFound();
  }

  return (
    <PageShell className="container pt-28 md:pt-36 pb-section">
      <Link
        href="/press-partners"
        className="mono-label inline-flex min-h-[44px] items-center gap-2 text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
      >
        <ArrowLeft size={14} />
        All partners
      </Link>

      <div className="mt-10 grid items-start gap-12 md:mt-14 md:grid-cols-[1fr_minmax(0,26rem)]">
        <div>
          <p className="mono-label mb-4 text-[var(--color-ink-muted)]">
            Partner — Issue 05
          </p>
          <h1 className="mb-6 font-display font-semibold uppercase text-h1 leading-display tracking-tight text-[var(--color-ink)]">
            {partner.name}
          </h1>
          <p className="max-w-[46ch] text-body font-light leading-body text-[var(--color-ink)]/80">
            {partner.blurb}
          </p>
          {partner.url && (
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-[var(--color-accent-text)]"
            >
              <span className="link-underline">Visit site</span>
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>

        <div className="flex aspect-[5/3] items-center justify-center border border-hairline bg-[var(--color-paper-deep)] p-10 md:p-12">
          {partner.logo ? (
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={360}
              height={200}
              priority
              className="max-h-full w-auto max-w-full object-contain mix-blend-multiply"
            />
          ) : (
            <span className="text-center font-display font-semibold uppercase text-h2 leading-display tracking-tight text-[var(--color-ink-muted)]">
              {partner.name}
            </span>
          )}
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <div className="mb-10 flex items-baseline justify-between gap-4 border-t border-hairline pt-6 md:mb-14">
          <p className="mono-label text-[var(--color-ink-muted)]">Communication map</p>
          <p className="mono-label tabular-nums text-[var(--color-ink-muted)]">
            {String(partner.comms.length).padStart(2, "0")} touchpoints
          </p>
        </div>
        <CommunicationMap items={partner.comms} partnerName={partner.name} />
      </div>
    </PageShell>
  );
}
