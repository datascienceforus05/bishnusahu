import { motion } from "framer-motion";

type PrevButtonProps = {
  onClick: () => void;
  hidden?: boolean;
  disabled?: boolean;
};

export default function PrevButton({ onClick, hidden = false, disabled = false }: PrevButtonProps) {
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
      className="corner-button fixed bottom-5 left-5 z-50 px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--ink)] sm:bottom-8 sm:left-8"
      aria-label="Previous section"
      data-nav-ignore="true"
    >
      <span aria-hidden="true" className="corner tl" />
      <span aria-hidden="true" className="corner tr" />
      <span aria-hidden="true" className="corner bl" />
      <span aria-hidden="true" className="corner br" />
      Prev
    </motion.button>
  );
}
