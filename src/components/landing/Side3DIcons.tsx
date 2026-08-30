"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { markIconCanvasReady } from "@/components/landing/iconsReady";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

const INK = "#1f1c14";
const LIME = "#a3e635";
const PAPER = "#fdfaf2";
const RED = "#ff5e3a";
const YELLOW = "#fde047";
const PINK = "#ff90e8";

type FaceKind =
  | "message"
  | "heart"
  | "like"
  | "angry"
  | "laugh"
  | "surprise";

type PlacedIcon = {
  kind: FaceKind;
  color: string;
  /** position as a fraction of the canvas viewport (-1..1) */
  xFrac: number;
  yFrac: number;
  rotationZ: number;
  floatSpeed: number;
  floatAmp: number;
  spinSpeed: number;
};

/** Global mouse position in client coordinates (shared by both canvases). */
const mousePos = { x: -99999, y: -99999 };

/* ---------- geometries ---------- */

const bubbleShape = () => {
  const shape = new THREE.Shape();
  const w = 0.42;
  const h = 0.32;
  const r = 0.1;

  shape.moveTo(-w + r, -h);
  shape.lineTo(-0.16, -h);
  shape.lineTo(-0.31, -0.55); // tail tip (down-left, like the BrandMark)
  shape.lineTo(0.0, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);
  return shape;
};

const heartShape = () => {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.28);
  shape.bezierCurveTo(0.32, 0.02, 0.3, 0.32, 0, 0.14);
  shape.bezierCurveTo(-0.3, 0.32, -0.32, 0.02, 0, -0.28);
  return shape;
};

const thumbShape = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.22, -0.2);
  shape.lineTo(-0.05, -0.2);
  shape.lineTo(0.0, -0.05);
  shape.lineTo(0.16, -0.02);
  shape.quadraticCurveTo(0.3, 0.02, 0.28, 0.16);
  shape.quadraticCurveTo(0.26, 0.28, 0.1, 0.28);
  shape.lineTo(-0.22, 0.24);
  shape.quadraticCurveTo(-0.3, 0.22, -0.3, 0.12);
  shape.lineTo(-0.3, -0.12);
  shape.quadraticCurveTo(-0.3, -0.2, -0.22, -0.2);
  return shape;
};

const useFaceGeometries = () =>
  useMemo(() => {
    const extrude = (shape: THREE.Shape, depth = 0.08) =>
      new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 1,
      });

    const circle = (radius: number) => {
      const c = new THREE.Shape();
      c.absarc(0, 0, radius, 0, Math.PI * 2);
      return c;
    };

    return {
      tile: extrude(
        (() => {
          const s = new THREE.Shape();
          const w = 0.5;
          const r = 0.16;
          s.moveTo(-w + r, -w);
          s.lineTo(w - r, -w);
          s.quadraticCurveTo(w, -w, w, -w + r);
          s.lineTo(w, w - r);
          s.quadraticCurveTo(w, w, w - r, w);
          s.lineTo(-w + r, w);
          s.quadraticCurveTo(-w, w, -w, w - r);
          s.lineTo(-w, -w + r);
          s.quadraticCurveTo(-w, -w, -w + r, -w);
          return s;
        })(),
      ),
      bubble: extrude(bubbleShape()),
      bubbleDot: extrude(circle(0.06), 0.05),
      eye: extrude(circle(0.045)),
      mouth: extrude(
        (() => {
          const m = new THREE.Shape();
          m.moveTo(-0.14, 0);
          m.quadraticCurveTo(0, -0.16, 0.14, 0);
          m.quadraticCurveTo(0, 0.05, -0.14, 0);
          return m;
        })(),
      ),
      frown: extrude(
        (() => {
          const m = new THREE.Shape();
          m.moveTo(-0.13, -0.1);
          m.quadraticCurveTo(0, 0.04, 0.13, -0.1);
          m.quadraticCurveTo(0, -0.02, -0.13, -0.1);
          return m;
        })(),
      ),
      heart: extrude(heartShape()),
      thumb: extrude(thumbShape()),
      browAngry: extrude(
        (() => {
          const b = new THREE.Shape();
          b.moveTo(-0.14, 0);
          b.lineTo(0.1, 0.05);
          b.lineTo(0.1, 0.1);
          b.lineTo(-0.14, 0.05);
          b.lineTo(-0.14, 0);
          return b;
        })(),
      ),
      tongue: extrude(
        (() => {
          const t = new THREE.Shape();
          t.moveTo(-0.08, 0);
          t.lineTo(0.08, 0);
          t.quadraticCurveTo(0.08, -0.14, 0, -0.14);
          t.quadraticCurveTo(-0.08, -0.14, -0.08, 0);
          return t;
        })(),
      ),
      gasp: extrude(circle(0.09)),
    };
  }, []);

