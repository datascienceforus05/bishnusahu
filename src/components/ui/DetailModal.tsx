import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { DetailPayload } from "../../data/portfolio";

type DetailModalProps = {
  open: boolean;
  data: DetailPayload | null;
  onClose: () => void;
};

export default function DetailModal({ open, data, onClose }: DetailModalProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = 8;

    const geometry = new THREE.PlaneGeometry(5.2, 3.2, 20, 20);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x223652,
      transparent: true,
      opacity: 0.44,
      metalness: 0.12,
      roughness: 0.28,
      transmission: 0.36,
      thickness: 1.9,
      clearcoat: 1,
      clearcoatRoughness: 0.24,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0xe2c186, transparent: true, opacity: 0.58 }),
    );
    mesh.add(edge);

    scene.add(new THREE.AmbientLight(0xdbe7ff, 0.64));
    const key = new THREE.DirectionalLight(0xffe7be, 0.42);
    key.position.set(2.2, 1.3, 2.8);
    scene.add(key);

    const pointer = { x: 0, y: 0 };

    const resize = () => {
      const { width, height } = stage.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    stage.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      mesh.rotation.x = THREE.MathUtils.lerp(
        mesh.rotation.x,
        pointer.y * 0.16 + Math.sin(elapsed * 0.8) * 0.03,
        0.08,
      );
      mesh.rotation.y = THREE.MathUtils.lerp(
        mesh.rotation.y,
        pointer.x * 0.22 + Math.cos(elapsed * 0.7) * 0.03,
        0.08,
      );
      mesh.position.y = Math.sin(elapsed * 1.2) * 0.09;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      stage.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      edge.geometry.dispose();
      (edge.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [open]);

  if (!open || !data) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-[rgba(12,10,8,0.62)] px-4 backdrop-blur-[2px]"
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
      data-nav-ignore="true"
    >
      <div
        className="relative w-full max-w-4xl rounded-[3px] border border-[rgba(201,168,108,0.48)] bg-[rgba(10,14,24,0.94)] p-5 shadow-[0_24px_80px_rgba(3,5,12,0.62)] sm:p-8"
        data-nav-ignore="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="corner-button absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center text-2xl text-[var(--ink)]"
          aria-label="Close details"
          data-nav-ignore="true"
        >
          <span aria-hidden="true" className="corner tl" />
          <span aria-hidden="true" className="corner tr" />
          <span aria-hidden="true" className="corner bl" />
          <span aria-hidden="true" className="corner br" />
          ×
        </button>

        <div ref={stageRef} className="relative h-52 w-full overflow-hidden rounded-[3px]">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[rgba(12,10,8,0.62)] via-[rgba(12,10,8,0.18)] to-transparent p-5 text-left">
            <h3 className="font-serif text-[clamp(2rem,4vw,2.9rem)] leading-[1] text-[var(--cream)]">
              {data.title}
            </h3>
            {data.subtitle && (
              <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-[rgba(250,248,242,0.86)]">
                {data.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 max-h-[44vh] overflow-y-auto pr-1">
          <ul className="space-y-3">
            {data.lines.map((line, index) => (
              <li key={`${line}-${index}`} className="flex gap-3 text-[15px] leading-relaxed text-[var(--ink)] sm:text-base">
                <span className="mt-2 h-[2px] w-4 shrink-0 bg-[var(--gold)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {data.link && (
          <a
            href={data.link.href}
            target="_blank"
            rel="noreferrer"
            className="corner-button mt-6 inline-flex px-6 py-2 text-xs uppercase tracking-[0.2em] text-[var(--ink)]"
            data-nav-ignore="true"
          >
            <span aria-hidden="true" className="corner tl" />
            <span aria-hidden="true" className="corner tr" />
            <span aria-hidden="true" className="corner bl" />
            <span aria-hidden="true" className="corner br" />
            {data.link.label}
          </a>
        )}
      </div>
    </div>
  );
}
