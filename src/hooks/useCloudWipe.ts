import { useCallback, useRef, useState } from "react";

type MidpointCallback = () => void | Promise<void>;

export function useCloudWipe() {
  const [isWiping, setIsWiping] = useState(false);
  const midpointRef = useRef<MidpointCallback | null>(null);
  const resolverRef = useRef<(() => void) | null>(null);

  const triggerWipe = useCallback(
    (onMidpoint: MidpointCallback) => {
      if (isWiping) {
        return Promise.resolve(false);
      }

      midpointRef.current = onMidpoint;
      setIsWiping(true);

      return new Promise<boolean>((resolve) => {
        resolverRef.current = () => resolve(true);
      });
    },
    [isWiping],
  );

  const handleMidpoint = useCallback(async () => {
    const callback = midpointRef.current;
    midpointRef.current = null;

    if (callback) {
      await callback();
    }
  }, []);

  const handleComplete = useCallback(() => {
    setIsWiping(false);
    resolverRef.current?.();
    resolverRef.current = null;
  }, []);

  return {
    isWiping,
    triggerWipe,
    handleMidpoint,
    handleComplete,
  };
}