/* ---------- one floating, magnetic icon ---------- */

const MAGNET_RADIUS = 1.35; // world units
const MAGNET_MAX_OFFSET = 0.22; // world units — small, subtle pull
const INTRO_DURATION = 0.7; // seconds per icon

/** easeOutBack — overshoots past 1 for a bouncy pop */
const easeOutBack = (p: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
};

const Floating3DIcon = ({
  icon,
  rectRef,
  introDelay = 0,
}: {
  icon: PlacedIcon;
  rectRef: RefObject<DOMRect | null>;
  introDelay?: number;
}) => {
  const group = useRef<THREE.Group>(null);
  const geo = useFaceGeometries();
  const magnet = useRef({ x: 0, y: 0 });
  const introStart = useRef<number | null>(null);

  useFrame((state) => {
    if (!group.current) return;

    const { viewport } = state;
    const t = state.clock.elapsedTime;

    // Scale icons relative to the strip size so they fit any canvas
    const scale = Math.min(viewport.width / 2.6, viewport.height / 6, 1);

    // Intro: scale 0 -> 1 with a springy overshoot, staggered per icon
    if (introStart.current === null) {
      introStart.current = t + introDelay;
    }

    const introElapsed = t - introStart.current;
    const introProgress = Math.max(
      0,
      Math.min(introElapsed / INTRO_DURATION, 1),
    );
    const introScale = introProgress <= 0 ? 0 : easeOutBack(introProgress);

    const baseX = icon.xFrac * viewport.width * 0.5;
    const baseY = icon.yFrac * viewport.height * 0.5;

    // Magnetic attraction: pull gently toward the cursor when nearby
    let targetX = 0;
    let targetY = 0;

    const rect = rectRef.current;
    if (rect && rect.width > 0) {
      const ndcX = ((mousePos.x - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((mousePos.y - rect.top) / rect.height) * 2 - 1);

      // only react when the cursor is roughly beside the strip
      if (ndcX > -3 && ndcX < 3) {
        const mx = ndcX * viewport.width * 0.5;
        const my = ndcY * viewport.height * 0.5;

        const dx = mx - baseX;
        const dy = my - baseY;
        const dist = Math.hypot(dx, dy);

        if (dist < MAGNET_RADIUS && dist > 0.001) {
          const strength = Math.pow(1 - dist / MAGNET_RADIUS, 1.5);
          targetX = (dx / dist) * MAGNET_MAX_OFFSET * strength;
          targetY = (dy / dist) * MAGNET_MAX_OFFSET * strength;
        }
      }
    }

    // Smooth follow
    magnet.current.x += (targetX - magnet.current.x) * 0.12;
    magnet.current.y += (targetY - magnet.current.y) * 0.12;

    group.current.position.x = baseX + magnet.current.x;
    group.current.position.y =
      baseY + Math.sin(t * icon.floatSpeed + baseX * 3) * icon.floatAmp + magnet.current.y;
    group.current.rotation.y =
      Math.sin(t * icon.spinSpeed + baseY * 2) * 0.35;
    group.current.scale.setScalar(scale * introScale);
  });

  const bodyGeometry =
    icon.kind === "heart"
      ? geo.heart
      : icon.kind === "like"
        ? geo.thumb
        : icon.kind === "message"
          ? geo.bubble
          : geo.tile;

  const isEmojiTile =
    icon.kind === "angry" || icon.kind === "laugh" || icon.kind === "surprise";

  return (
    <group ref={group} rotation={[0, 0, icon.rotationZ]}>
      <mesh geometry={bodyGeometry}>
        <meshStandardMaterial color={icon.color} roughness={0.6} />
      </mesh>
      {/* ink outline — neubrutalist border in 3D */}
      <lineSegments>
        <edgesGeometry args={[bodyGeometry]} />
        <lineBasicMaterial color={INK} linewidth={2} />
      </lineSegments>

      {/* message bubble: three ink dots, like the BrandMark */}
      {icon.kind === "message" && (
        <>
          <mesh geometry={geo.bubbleDot} position={[-0.19, 0.02, 0.09]}>
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
          <mesh geometry={geo.bubbleDot} position={[0, 0.02, 0.09]}>
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
          <mesh geometry={geo.bubbleDot} position={[0.19, 0.02, 0.09]}>
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
        </>
      )}

      {isEmojiTile && (
        <>
          <mesh geometry={geo.eye} position={[-0.16, 0.1, 0.09]}>
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
          <mesh geometry={geo.eye} position={[0.16, 0.1, 0.09]}>
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
        </>
      )}

      {icon.kind === "laugh" && (
        <>
          <mesh geometry={geo.mouth} position={[0, -0.12, 0.09]} scale={1.3}>
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
          <mesh geometry={geo.tongue} position={[0, -0.2, 0.1]}>
            <meshStandardMaterial color={RED} roughness={0.6} />
          </mesh>
        </>
      )}

      {icon.kind === "angry" && (
        <>
          <mesh geometry={geo.browAngry} position={[-0.16, 0.22, 0.09]}>
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
          <mesh
            geometry={geo.browAngry}
            position={[0.16, 0.22, 0.09]}
            scale={[-1, 1, 1]}
          >
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
          <mesh geometry={geo.frown} position={[0, -0.14, 0.09]}>
            <meshStandardMaterial color={INK} roughness={0.5} />
          </mesh>
        </>
      )}

      {icon.kind === "surprise" && (
        <mesh geometry={geo.gasp} position={[0, -0.14, 0.09]}>
          <meshStandardMaterial color={INK} roughness={0.5} />
        </mesh>
      )}
    </group>
  );
};

/* ---------- scene ---------- */

const leftIcons: PlacedIcon[] = [
  { kind: "message", color: LIME, xFrac: -0.25, yFrac: 0.62, rotationZ: -0.15, floatSpeed: 0.9, floatAmp: 0.09, spinSpeed: 0.5 },
  { kind: "heart", color: PINK, xFrac: 0.2, yFrac: 0.05, rotationZ: 0.2, floatSpeed: 1.1, floatAmp: 0.1, spinSpeed: 0.35 },
  { kind: "angry", color: YELLOW, xFrac: -0.1, yFrac: -0.58, rotationZ: 0.18, floatSpeed: 0.8, floatAmp: 0.08, spinSpeed: 0.45 },
];

const rightIcons: PlacedIcon[] = [
  { kind: "message", color: PAPER, xFrac: 0.25, yFrac: 0.66, rotationZ: 0.12, floatSpeed: 1.0, floatAmp: 0.09, spinSpeed: 0.4 },
  { kind: "like", color: LIME, xFrac: -0.2, yFrac: 0.08, rotationZ: -0.18, floatSpeed: 1.15, floatAmp: 0.1, spinSpeed: 0.5 },
  { kind: "laugh", color: YELLOW, xFrac: 0.15, yFrac: -0.25, rotationZ: -0.2, floatSpeed: 1.0, floatAmp: 0.1, spinSpeed: 0.45 },
  { kind: "surprise", color: PAPER, xFrac: -0.05, yFrac: -0.62, rotationZ: 0.14, floatSpeed: 0.85, floatAmp: 0.08, spinSpeed: 0.42 },
];

const IconScene = ({
  icons,
  rectRef,
}: {
  icons: PlacedIcon[];
  rectRef: RefObject<DOMRect | null>;
}) => (
  <>
    <ambientLight intensity={0.9} />
    <directionalLight position={[3, 4, 5]} intensity={1.4} />
    {icons.map((icon, i) => (
      <Floating3DIcon key={i} icon={icon} rectRef={rectRef} introDelay={i * 0.12} />
    ))}
  </>
);

/* ---------- exported side decorations ---------- */

const Side3DIcons = ({ side }: { side: "left" | "right" }) => {
  const icons = side === "left" ? leftIcons : rightIcons;
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      rectRef.current = containerRef.current?.getBoundingClientRect() ?? null;
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    updateRect();
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        onCreated={markIconCanvasReady}
      >
        <Suspense fallback={null}>
          <IconScene icons={icons} rectRef={rectRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Side3DIcons;
