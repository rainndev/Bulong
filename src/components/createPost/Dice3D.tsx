"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const INK = "#1f1c14";
const LIME = "#a3e635";
const PAPER = "#fdfaf2";

/** Face orientations: local rotation that brings each face toward +Z */
const FACE_ROTATIONS: Record<number, [number, number, number]> = {
  1: [0, 0, 0],
  2: [0, 0, Math.PI / 2],
  3: [0, -Math.PI / 2, 0],
  4: [0, Math.PI / 2, 0],
  5: [Math.PI / 2, 0, 0],
  6: [-Math.PI / 2, 0, 0],
};

/** Pip layouts per face value (grid coords in [-1, 1]) */
const PIP_LAYOUTS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [
    [-0.42, 0.42],
    [0.42, -0.42],
  ],
  3: [
    [-0.42, 0.42],
    [0, 0],
    [0.42, -0.42],
  ],
  4: [
    [-0.42, 0.42],
    [0.42, 0.42],
    [-0.42, -0.42],
    [0.42, -0.42],
  ],
  5: [
    [-0.42, 0.42],
    [0.42, 0.42],
    [0, 0],
    [-0.42, -0.42],
    [0.42, -0.42],
  ],
  6: [
    [-0.42, 0.42],
    [0.42, 0.42],
    [-0.42, 0],
    [0.42, 0],
    [-0.42, -0.42],
    [0.42, -0.42],
  ],
};

/** Shared, cached geometries — created once, reused across renders */
const sharedGeometries = (() => {
  const plane = new THREE.PlaneGeometry(0.94, 0.94);
  const box = new THREE.BoxGeometry(1.001, 1.001, 1.001);
  return {
    facePlate: new THREE.PlaneGeometry(0.94, 0.94),
    faceEdge: new THREE.EdgesGeometry(plane),
    boxEdge: new THREE.EdgesGeometry(box),
    pip: new THREE.CircleGeometry(0.09, 12),
    box: new THREE.BoxGeometry(1, 1, 1),
  };
})();

const inkMaterial = new THREE.MeshStandardMaterial({
  color: INK,
  roughness: 0.5,
});
const paperMaterial = new THREE.MeshStandardMaterial({
  color: PAPER,
  roughness: 0.6,
});
const limeMaterial = new THREE.MeshStandardMaterial({
  color: LIME,
  roughness: 0.6,
});
const inkLineMaterial = new THREE.LineBasicMaterial({ color: INK });

type DiceFaceProps = {
  value: number;
  color: string;
  rotation: [number, number, number];
};

const DiceFace = ({ value, color, rotation }: DiceFaceProps) => {
  const pips = PIP_LAYOUTS[value];
  const faceMaterial = color === LIME ? limeMaterial : paperMaterial;

  return (
    <group rotation={rotation}>
      <mesh
        geometry={sharedGeometries.facePlate}
        material={faceMaterial}
        position={[0, 0, 0.501]}
      />
      <lineSegments
        geometry={sharedGeometries.faceEdge}
        material={inkLineMaterial}
        position={[0, 0, 0.502]}
      />
      {pips.map(([x, y], i) => (
        <mesh
          key={i}
          geometry={sharedGeometries.pip}
          material={inkMaterial}
          position={[x, y, 0.505]}
        />
      ))}
    </group>
  );
};

type DiceMeshProps = {
  rollTrigger: number;
};

const DiceMesh = ({ rollTrigger }: DiceMeshProps) => {
  const group = useRef<THREE.Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  const state = useRef({
    spinning: false,
    settled: true,
    progress: 1,
    duration: 0.9,
    startQuat: new THREE.Quaternion(),
    targetQuat: new THREE.Quaternion(),
  });

  const faceColors = useMemo(
    () => ({
      1: LIME,
      2: PAPER,
      3: PAPER,
      4: PAPER,
      5: PAPER,
      6: LIME,
    }),
    [],
  );

  const startRoll = () => {
    const s = state.current;
    const face = 1 + Math.floor(Math.random() * 6);

    s.spinning = true;
    s.settled = false;
    s.progress = 0;

    s.startQuat.copy(group.current?.quaternion ?? new THREE.Quaternion());

    // Full random tumbles plus final orientation showing the chosen face
    const tumbles = Math.PI * (4 + Math.random() * 3);
    const faceRot = FACE_ROTATIONS[face];
    const targetEuler = new THREE.Euler(
      faceRot[0] + tumbles,
      faceRot[1] + tumbles * 0.7,
      faceRot[2] + tumbles * 1.3,
    );
    s.targetQuat.setFromEuler(targetEuler);
  };

  // Roll when trigger increments (event-driven, not during render)
  useEffect(() => {
    if (rollTrigger > 0) {
      startRoll();
      invalidate();
    }
  }, [rollTrigger, invalidate]);

  useFrame((frameState, delta) => {
    const s = state.current;
    if (!s.spinning || !group.current) return;

    s.progress = Math.min(s.progress + delta / s.duration, 1);

    // easeOutCubic for a tumble that decelerates into place
    const eased = 1 - Math.pow(1 - s.progress, 3);

    const q = new THREE.Quaternion().slerpQuaternions(
      s.startQuat,
      s.targetQuat,
      eased,
    );
    group.current.quaternion.copy(q);

    if (s.progress >= 1) {
      s.spinning = false;
      s.settled = true;
    }
  });

  return (
    <group ref={group}>
      {/* cube body */}
      <mesh geometry={sharedGeometries.box} material={paperMaterial} />
      {/* ink edges — neubrutalist outline in 3D */}
      <lineSegments
        geometry={sharedGeometries.boxEdge}
        material={inkLineMaterial}
      />

      {(Object.keys(faceColors) as unknown as number[]).map((face) => (
        <DiceFace
          key={face}
          value={face}
          color={faceColors[face as keyof typeof faceColors]}
          rotation={FACE_ROTATIONS[face]}
        />
      ))}
    </group>
  );
};

/* ---------- exported dice button ---------- */

type Dice3DButtonProps = {
  onRoll: () => void;
  rollTrigger: number;
  disabled?: boolean;
};

const Dice3D = ({ onRoll, rollTrigger, disabled }: Dice3DButtonProps) => {
  // Low-end devices: cap DPR at 1 and skip MSAA — a 44px dice doesn't need more
  const isLowEnd = useMemo(() => {
    if (typeof window === "undefined") return false;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    return coarsePointer || lowCores;
  }, []);

  return (
    <button
      type="button"
      onClick={onRoll}
      disabled={disabled}
      aria-label="Roll dice for a random message"
      title="Roll for a random message"
      className="group cursor-pointer rounded-xl bg-white transition-all duration-100 hover:-rotate-3 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 md:border-2 md:border-[#1f1c14] md:shadow-[3px_3px_0_#1f1c14]"
    >
      <Canvas
        dpr={isLowEnd ? 1 : [1, 1.5]}
        gl={{ antialias: !isLowEnd, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 3.4], fov: 40 }}
        frameloop="demand"
        style={{ width: 44, height: 44 }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[2, 3, 4]} intensity={1.3} />
        <DiceMesh rollTrigger={rollTrigger} />
      </Canvas>
    </button>
  );
};

export default Dice3D;
