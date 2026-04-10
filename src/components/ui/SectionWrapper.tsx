import type { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
  return (
    <section
      className={`relative z-20 h-screen w-screen overflow-hidden px-5 pb-24 pt-8 md:px-10 lg:px-16 ${className}`}
    >
      {children}
    </section>
  );
}
