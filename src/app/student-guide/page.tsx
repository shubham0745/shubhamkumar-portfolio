import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import GuideCard from "@/components/GuideCard";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Student Guide",
  description:
    "Practical guides for engineering students — DSA roadmaps, backend learning paths, resume advice and off-campus job hunting.",
};

export default function StudentGuidePage() {
  return (
    <Section className="pt-32">
      <PageHeader
        eyebrow="Student guide"
        title="Guides for students"
        description={
          <>
            <p>
              If you&apos;re an engineering student trying to break into software, this is the
              advice I wish someone had given me — written from what actually worked, not from what
              sounds good.
            </p>
            <p className="mt-4">
              No mentor, no senior to ask? Start here. If something still isn&apos;t answered, reach
              out directly.
            </p>
          </>
        }
      />

      <RevealGroup className="space-y-4" stagger={0.06}>
        {guides.map((guide) => (
          <RevealItem key={guide.slug}>
            <GuideCard guide={guide} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
