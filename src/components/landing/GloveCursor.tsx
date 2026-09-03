"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 48;

const HOTSPOT_X = 6;
const HOTSPOT_Y = 3;

const isFinePointerDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

const GloveCursor = () => {
  // Renders nothing on touch devices — decided before first paint.
  const [enabled, setEnabled] = useState(isFinePointerDevice);

  const cursorRef = useRef<HTMLDivElement>(null);
  const gloveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-check on device changes (e.g. docking a tablet with a mouse).
    const media = window.matchMedia("(pointer: fine)");

    const onChange = (event: MediaQueryListEvent) => setEnabled(event.matches);

    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const glove = gloveRef.current;

    if (!cursor || !glove) return;

    // Hide the native cursor only while the glove is active.
    const styleEl = document.createElement("style");
    styleEl.textContent = "* { cursor: none !important; }";
    document.head.appendChild(styleEl);

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let raf = 0;

    const setGloveState = (state: "default" | "hover" | "down") => {
      glove.style.transform =
        state === "hover"
          ? "rotate(-10deg) scale(1.12)"
          : state === "down"
            ? "scale(0.82) rotate(-6deg)"
            : "rotate(0deg) scale(1)";
    };

    const onMouseMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      cursor.style.opacity = "1";

      const interactive = (event.target as Element | null)?.closest?.(
        "a, button, input, textarea, label, [role='button']",
      );

      const isDown = glove.dataset.pressed === "true";
      setGloveState(isDown ? "down" : interactive ? "hover" : "default");
    };

    const onMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const onMouseDown = () => {
      glove.dataset.pressed = "true";
      setGloveState("down");
    };

    const onMouseUp = () => {
      glove.dataset.pressed = "false";
      setGloveState("default");
    };

    const loop = () => {
      // light easing — snappy but with a hint of trailing weight
      current.x += (target.x - current.x) * 0.4;
      current.y += (target.y - current.y) * 0.4;

      cursor.style.transform = `translate(${current.x - HOTSPOT_X}px, ${
        current.y - HOTSPOT_Y
      }px)`;

      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    raf = requestAnimationFrame(loop);

    return () => {
      document.head.removeChild(styleEl);
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-150"
      style={{ willChange: "transform" }}
    >
      <div
        ref={gloveRef}
        className="transition-transform duration-100 ease-out"
        style={{ willChange: "transform" }}
      >
        <img
          src="/cursor-image.png"
          alt=""
          width={CURSOR_SIZE}
          height={CURSOR_SIZE}
          draggable={false}
          className="select-none"
        />
      </div>
    </div>
  );
};

export default GloveCursor;
