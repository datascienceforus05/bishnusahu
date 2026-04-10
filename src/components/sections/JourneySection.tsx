import { type PointerEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";
import type { DetailPayload, ExperienceItem } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type JourneySectionProps = {
  items: ExperienceItem[];
  activeIndex: number;
  onNavigate: (direction: -1 | 1) => void;
  onOpenDetail: (payload: DetailPayload) => void;
};

export default function JourneySection({ items, activeIndex, onNavigate, onOpenDetail }: JourneySectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    deltaX: 0,
    baseX: 0,
    pointerId: -1,
  });
  const didDragRef = useRef(false);
  const [stepWidth, setStepWidth] = useState(0);

  useLayoutEffect(() => {
    const triggerNode = sectionRef.current;
    if (!triggerNode) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: {
        trigger: triggerNode,
        start: "top 84%",
      },
    });

    timeline
      .from(triggerNode.querySelectorAll(".journey-header"), {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.12,
      })
      .from(cardRefs.current, {
        opacity: 0,
        y: 54,
        duration: 0.7,
        stagger: 0.14,
      }, "-=0.2");

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const card = cardRefs.current[0];
      const track = trackRef.current;
      if (!card || !track) {
        return;
      }

      const gap = Number.parseFloat(window.getComputedStyle(track).gap || "28");
      setStepWidth(card.getBoundingClientRect().width + gap);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!trackRef.current || !stepWidth) {
      return;
    }

    gsap.to(trackRef.current, {
      x: -activeIndex * stepWidth,
      duration: 0.82,
      ease: "power4.out",
    });
  }, [activeIndex, stepWidth]);

  const points = useMemo(() => {
    if (!items.length) {
      return "";
    }

    return items
      .map((_, index) => {
        const x = (index / Math.max(items.length - 1, 1)) * 100;
        return `${x},30`;
      })
      .join(" ");
  }, [items]);

  const handleDragStart = (event: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current || !stepWidth || event.button !== 0) {
      return;
    }

    dragStateRef.current = {
      active: true,
      startX: event.clientX,
      deltaX: 0,
      baseX: -activeIndex * stepWidth,
      pointerId: event.pointerId,
    };
    didDragRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current || !dragStateRef.current.active) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    dragStateRef.current.deltaX = deltaX;
    if (Math.abs(deltaX) > 6) {
      didDragRef.current = true;
    }

    gsap.set(trackRef.current, {
      x: dragStateRef.current.baseX + deltaX,
    });
  };

  const handleDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current || !dragStateRef.current.active) {
      return;
    }

    const { deltaX, pointerId } = dragStateRef.current;
    dragStateRef.current.active = false;

    if (event.currentTarget.hasPointerCapture(pointerId)) {
      event.currentTarget.releasePointerCapture(pointerId);
    }

    const threshold = Math.min(120, Math.max(36, stepWidth * 0.18));

    if (deltaX <= -threshold && activeIndex < items.length - 1) {
      onNavigate(1);
      return;
    }

    if (deltaX >= threshold && activeIndex > 0) {
      onNavigate(-1);
      return;
    }

    gsap.to(trackRef.current, {
      x: -activeIndex * stepWidth,
      duration: 0.36,
      ease: "power3.out",
    });

    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  };

  return (
    <SectionWrapper className="flex items-center overflow-hidden py-6">
      <div
        ref={sectionRef}
        className="w-full pb-8"
      >
        <p className="journey-header font-sans text-[11px] uppercase tracking-[0.34em] text-[var(--dust)]">
          Chapter by Chapter
        </p>
        <h2 className="journey-header mt-2 font-serif text-[clamp(2.5rem,5vw,4.1rem)] font-light text-[var(--ink)]">
          The Journey
        </h2>

        <div className="relative mt-7">
          <svg
            viewBox="0 0 100 40"
            className="pointer-events-none absolute -top-5 left-0 h-10 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="journeyGlow">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <polyline
              points={points}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="0.4"
              filter="url(#journeyGlow)"
            />
          </svg>

          <div
            className="cursor-grab overflow-hidden pb-10 pt-3 active:cursor-grabbing"
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            data-nav-ignore="true"
          >
            <div
              ref={trackRef}
              className="flex select-none gap-7 will-change-transform"
            >
              {items.map((item, index) => {
                const watermarkYear = item.year.match(/\d{4}/)?.[0] ?? "";

                return (
                  <article
                    key={`${item.company}-${item.year}`}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    className="glass-card relative min-h-[300px] w-[min(460px,76vw)] shrink-0 rounded-[3px] p-6 transition-transform duration-300 hover:-translate-y-1"
                    data-nav-ignore="true"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (didDragRef.current) {
                        didDragRef.current = false;
                        return;
                      }

                      onOpenDetail({
                        title: `${item.role}`,
                        subtitle: `${item.company} | ${item.year}`,
                        lines: [`Location: ${item.location}`, ...item.points],
                      });
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpenDetail({
                          title: `${item.role}`,
                          subtitle: `${item.company} | ${item.year}`,
                          lines: [`Location: ${item.location}`, ...item.points],
                        });
                      }
                    }}
                  >
                    <p className="pointer-events-none absolute right-4 top-2 font-mono text-7xl text-[rgba(107,93,79,0.14)]">
                      {watermarkYear}
                    </p>
                    <p className="font-mono text-xs tracking-[0.1em] text-[var(--dust)]">{item.year}</p>
                    <h3 className="mt-3 font-sans text-2xl font-medium text-[var(--ink)]">{item.role}</h3>
                    <p className="mt-1 font-sans text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
                      {item.company}
                    </p>
                    <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.18em] text-[var(--mid)]">
                      {item.location}
                    </p>

                    <ul className="mt-5 space-y-3 pr-3 text-sm leading-relaxed text-[var(--ink)] sm:text-[15px]">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-2 h-[2px] w-4 shrink-0 bg-[var(--gold)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="absolute bottom-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--gold)] shadow-[0_0_18px_rgba(201,168,108,0.7)]" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 pb-4">
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            className="corner-button inline-flex h-11 w-11 items-center justify-center text-lg text-[var(--ink)]"
            aria-label="Previous experience"
          >
            <span aria-hidden="true" className="corner tl" />
            <span aria-hidden="true" className="corner tr" />
            <span aria-hidden="true" className="corner bl" />
            <span aria-hidden="true" className="corner br" />
            ‹
          </button>

          <button
            type="button"
            onClick={() => onNavigate(1)}
            className="corner-button inline-flex h-11 w-11 items-center justify-center text-lg text-[var(--ink)]"
            aria-label="Next experience"
          >
            <span aria-hidden="true" className="corner tl" />
            <span aria-hidden="true" className="corner tr" />
            <span aria-hidden="true" className="corner bl" />
            <span aria-hidden="true" className="corner br" />
            ›
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
