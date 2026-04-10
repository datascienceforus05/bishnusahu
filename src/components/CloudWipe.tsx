import { useEffect, useRef } from "react";
import gsap from "gsap";

type CloudWipeProps = {
  active: boolean;
  onMidpoint: () => void | Promise<void>;
  onComplete: () => void;
};

type DrawState = {
  mode: "enter" | "exit";
  enterProgress: number;
  exitProgress: number;
  tick: number;
};

function drawCloudEdge(
  ctx: CanvasRenderingContext2D,
  edgeX: number,
  width: number,
  height: number,
  reversed: boolean,
  tick: number,
) {
  const count = 11;

  for (let i = 0; i < count; i += 1) {
    const ratio = i / (count - 1);
    const y = ratio * height + Math.sin(tick * 0.6 + i * 1.2) * 24;
    const radius = 90 + Math.sin(tick + i) * 16 + ((i % 4) * 7);
    const offset = Math.sin(tick * 0.8 + i * 0.5) * 18;
    const x = reversed ? edgeX - radius * 0.48 + offset : edgeX + radius * 0.44 + offset;

    ctx.beginPath();
    ctx.fillStyle = "#0A0E18";
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!reversed) {
    ctx.fillRect(0, 0, Math.max(0, edgeX), height);
  } else {
    ctx.fillRect(edgeX, 0, width - edgeX, height);
  }
}

export default function CloudWipe({ active, onMidpoint, onComplete }: CloudWipeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    timelineRef.current?.kill();

    const clear = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    if (!active) {
      clear();
      return;
    }

    const state: DrawState = {
      mode: "enter",
      enterProgress: 0,
      exitProgress: 0,
      tick: 0,
    };

    const render = () => {
      clear();

      if (state.mode === "enter") {
        const edge = canvas.width * state.enterProgress;
        drawCloudEdge(ctx, edge, canvas.width, canvas.height, false, state.tick);
      } else {
        const edge = canvas.width * state.exitProgress;
        drawCloudEdge(ctx, edge, canvas.width, canvas.height, true, state.tick);
      }

      state.tick += 0.04;
    };

    const timeline = gsap.timeline({
      onComplete: () => {
        clear();
        onComplete();
      },
    });

    timeline
      .to(state, {
        enterProgress: 1,
        duration: 0.72,
        ease: "power4.inOut",
        onUpdate: render,
      })
      .add(() => {
        void onMidpoint();
        state.mode = "exit";
        state.exitProgress = 0;
        render();
      })
      .to(state, {
        exitProgress: 1,
        duration: 0.72,
        ease: "power4.inOut",
        onUpdate: render,
      });

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
    };
  }, [active, onComplete, onMidpoint]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-[80] h-screen w-screen ${active ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden="true"
    />
  );
}
