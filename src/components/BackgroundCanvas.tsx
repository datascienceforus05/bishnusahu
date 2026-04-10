import { useEffect, useRef } from "react";
import * as THREE from "three";

type CloudLayer = {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>;
  velocity: number;
  wobble: number;
  baseY: number;
};

function createCloudTexture() {
  const size = 256;
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = size;
  textureCanvas.height = size;

  const ctx = textureCanvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    12,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(208,220,255,0.42)");
  gradient.addColorStop(0.45, "rgba(192,212,255,0.16)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x080b12, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x080b12, 320, 2600);

    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      3000,
    );
    camera.position.z = 1400;

    scene.add(new THREE.AmbientLight(0xb8cbff, 0.42));
    const directional = new THREE.DirectionalLight(0x9eb9ff, 0.24);
    directional.position.set(0.4, 0.9, 1);
    scene.add(directional);

    const texture = createCloudTexture();
    if (!texture) {
      return;
    }

    const clouds: CloudLayer[] = [];
    const cloudCount = 28;

    for (let index = 0; index < cloudCount; index += 1) {
      const width = 220 + Math.random() * 360;
      const height = width * (0.55 + Math.random() * 0.2);
      const geometry = new THREE.PlaneGeometry(width, height);
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: 0.07 + Math.random() * 0.12,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = -window.innerWidth / 2 + Math.random() * window.innerWidth * 1.9;
      mesh.position.y = -window.innerHeight / 2 + Math.random() * window.innerHeight * 1.6;
      mesh.position.z = -500 + Math.random() * 1000;
      scene.add(mesh);

      clouds.push({
        mesh,
        velocity: 0.12 + Math.random() * 0.35,
        wobble: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      });
    }

    let frameId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();

      for (const layer of clouds) {
        layer.mesh.position.x += layer.velocity;
        layer.mesh.position.y = layer.baseY + Math.sin(elapsed * 0.18 + layer.wobble) * 14;

        if (layer.mesh.position.x > window.innerWidth / 2 + 440) {
          layer.mesh.position.x = -window.innerWidth / 2 - 420;
        }
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frameId);

      for (const layer of clouds) {
        layer.mesh.geometry.dispose();
        layer.mesh.material.dispose();
      }

      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
      aria-hidden="true"
    />
  );
}
