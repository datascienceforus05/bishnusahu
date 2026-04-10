import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

type PublicationSectionProps = {
  title: string;
  doi: string;
  doiUrl: string;
  pdfPath: string;
};

export default function PublicationSection({ title, doi, doiUrl, pdfPath }: PublicationSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const triggerNode = sectionRef.current;
    if (!triggerNode) {
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: {
        trigger: triggerNode,
        start: "top 88%",
      },
    });

    timeline
      .from(triggerNode.querySelectorAll(".publication-header"), {
        opacity: 0,
        y: 20,
        duration: 0.58,
        stagger: 0.1,
      })
      .from(triggerNode.querySelector(".publication-viewer"), {
        opacity: 0,
        y: 30,
        duration: 0.72,
      }, "-=0.18");

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <SectionWrapper className="flex items-center">
      <div ref={sectionRef} className="mx-auto w-full max-w-6xl">
        <p className="publication-header font-sans text-[11px] uppercase tracking-[0.35em] text-[var(--dust)]">
          Research
        </p>
        <h2 className="publication-header mt-2 font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-light text-[var(--ink)]">
          Research Paper
        </h2>
        <p className="publication-header mt-3 max-w-4xl font-sans text-sm leading-relaxed text-[var(--mid)] sm:text-base">
          {title}
        </p>

        <div className="publication-viewer glass-card mt-6 rounded-[3px] p-4 sm:p-5" data-nav-ignore="true">
          <div className="h-[58vh] overflow-hidden rounded-[3px] border border-[rgba(201,168,108,0.4)] bg-[rgba(10,14,24,0.84)]">
            <iframe
              src={`${pdfPath}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
              title="Kuya Cloud Research Paper"
              className="h-full w-full"
              data-nav-ignore="true"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={pdfPath}
              target="_blank"
              rel="noreferrer"
              className="corner-button inline-flex px-6 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink)]"
              data-nav-ignore="true"
            >
              <span aria-hidden="true" className="corner tl" />
              <span aria-hidden="true" className="corner tr" />
              <span aria-hidden="true" className="corner bl" />
              <span aria-hidden="true" className="corner br" />
              Open PDF
            </a>

            <a
              href={doiUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-[var(--gold)]"
              data-nav-ignore="true"
            >
              DOI: {doi}
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
