import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SectionWrapper from "../ui/SectionWrapper";

type WelcomeSectionProps = {
  userName: string;
  onAutoAdvance: () => void;
};

export default function WelcomeSection({ userName, onAutoAdvance }: WelcomeSectionProps) {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const noteRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

    timeline
      .from(blockRef.current, {
        opacity: 0.7,
        y: 30,
        duration: 0.5,
      })
      .from(introRef.current, {
        opacity: 0,
        y: -18,
        duration: 0.4,
      }, "-=0.2")
      .from(titleRef.current, {
        y: 28,
        duration: 0.55,
      }, "-=0.08")
      .from(nameRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.35,
      }, "-=0.12")
      .from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.45,
      }, "-=0.08")
      .from(loaderRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.38,
      }, "-=0.12")
      .from(noteRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.4,
      }, "-=0.12");

    const timeoutId = window.setTimeout(() => {
      onAutoAdvance();
    }, 3600);

    return () => {
      timeline.kill();
      window.clearTimeout(timeoutId);
    };
  }, [onAutoAdvance]);

  return (
    <SectionWrapper className="flex items-center justify-center">
      <div
        ref={blockRef}
        className="glass-card w-[min(980px,92vw)] rounded-[3px] px-6 py-10 text-center sm:px-10 sm:py-12"
      >
        <p
          ref={introRef}
          className="font-sans text-[clamp(1rem,2.2vw,1.8rem)] font-medium uppercase tracking-[0.24em] text-[var(--ink)]"
        >
          WELCOME TO
        </p>

        <h1
          ref={titleRef}
          className="mt-4 font-serif text-[clamp(4rem,10vw,8.8rem)] leading-[0.88] text-[var(--ink)] [text-shadow:0_8px_24px_rgba(18,16,13,0.12)]"
        >
          Bishnu&apos;s <span className="italic text-[var(--gold)]">World</span>
        </h1>

        <div
          ref={loaderRef}
          className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--gold)]"
          data-nav-ignore="true"
        >
          <span>Loading</span>
          <span className="inline-flex items-center gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)] [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)] [animation-delay:180ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)] [animation-delay:360ms]" />
          </span>
        </div>

        <p
          ref={nameRef}
          className="mt-3 font-sans text-sm uppercase tracking-[0.2em] text-[var(--mid)] sm:text-base"
        >
          for {userName || "Guest"}
        </p>

        <div
          ref={lineRef}
          className="mx-auto mt-6 h-px w-[320px] max-w-[78vw] bg-[var(--gold)]"
        />

        <p
          ref={noteRef}
          className="mt-5 font-sans text-sm tracking-[0.1em] text-[var(--mid)]"
        >
          - a space crafted for you -
        </p>
      </div>
    </SectionWrapper>
  );
}
