import { useEffect } from "react";

type UseNavigationOptions = {
  enabled?: boolean;
  onAdvance: () => void;
  onPrevious?: () => void;
};

export function useNavigation({ enabled = true, onAdvance, onPrevious }: UseNavigationOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true'], [data-nav-ignore]")) {
        return;
      }

      if (event.code === "ArrowLeft" || event.code === "Backspace") {
        if (onPrevious) {
          event.preventDefault();
          onPrevious();
        }
        return;
      }

      if (event.code !== "Space" && event.code !== "ArrowRight") {
        return;
      }

      event.preventDefault();
      onAdvance();
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [enabled, onAdvance, onPrevious]);
}
