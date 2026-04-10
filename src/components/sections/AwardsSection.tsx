import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";
import type { AwardItem, DetailPayload } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type AwardsSectionProps = {
  items: AwardItem[];
  onOpenDetail: (payload: DetailPayload) => void;
};

export default function AwardsSection({ items, onOpenDetail }: AwardsSectionProps) {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const triggerNode = headingRef.current;
    if (!triggerNode) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: triggerNode,
        start: "top 85%",
      },
    });

    timeline
      .from(triggerNode.querySelectorAll(".awards-header"), {
        opacity: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.12,
      })
      .from(itemRefs.current, {
        opacity: 0,
        y: 28,
        duration: 0.62,
        stagger: 0.16,
      }, "-=0.2");

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <SectionWrapper className="flex items-center">
      <div className="w-full" ref={headingRef}>
        <p className="awards-header font-sans text-[11px] uppercase tracking-[0.35em] text-[var(--dust)]">
          Recognition
        </p>
        <h2 className="awards-header mt-2 font-serif text-[clamp(2.6rem,5vw,4.4rem)] font-light text-[var(--ink)]">
          Awards &amp; Achievements
        </h2>

        <div className="mt-8 border-y border-[rgba(201,168,108,0.35)]">
          {items.map((award, index) => (
            <div
              key={award.title}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="grid cursor-pointer grid-cols-1 gap-4 border-b border-[rgba(201,168,108,0.2)] py-6 transition-colors duration-300 hover:bg-[rgba(26,33,49,0.64)] last:border-b-0 md:grid-cols-[8px_1fr_1.5fr] md:items-center"
              role="button"
              tabIndex={0}
              data-nav-ignore="true"
              onClick={() =>
                onOpenDetail({
                  title: award.title,
                  subtitle: "Award & Achievement",
                  lines: [award.detail],
                })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpenDetail({
                    title: award.title,
                    subtitle: "Award & Achievement",
                    lines: [award.detail],
                  });
                }
              }}
            >
              <span className="hidden h-full w-[2px] bg-[var(--gold)] md:block" />
              <h3 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.05] text-[var(--ink)]">
                {award.title}
              </h3>
              <p className="font-sans text-sm uppercase tracking-[0.08em] text-[var(--mid)]">
                {award.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
