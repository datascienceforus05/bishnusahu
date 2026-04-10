import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";
import profileImage from "../../../profile.jpg";

gsap.registerPlugin(ScrollTrigger);

type HelloSectionProps = {
  userName: string;
};

const statCards = ["10+ Projects", "2 Hackathon Wins", "1 Publication"];
const bioLines = [
  "Python - TypeScript - Computer Vision - Distributed Systems",
  "2+ years building production AI systems, real-time inference engines, and open-source tools.",
  "Shipped 10+ production projects. Won 2 competitive hackathons. Published peer-reviewed research.",
];

const contactLinks = [
  {
    type: "github" as const,
    label: "GitHub",
    value: "@mebishnusahu0595",
    href: "https://github.com/mebishnusahu0595",
  },
  {
    type: "linkedin" as const,
    label: "LinkedIn",
    value: "mebishnusahu05",
    href: "https://www.linkedin.com/in/mebishnusahu05/",
  },
  {
    type: "email" as const,
    label: "Email",
    value: "mebishnusahu@gmail.com",
    href: "mailto:mebishnusahu@gmail.com",
  },
  {
    type: "phone" as const,
    label: "Phone",
    value: "+91 9301105706",
    href: "tel:+919301105706",
  },
];

function ContactIcon({ type }: { type: "github" | "linkedin" | "email" | "phone" }) {
  if (type === "github") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.88 1.52 2.32 1.08 2.89.83.09-.65.35-1.09.63-1.34-2.22-.26-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.46 9.46 0 0 1 12 6.84c.85 0 1.7.11 2.49.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.67.92.67 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3ZM20 13.41c0-3.13-1.67-4.59-3.9-4.59a3.39 3.39 0 0 0-3.05 1.68V8.5H9.67V20h3.38v-6.04c0-1.59.3-3.13 2.27-3.13 1.94 0 1.97 1.81 1.97 3.23V20H20v-6.59Z" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7.7 4.7h2.6l1.3 3.2-1.6 1.5c1 2 2.7 3.6 4.7 4.7l1.5-1.6 3.2 1.3v2.6a1.8 1.8 0 0 1-1.9 1.8C9.3 18.2 5.8 14.7 5.8 6.6A1.8 1.8 0 0 1 7.7 4.7Z" />
    </svg>
  );
}

export default function HelloSection({ userName }: HelloSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const helloRef = useRef<HTMLParagraphElement | null>(null);
  const nameClipRef = useRef<HTMLDivElement | null>(null);
  const roleRef = useRef<HTMLParagraphElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);
  const bioRefs = useRef<HTMLParagraphElement[]>([]);
  const statRefs = useRef<HTMLDivElement[]>([]);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const triggerNode = sectionRef.current;
    if (!triggerNode) {
      return;
    }

    const headingNode = nameClipRef.current?.querySelector("h2") as HTMLHeadingElement | null;

    const timeline = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: {
        trigger: triggerNode,
        start: "top 86%",
      },
    });

    timeline
      .from(helloRef.current, { opacity: 0, y: 20, duration: 0.45 }, 0)
      .from(roleRef.current, {
        opacity: 0,
        y: 22,
        duration: 0.55,
      }, 0.6)
      .from(ruleRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.5,
      }, 0.8)
      .from(bioRefs.current, {
        opacity: 0,
        y: 18,
        duration: 0.54,
        stagger: 0.13,
      }, 1)
      .from(statRefs.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.14,
      }, 1.4);

    if (portraitRef.current) {
      timeline.from(portraitRef.current, {
        opacity: 0,
        x: 32,
        duration: 0.7,
      }, 0.95);
    }

    if (headingNode) {
      timeline.from(headingNode, {
        y: 110,
        opacity: 0,
        duration: 0.7,
      }, 0.3);
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <SectionWrapper className="flex items-center">
      <div
        ref={sectionRef}
        className="w-full max-w-[1280px]"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_370px]">
          <div className="max-w-3xl">
            <p
              ref={helloRef}
              className="font-sans text-[11px] uppercase tracking-[0.36em] text-[var(--dust)]"
            >
              Hello, {userName || "Guest"}
            </p>

            <div
              ref={nameClipRef}
              className="mt-4 overflow-hidden"
            >
              <h2 className="font-serif text-[clamp(3rem,6vw,6.2rem)] font-light leading-[0.95] text-[var(--ink)]">
                I&apos;m Bishnu Prasad Sahu.
              </h2>
            </div>

            <p
              ref={roleRef}
              className="mt-3 font-serif text-[clamp(1.4rem,2.8vw,2.3rem)] italic text-[var(--mid)]"
            >
              Full Stack Engineer &amp; AI Developer
            </p>

            <div
              ref={ruleRef}
              className="mt-6 h-px w-[280px] max-w-[80vw] bg-[var(--gold)]"
            />

            <div className="mt-8 space-y-3">
              {bioLines.map((line, index) => (
                <p
                  key={line}
                  ref={(node) => {
                    if (node) {
                      bioRefs.current[index] = node;
                    }
                  }}
                  className="font-sans text-sm leading-relaxed tracking-[0.03em] text-[var(--ink)] sm:text-base"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {statCards.map((stat, index) => (
                <div
                  key={stat}
                  ref={(node) => {
                    if (node) {
                      statRefs.current[index] = node;
                    }
                  }}
                  className="glass-card rounded-[3px] px-4 py-4 text-center"
                >
                  <p className="font-sans text-sm uppercase tracking-[0.16em] text-[var(--ink)]">
                    {stat}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2" data-nav-ignore="true">
              {contactLinks.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.type === "email" || contact.type === "phone" ? undefined : "_blank"}
                  rel={contact.type === "email" || contact.type === "phone" ? undefined : "noreferrer"}
                  className="group glass-card flex items-center justify-between gap-3 rounded-[2px] border border-[rgba(201,168,108,0.22)] px-3 py-2 text-[11px] transition-colors duration-200 hover:border-[rgba(201,168,108,0.55)] hover:bg-[rgba(255,255,255,0.03)]"
                  data-nav-ignore="true"
                >
                  <span className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.14em] text-[var(--mid)] group-hover:text-[var(--gold)]">
                    <ContactIcon type={contact.type} />
                    {contact.label}
                  </span>
                  <span className="font-sans text-[11px] text-[var(--ink)]">{contact.value}</span>
                </a>
              ))}
            </div>
          </div>

          <div
            ref={portraitRef}
            className="hidden justify-self-end lg:block lg:translate-x-10 xl:translate-x-16"
            data-nav-ignore="true"
          >
            <div className="glass-card w-[343px] overflow-hidden rounded-[4px] border border-[rgba(201,168,108,0.32)] p-2">
              <img
                src={profileImage}
                alt="Bishnu Prasad Sahu portrait"
                className="h-[493px] w-full rounded-[2px] object-cover object-[center_18%]"
                loading="eager"
                data-nav-ignore="true"
              />
              <p className="px-2 pb-2 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--dust)]">
                Bishnu Prasad Sahu
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
