import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";
import type { DetailPayload, ProjectItem } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type ProjectsSectionProps = {
  items: ProjectItem[];
  onOpenDetail: (payload: DetailPayload) => void;
};

export default function ProjectsSection({ items, onOpenDetail }: ProjectsSectionProps) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const triggerNode = headingRef.current;
    if (!triggerNode) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: {
        trigger: triggerNode,
        start: "top 86%",
      },
    });

    timeline
      .from(triggerNode.querySelectorAll(".projects-title"), {
        opacity: 0,
        y: 20,
        duration: 0.52,
        stagger: 0.1,
      })
      .from(cardRefs.current, {
        opacity: 0,
        y: 40,
        duration: 0.62,
        stagger: 0.08,
      }, "-=0.2");

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <SectionWrapper className="flex items-center overflow-x-hidden py-6">
      <div className="w-full pb-16" ref={headingRef}>
        <p className="projects-title font-sans text-[11px] uppercase tracking-[0.34em] text-[var(--dust)]">
          Selected Work
        </p>
        <h2 className="projects-title mt-2 font-serif text-[clamp(2.4rem,4.6vw,4.2rem)] font-light text-[var(--ink)]">
          Projects
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 pb-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((project, index) => (
            <article
              key={project.name}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="glass-card group rounded-[3px] p-5 transition-transform duration-300 hover:-translate-y-1"
              data-nav-ignore="true"
              role="button"
              tabIndex={0}
              onClick={() =>
                onOpenDetail({
                  title: project.name,
                  subtitle: project.stack.join(" | "),
                  lines: [project.description, ...project.details],
                })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpenDetail({
                    title: project.name,
                    subtitle: project.stack.join(" | "),
                    lines: [project.description, ...project.details],
                  });
                }
              }}
            >
              <h3 className="font-serif text-[2rem] leading-[1] text-[var(--ink)]">
                {project.name}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={`${project.name}-${tag}`}
                    className="rounded-[3px] border border-[var(--gold)] px-2 py-1 font-mono text-[11px] text-[var(--gold)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--ink)]">
                {project.description}
              </p>

              {project.badge && (
                <p className="mt-4 inline-flex rounded-full border border-[var(--gold)]/70 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--gold)]">
                  {project.badge}
                </p>
              )}

              <button
                type="button"
                className="corner-button mt-6 inline-flex px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--mid)] transition-colors duration-300 group-hover:text-[var(--gold)]"
                data-nav-ignore="true"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenDetail({
                    title: project.name,
                    subtitle: project.stack.join(" | "),
                    lines: [project.description, ...project.details],
                  });
                }}
              >
                <span aria-hidden="true" className="corner tl" />
                <span aria-hidden="true" className="corner tr" />
                <span aria-hidden="true" className="corner bl" />
                <span aria-hidden="true" className="corner br" />
                Explore
              </button>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
