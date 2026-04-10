import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";
import type { DetailPayload, SkillCategory } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type SkillsSectionProps = {
  categories: SkillCategory[];
  publication: {
    title: string;
    doi: string;
    doiUrl: string;
    pdfPath: string;
  };
  onOpenDetail: (payload: DetailPayload) => void;
};

export default function SkillsSection({ categories, publication, onOpenDetail }: SkillsSectionProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const publicationRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const triggerNode = wrapperRef.current;
    if (!triggerNode) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: triggerNode,
        start: "top 86%",
      },
    });

    timeline
      .from(triggerNode.querySelectorAll(".skills-header"), {
        opacity: 0,
        y: 16,
        duration: 0.48,
        stagger: 0.12,
      })
      .from(rowRefs.current, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.08,
      }, "-=0.2")
      .from(publicationRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
      }, "-=0.1");

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const cleanups = tagRefs.current.map((tag) => {
      if (!tag) {
        return () => undefined;
      }

      const enter = () => {
        gsap.to(tag, {
          color: "var(--gold)",
          duration: 0.28,
          ease: "power2.out",
        });
      };

      const leave = () => {
        gsap.to(tag, {
          color: "var(--ink)",
          duration: 0.28,
          ease: "power2.out",
        });
      };

      tag.addEventListener("mouseenter", enter);
      tag.addEventListener("mouseleave", leave);

      return () => {
        tag.removeEventListener("mouseenter", enter);
        tag.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [categories]);

  return (
    <SectionWrapper className="flex items-center">
      <div className="w-full" ref={wrapperRef}>
        <p className="skills-header font-sans text-[11px] uppercase tracking-[0.35em] text-[var(--dust)]">
          Capabilities
        </p>
        <h2 className="skills-header mt-2 font-serif text-[clamp(2.4rem,4.6vw,4.1rem)] font-light text-[var(--ink)]">
          Skills
        </h2>

        <div className="mt-9 space-y-5">
          {categories.map((category, rowIndex) => (
            <div
              key={category.label}
              ref={(node) => {
                rowRefs.current[rowIndex] = node;
              }}
              className="grid cursor-pointer grid-cols-1 gap-3 border-b border-[rgba(201,168,108,0.24)] pb-5 transition-colors duration-300 hover:bg-[rgba(26,33,49,0.64)] md:grid-cols-[170px_1fr]"
              role="button"
              tabIndex={0}
              data-nav-ignore="true"
              onClick={() =>
                onOpenDetail({
                  title: category.label,
                  subtitle: "Skill Cluster",
                  lines: category.items,
                })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpenDetail({
                    title: category.label,
                    subtitle: "Skill Cluster",
                    lines: category.items,
                  });
                }
              }}
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[var(--dust)]">
                {category.label}
              </p>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 font-sans text-[clamp(0.92rem,1.5vw,1.08rem)] text-[var(--ink)]">
                {category.items.map((item, index) => {
                  const refIndex =
                    categories
                      .slice(0, rowIndex)
                      .reduce((total, current) => total + current.items.length, 0) + index;

                  return (
                    <span key={`${category.label}-${item}`} className="inline-flex items-center gap-2">
                      <span
                        ref={(node) => {
                          tagRefs.current[refIndex] = node;
                        }}
                        className="transition-colors duration-200"
                      >
                        {item}
                      </span>
                      {index < category.items.length - 1 && (
                        <span className="text-[var(--dust)]">·</span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={publicationRef}
          className="glass-card mt-9 cursor-pointer rounded-[3px] px-6 py-5"
          role="button"
          tabIndex={0}
          data-nav-ignore="true"
          onClick={() =>
            onOpenDetail({
              title: "Research Publication",
              subtitle: `DOI: ${publication.doi}`,
              lines: [publication.title, "Click open link to view the PDF and citation details."],
              link: {
                label: "Open Kuya Cloud Paper",
                href: publication.pdfPath,
              },
            })
          }
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenDetail({
                title: "Research Publication",
                subtitle: `DOI: ${publication.doi}`,
                lines: [publication.title, "Click open link to view the PDF and citation details."],
                link: {
                  label: "Open Kuya Cloud Paper",
                  href: publication.pdfPath,
                },
              });
            }
          }}
        >
          <p className="font-serif text-[clamp(1.3rem,2.5vw,1.9rem)] italic leading-snug text-[var(--ink)]">
            {publication.title}
          </p>
          <a
            href={publication.doiUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-mono text-sm text-[var(--gold)]"
          >
            DOI: {publication.doi}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
