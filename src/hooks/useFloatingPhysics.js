import { useRef, useEffect, useCallback } from "react";

/**
 * Freeform floating physics engine.
 * Each piece drifts, rotates slightly, and softly bumps neighbours.
 * Feels like objects floating on water.
 */

const DRIFT_SPEED = 0.12;
const ROTATION_SPEED = 0.015; // degrees per frame
const REPULSION_STRENGTH = 0.18;
const DAMPING = 0.97;
const MAX_OFFSET = 12; // px wander range
const MAX_ROT = 2.5; // max degrees of tilt
const BOUNCE_BACK = 0.008;
const ROT_BOUNCE = 0.006;

export function useFloatingPhysics(count) {
  const bodiesRef = useRef([]);
  const rafRef = useRef(null);
  const nodesRef = useRef([]);
  const baseRotRef = useRef([]); // store the initial CSS rotation per node

  useEffect(() => {
    const bodies = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      bodies.push({
        x: 0,
        y: 0,
        r: 0, // rotation offset in degrees
        vx: Math.cos(angle) * DRIFT_SPEED,
        vy: Math.sin(angle) * DRIFT_SPEED,
        vr: (Math.random() - 0.5) * ROTATION_SPEED * 2,
      });
    }
    bodiesRef.current = bodies;
  }, [count]);

  const registerNode = useCallback((index, node, baseRotation = 0) => {
    nodesRef.current[index] = node;
    baseRotRef.current[index] = baseRotation;
  }, []);

  const getRect = (node) => {
    if (!node) return null;
    return node.getBoundingClientRect();
  };

  useEffect(() => {
    let running = true;

    const step = () => {
      if (!running) return;
      const bodies = bodiesRef.current;
      const nodes = nodesRef.current;
      const rects = nodes.map(getRect);

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (!b) continue;

        // Random drift nudges
        if (Math.random() < 0.008) {
          const a = Math.random() * Math.PI * 2;
          b.vx += Math.cos(a) * DRIFT_SPEED * 0.6;
          b.vy += Math.sin(a) * DRIFT_SPEED * 0.6;
          b.vr += (Math.random() - 0.5) * ROTATION_SPEED;
        }

        // Soft repulsion between nearby bodies
        const ri = rects[i];
        if (ri) {
          for (let j = i + 1; j < bodies.length; j++) {
            const rj = rects[j];
            if (!rj) continue;

            const gap = 4;
            const overlapX =
              ri.left + b.x - gap < rj.right + bodies[j].x &&
              ri.right + b.x + gap > rj.left + bodies[j].x;
            const overlapY =
              ri.top + b.y - gap < rj.bottom + bodies[j].y &&
              ri.bottom + b.y + gap > rj.top + bodies[j].y;

            if (overlapX && overlapY) {
              const cix = ri.left + ri.width / 2 + b.x;
              const ciy = ri.top + ri.height / 2 + b.y;
              const cjx = rj.left + rj.width / 2 + bodies[j].x;
              const cjy = rj.top + rj.height / 2 + bodies[j].y;

              let dx = cix - cjx;
              let dy = ciy - cjy;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              dx /= dist;
              dy /= dist;

              b.vx += dx * REPULSION_STRENGTH;
              b.vy += dy * REPULSION_STRENGTH;
              bodies[j].vx -= dx * REPULSION_STRENGTH;
              bodies[j].vy -= dy * REPULSION_STRENGTH;

              // Bump rotation on contact
              b.vr += (Math.random() - 0.5) * 0.08;
              bodies[j].vr += (Math.random() - 0.5) * 0.08;
            }
          }
        }

        // Spring back to origin
        b.vx -= b.x * BOUNCE_BACK;
        b.vy -= b.y * BOUNCE_BACK;
        b.vr -= b.r * ROT_BOUNCE;

        // Damping
        b.vx *= DAMPING;
        b.vy *= DAMPING;
        b.vr *= DAMPING;

        // Integrate
        b.x += b.vx;
        b.y += b.vy;
        b.r += b.vr;

        // Clamp
        b.x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, b.x));
        b.y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, b.y));
        b.r = Math.max(-MAX_ROT, Math.min(MAX_ROT, b.r));

        // Apply transform — compose with base rotation
        const node = nodes[i];
        if (node) {
          const baseR = baseRotRef.current[i] || 0;
          node.style.transform = `translate(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px) rotate(${(baseR + b.r).toFixed(2)}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return registerNode;
}
