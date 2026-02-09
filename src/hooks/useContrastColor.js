import { useRef, useEffect, useState, useCallback } from "react";

/**
 * Adaptive text color system.
 *
 * Attempts to sample the actual rendered background behind text positions
 * using a hidden canvas. When the background is a cross-origin iframe
 * (as it is now), pixel sampling is blocked — the hook falls back to
 * CSS mix-blend-mode which achieves the same goal at the compositing level.
 *
 * When the canvas app is served same-origin or has CORS headers,
 * the sampling path activates automatically and returns explicit colors.
 */

const SAMPLE_INTERVAL = 250; // ms between luminance checks

function luminance(r, g, b) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export function useContrastColor(count) {
  const [canSample, setCanSample] = useState(false);
  const [regions, setRegions] = useState(() => Array(count).fill(null));
  const positionsRef = useRef([]);
  const canvasRef = useRef(null);

  // Try to capture background once to determine if sampling is possible
  useEffect(() => {
    const testCanvas = document.createElement("canvas");
    testCanvas.width = 1;
    testCanvas.height = 1;
    const ctx = testCanvas.getContext("2d");

    const iframe = document.querySelector('iframe[title="Ralph Canvas"]');
    if (!iframe) return;

    const tryCapture = () => {
      try {
        ctx.drawImage(iframe, 0, 0, 1, 1);
        ctx.getImageData(0, 0, 1, 1); // throws if cross-origin
        setCanSample(true);
      } catch {
        setCanSample(false);
      }
    };

    iframe.addEventListener("load", tryCapture, { once: true });
    tryCapture();
  }, []);

  // Register a position to sample (as fraction of viewport: 0-1)
  const registerPosition = useCallback((index, x, y) => {
    positionsRef.current[index] = { x, y };
  }, []);

  // Sampling loop — only runs when cross-origin is not blocking
  useEffect(() => {
    if (!canSample) return;

    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const iframe = document.querySelector('iframe[title="Ralph Canvas"]');
    if (!iframe) return;

    const sample = () => {
      try {
        ctx.drawImage(iframe, 0, 0, canvas.width, canvas.height);
        const next = positionsRef.current.map((pos) => {
          if (!pos) return null;
          const px = Math.floor(pos.x * canvas.width);
          const py = Math.floor(pos.y * canvas.height);
          const data = ctx.getImageData(px, py, 1, 1).data;
          const lum = luminance(data[0], data[1], data[2]);
          return {
            isDark: lum < 0.5,
            luminance: lum,
            textColor: lum < 0.5 ? "#FFFFFF" : "#1A1A2E",
            mutedColor: lum < 0.5 ? "rgba(255,255,255,0.5)" : "rgba(26,26,46,0.5)",
          };
        });
        setRegions(next);
      } catch {
        // CORS blocked — stop trying
        setCanSample(false);
      }
    };

    const iv = setInterval(sample, SAMPLE_INTERVAL);
    sample();
    return () => clearInterval(iv);
  }, [canSample]);

  return { canSample, regions, registerPosition };
}

/**
 * CSS fallback styles for when pixel sampling is unavailable.
 * Uses mix-blend-mode: difference which composites text against
 * whatever is visually behind it — including cross-origin iframes.
 *
 * White text + difference = always contrasting.
 * The text color shifts in real-time as the canvas moves.
 */
export const adaptiveText = {
  color: "#FFFFFF",
  mixBlendMode: "difference",
};

export const adaptiveTextMuted = {
  color: "#BBBBBB",
  mixBlendMode: "difference",
};
