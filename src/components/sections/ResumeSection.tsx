import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function ResumeSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const triggerNode = sectionRef.current;
    if (!triggerNode) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: triggerNode,
        start: "top 88%",
      },
    });

    timeline
      .from(triggerNode.querySelectorAll(".resume-header"), {
        opacity: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.11,
      })
      .from(triggerNode.querySelector(".resume-viewer"), {
        opacity: 0,
        y: 30,
        duration: 0.72,
      }, "-=0.18");

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <SectionWrapper className="flex items-start overflow-hidden overflow-x-hidden pt-6">
      <div ref={sectionRef} className="mx-auto w-full max-w-6xl">
        <p className="resume-header font-sans text-[11px] uppercase tracking-[0.35em] text-[var(--dust)]">
          Final Chapter
        </p>
        <h2 className="resume-header mt-2 font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-light text-[var(--ink)]">
          Resume
        </h2>
        <p className="resume-header mt-2 font-sans text-sm text-[var(--mid)] sm:text-base">
          My professional journey, distilled into a single page. For a more comprehensive view, feel free to download the full PDF version of my resume.
        </p>

        <div className="resume-viewer glass-card mt-4 rounded-[3px] p-4 sm:p-5" data-nav-ignore="true">
          <div className="h-[60vh] overflow-hidden rounded-[3px] border border-[rgba(201,168,108,0.34)] bg-[rgba(10,14,24,0.88)] p-2">
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
              title="Bishnu Resume PDF"
              className="h-full w-full"
              data-nav-ignore="true"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="corner-button inline-flex px-6 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink)]"
              data-nav-ignore="true"
            >
              <span aria-hidden="true" className="corner tl" />
              <span aria-hidden="true" className="corner tr" />
              <span aria-hidden="true" className="corner bl" />
              <span aria-hidden="true" className="corner br" />
              Open Full Resume
            </a>
            <a
              href="/resume.pdf"
              download
              className="font-mono text-sm text-[var(--gold)]"
              data-nav-ignore="true"
            >
              Download PDF
            </a>
          </div>
        </div>

        <div className="mx-auto mt-4 w-[220px] text-center">
          <div className="h-px w-full bg-[var(--gold)]" />
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.24em] text-[var(--mid)]">
            - end of portfolio -
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
