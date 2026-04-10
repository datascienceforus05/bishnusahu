import { motion } from "framer-motion";

type NextButtonProps = {
  onClick: () => void;
  hidden?: boolean;
  disabled?: boolean;
};

export default function NextButton({ onClick, hidden = false, disabled = false }: NextButtonProps) {
  if (hidden) {
    return null;
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className="corner-button fixed bottom-5 right-5 z-50 px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--ink)] sm:bottom-8 sm:right-8"
      aria-label="Next section"
      data-nav-ignore="true"
    >
      <span aria-hidden="true" className="corner tl" />
      <span aria-hidden="true" className="corner tr" />
      <span aria-hidden="true" className="corner bl" />
      <span aria-hidden="true" className="corner br" />
      Next
    </motion.button>
  );
}
