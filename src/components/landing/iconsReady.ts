/**
 * Tracks when the decorative 3D icon canvases have finished loading.
 * Both side canvases (left + right) must report ready.
 */

type Listener = () => void;

const REQUIRED_CANVASES = 2;

let readyCount = 0;
const listeners = new Set<Listener>();

export const markIconCanvasReady = () => {
  readyCount += 1;

  if (readyCount >= REQUIRED_CANVASES) {
    listeners.forEach((listener) => listener());
    listeners.clear();
  }
};

export const subscribeIconsReady = (listener: Listener): (() => void) => {
  if (readyCount >= REQUIRED_CANVASES) {
    listener();
    return () => {};
  }

  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
