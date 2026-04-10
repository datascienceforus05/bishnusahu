import { useLayoutEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

type LoaderSectionProps = {
  onEnter: (name: string) => void;
};

export default function LoaderSection({ onEnter }: LoaderSectionProps) {
  const [name, setName] = useState("");
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const inputWrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const underlineRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const triggerNode = headingRef.current;
    if (!triggerNode) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: triggerNode,
        start: "top 80%",
      },
    });

    timeline
      .from(labelRef.current, { opacity: 0, y: 18, duration: 0.5 })
      .from(headingRef.current, { opacity: 0, y: 26, duration: 0.7 }, "-=0.32")
      .from(inputWrapRef.current, { opacity: 0, y: 22, duration: 0.65 }, "-=0.36")
      .from(buttonRef.current, { opacity: 0, y: 14, duration: 0.5 }, "-=0.4");

    return () => {
      timeline.kill();
    };
  }, []);

  const animateUnderline = (value: number) => {
    if (!underlineRef.current) {
      return;
    }

    gsap.to(underlineRef.current, {
      scaleX: value,
      duration: 0.4,
      ease: "expo.out",
      transformOrigin: "center center",
    });
  };

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    onEnter(name.trim() || "Guest");
  };

  return (
    <SectionWrapper className="flex items-center justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-4xl text-center"
      >
        <p
          ref={labelRef}
          className="font-sans text-[10px] uppercase tracking-[0.45em] text-[var(--dust)]"
        >
          before we begin
        </p>
        <h1
          ref={headingRef}
          className="mt-4 font-serif text-[clamp(2.6rem,7vw,6.6rem)] font-light leading-[1.02] text-[var(--ink)]"
        >
          What's your name?
        </h1>

        <div
          ref={inputWrapRef}
          className="mx-auto mt-10 max-w-2xl"
        >
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            onFocus={() => animateUnderline(1)}
            onBlur={() => animateUnderline(0.42)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submit();
              }
            }}
            placeholder=""
            aria-label="Your name"
            className="w-full border-none bg-transparent px-2 py-4 text-center font-serif text-[clamp(2.5rem,9vw,7.2rem)] font-light tracking-[0.02em] text-[var(--ink)] outline-none"
          />
          <div className="relative h-px w-full bg-[rgba(28,26,22,0.22)]">
            <span
              ref={underlineRef}
              className="absolute inset-0 origin-center scale-x-[0.42] bg-[var(--gold)]"
            />
          </div>
        </div>

        <button
          ref={buttonRef}
          type="submit"
          className="corner-button mt-12 inline-flex px-7 py-3 text-[11px] uppercase tracking-[0.34em] text-[var(--ink)]"
        >
          <span aria-hidden="true" className="corner tl" />
          <span aria-hidden="true" className="corner tr" />
          <span aria-hidden="true" className="corner bl" />
          <span aria-hidden="true" className="corner br" />
          enter
        </button>
      </form>
    </SectionWrapper>
  );
}
