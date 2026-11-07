/**
 * Lightweight Canvas 2D fireworks engine for the Diwali 2026 overlay.
 *
 * - Golden rockets with luminous trails and sparks rise from the bottom edge.
 * - Each bursts into a spherical shell projected onto 2D: a per-particle depth
 *   value scales size and brightness (simulated 3D), with drag, gravity,
 *   motion-streak trails, glitter and additive glow.
 * - All particles live in a pre-allocated pool (no per-frame allocation).
 * - Glow comes from pre-rendered sprites (no per-frame shadowBlur).
 *
 * The engine only draws; the overlay owns timing, visibility and teardown.
 */

type Rgb = readonly [number, number, number];

const GOLD: Rgb = [255, 204, 112];
const DEEP_GOLD: Rgb = [232, 164, 58];
const WARM_WHITE: Rgb = [255, 242, 220];
const ELECTRIC_BLUE: Rgb = [84, 160, 255];
const PALETTE: readonly Rgb[] = [GOLD, DEEP_GOLD, WARM_WHITE, ELECTRIC_BLUE];
const C_GOLD = 0;
const C_DEEP = 1;
const C_WHITE = 2;
const C_BLUE = 3;

/** Seconds. The overlay fades the greeting on its own schedule. */
const FADE_START = 4.9;
const FADE_END = 5.7;

interface Particle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** 0 (far) … 1 (near) — drives size and brightness. */
  depth: number;
  age: number;
  life: number;
  size: number;
  color: number;
  drag: number;
  gravity: number;
  /** 0 = steady, otherwise glitter twinkle frequency. */
  twinkle: number;
  streak: number;
}

interface Rocket {
  active: boolean;
  launchAt: number;
  duration: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x: number;
  y: number;
  trailX: Float32Array;
  trailY: Float32Array;
  trailLen: number;
  burstScale: number;
  blueAccent: boolean;
  burst: boolean;
}

export interface FireworksOptions {
  /** Called once when the show has fully faded out. */
  onComplete?: () => void;
}

export interface FireworksHandle {
  /** Stops the loop and releases canvas memory. Idempotent. */
  destroy(): void;
}

const TRAIL_POINTS = 14;

function makeSprite(rgb: Rgb, size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  const [R, G, B] = rgb;
  grad.addColorStop(0, "rgba(255,255,250,1)");
  grad.addColorStop(0.18, `rgba(${R},${G},${B},1)`);
  grad.addColorStop(0.42, `rgba(${R},${G},${B},0.32)`);
  grad.addColorStop(1, `rgba(${R},${G},${B},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

function easeOutCubic(t: number): number {
  const u = 1 - t;
  return 1 - u * u * u;
}

export function startFireworks(
  canvas: HTMLCanvasElement,
  options: FireworksOptions = {},
): FireworksHandle {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");

  // ---- Device adaptation -------------------------------------------------
  const small = Math.min(window.innerWidth, window.innerHeight) < 600;
  const lowPower =
    small ||
    (typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4);
  const dprCap = small ? 1.5 : 2;
  const shellCount = lowPower ? 85 : 150;
  const glitterCount = lowPower ? 22 : 40;

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  // ---- Pre-rendered glow sprites -----------------------------------------
  const sprites = PALETTE.map((c) => makeSprite(c, 64));
  const strokeColors = PALETTE.map(([r, g, b]) => `rgb(${r},${g},${b})`);

  // ---- Pools -------------------------------------------------------------
  const ROCKETS = 3;
  const POOL = ROCKETS * (shellCount + glitterCount) + 260;
  const pool: Particle[] = Array.from({ length: POOL }, () => ({
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    depth: 0,
    age: 0,
    life: 0,
    size: 0,
    color: 0,
    drag: 0,
    gravity: 0,
    twinkle: 0,
    streak: 0,
  }));
  let cursor = 0;

  function spawn(): Particle | null {
    for (let i = 0; i < POOL; i++) {
      const p = pool[(cursor + i) % POOL];
      if (!p.active) {
        cursor = (cursor + i + 1) % POOL;
        p.active = true;
        p.age = 0;
        return p;
      }
    }
    return null; // Pool exhausted — silently skip.
  }

  // ---- Rockets: staggered, aimed at the upper-middle of the viewport ------
  const lanes = [
    { fx: 0.5, fy: 0.24, at: 0.0, scale: 1.1, blue: false },
    { fx: 0.27, fy: 0.31, at: 0.28, scale: 0.92, blue: true },
    { fx: 0.73, fy: 0.29, at: 0.52, scale: 0.95, blue: false },
  ];
  const rockets: Rocket[] = lanes.map((l) => ({
    active: false,
    launchAt: l.at,
    duration: 1.0 + Math.random() * 0.12,
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    x: 0,
    y: 0,
    trailX: new Float32Array(TRAIL_POINTS),
    trailY: new Float32Array(TRAIL_POINTS),
    trailLen: 0,
    burstScale: l.scale,
    blueAccent: l.blue,
    burst: false,
  }));

  function aimRocket(r: Rocket, idx: number) {
    const l = lanes[idx];
    // Narrow portrait screens: pull side bursts inward a little.
    const spread = width < 600 ? 0.8 : 1;
    r.x1 = width * (0.5 + (l.fx - 0.5) * spread) + (Math.random() - 0.5) * 24;
    r.y1 = height * l.fy + (Math.random() - 0.5) * 18;
    r.x0 = r.x1 + (Math.random() - 0.5) * width * 0.08;
    r.y0 = height + 12;
    r.x = r.x0;
    r.y = r.y0;
  }

  function explode(r: Rocket) {
    const base = Math.min(width, height);
    const radius = Math.max(70, Math.min(base * 0.22, 200)) * r.burstScale;
    const drag = 2.3;
    const speed = radius * drag; // terminal distance ≈ speed / drag
    const gravity = radius * 0.42;

    for (let i = 0; i < shellCount; i++) {
      const p = spawn();
      if (!p) break;
      // Uniform direction on a sphere, projected to the screen plane.
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const ring = Math.sqrt(1 - u * u);
      const s = speed * (0.88 + Math.random() * 0.24);
      p.x = r.x;
      p.y = r.y;
      p.vx = Math.cos(theta) * ring * s;
      p.vy = Math.sin(theta) * ring * s;
      p.depth = (u + 1) / 2;
      p.life = 1.7 + Math.random() * 0.7;
      p.size = 1.4 + Math.random() * 1.0;
      p.drag = drag * (0.92 + Math.random() * 0.16);
      p.gravity = gravity;
      p.twinkle = Math.random() < 0.25 ? 14 + Math.random() * 12 : 0;
      p.streak = 0.11 + Math.random() * 0.05;
      const roll = Math.random();
      p.color =
        r.blueAccent && roll < 0.22
          ? C_BLUE
          : roll < 0.12
            ? C_WHITE
            : roll < 0.55
              ? C_GOLD
              : C_DEEP;
    }

    // Slow, sparkling glitter that drifts and twinkles after the shell.
    for (let i = 0; i < glitterCount; i++) {
      const p = spawn();
      if (!p) break;
      const a = Math.random() * Math.PI * 2;
      const s = speed * (0.15 + Math.random() * 0.45);
      p.x = r.x;
      p.y = r.y;
      p.vx = Math.cos(a) * s;
      p.vy = Math.sin(a) * s;
      p.depth = Math.random();
      p.life = 2.0 + Math.random() * 0.9;
      p.size = 0.7 + Math.random() * 0.7;
      p.drag = 2.6;
      p.gravity = gravity * 0.6;
      p.twinkle = 18 + Math.random() * 16;
      p.streak = 0;
      p.color = Math.random() < 0.7 ? C_WHITE : C_GOLD;
    }

    // Brief, soft, localised bloom (never a full-screen flash).
    const flash = spawn();
    if (flash) {
      flash.x = r.x;
      flash.y = r.y;
      flash.vx = 0;
      flash.vy = 0;
      flash.depth = 1;
      flash.life = 0.32;
      flash.size = radius * 0.11;
      flash.drag = 0;
      flash.gravity = 0;
      flash.twinkle = 0;
      flash.streak = -1; // marker: bloom
      flash.color = C_GOLD;
    }
  }

  function emitSpark(r: Rocket) {
    const p = spawn();
    if (!p) return;
    p.x = r.x + (Math.random() - 0.5) * 2;
    p.y = r.y + 4;
    p.vx = (Math.random() - 0.5) * 40;
    p.vy = 20 + Math.random() * 50;
    p.depth = 0.5 + Math.random() * 0.5;
    p.life = 0.25 + Math.random() * 0.3;
    p.size = 0.6 + Math.random() * 0.6;
    p.drag = 3;
    p.gravity = 120;
    p.twinkle = 30;
    p.streak = 0;
    p.color = Math.random() < 0.5 ? C_GOLD : C_WHITE;
  }

  // ---- Loop --------------------------------------------------------------
  let elapsed = 0;
  let last = -1;
  let raf = 0;
  let destroyed = false;
  let completed = false;
  let pendingResize = false;

  const onResize = () => {
    pendingResize = true;
  };
  window.addEventListener("resize", onResize, { passive: true });

  function update(dt: number) {
    for (let i = 0; i < rockets.length; i++) {
      const r = rockets[i];
      if (r.burst) continue;
      if (!r.active) {
        if (elapsed >= r.launchAt) {
          r.active = true;
          aimRocket(r, i);
        } else continue;
      }
      const t = Math.min(1, (elapsed - r.launchAt) / r.duration);
      const e = easeOutCubic(t);
      r.x = r.x0 + (r.x1 - r.x0) * e + Math.sin(t * 9 + i) * 1.2;
      r.y = r.y0 + (r.y1 - r.y0) * e;
      // Shift trail history.
      for (let k = TRAIL_POINTS - 1; k > 0; k--) {
        r.trailX[k] = r.trailX[k - 1];
        r.trailY[k] = r.trailY[k - 1];
      }
      r.trailX[0] = r.x;
      r.trailY[0] = r.y;
      r.trailLen = Math.min(TRAIL_POINTS, r.trailLen + 1);
      if (Math.random() < 0.8) emitSpark(r);
      if (t >= 1) {
        r.burst = true;
        r.active = false;
        explode(r);
      }
    }

    for (let i = 0; i < POOL; i++) {
      const p = pool[i];
      if (!p.active) continue;
      p.age += dt;
      if (p.age >= p.life) {
        p.active = false;
        continue;
      }
      const k = Math.exp(-p.drag * dt);
      p.vx *= k;
      p.vy = p.vy * k + p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    const master =
      elapsed < FADE_START
        ? 1
        : Math.max(0, 1 - (elapsed - FADE_START) / (FADE_END - FADE_START));
    if (master <= 0) return;
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    // Rockets: tapered luminous trail + bright head.
    for (const r of rockets) {
      if (!r.active || r.trailLen < 2) continue;
      for (let k = 1; k < r.trailLen; k++) {
        const fade = 1 - k / r.trailLen;
        ctx.globalAlpha = 0.55 * fade * master;
        ctx.strokeStyle = strokeColors[k < 3 ? C_WHITE : C_GOLD];
        ctx.lineWidth = 2.4 * fade + 0.4;
        ctx.beginPath();
        ctx.moveTo(r.trailX[k - 1], r.trailY[k - 1]);
        ctx.lineTo(r.trailX[k], r.trailY[k]);
        ctx.stroke();
      }
      ctx.globalAlpha = master;
      ctx.drawImage(sprites[C_GOLD], r.x - 12, r.y - 12, 24, 24);
    }

    // Particles.
    for (let i = 0; i < POOL; i++) {
      const p = pool[i];
      if (!p.active) continue;
      const lifeT = p.age / p.life;

      if (p.streak < 0) {
        // Bloom: quick ease-out glow.
        const a = (1 - lifeT) * (1 - lifeT) * 0.45 * master;
        const s = p.size * (2.2 + lifeT * 1.5) * 2;
        ctx.globalAlpha = a;
        ctx.drawImage(sprites[p.color], p.x - s / 2, p.y - s / 2, s, s);
        continue;
      }

      // Brightness: quick ignition, long natural decay, depth-weighted.
      // Bright for the first ~40% of life, then a natural ember fade.
      let a =
        lifeT < 0.04
          ? lifeT / 0.04
          : lifeT < 0.4
            ? 1
            : (1 - (lifeT - 0.4) / 0.6) ** 1.4;
      a *= 0.55 + 0.45 * p.depth;
      if (p.twinkle > 0 && lifeT > 0.35) {
        a *= 0.55 + 0.45 * Math.sin(p.age * p.twinkle + i);
      }
      a *= master;
      if (a <= 0.01) continue;

      const size = p.size * (0.65 + 0.7 * p.depth);

      if (p.streak > 0) {
        ctx.globalAlpha = a * 0.75;
        ctx.strokeStyle = strokeColors[p.color];
        ctx.lineWidth = size * 1.1;
        ctx.beginPath();
        ctx.moveTo(p.x - p.vx * p.streak, p.y - p.vy * p.streak);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      const s = size * 6.5;
      ctx.globalAlpha = a;
      ctx.drawImage(sprites[p.color], p.x - s / 2, p.y - s / 2, s, s);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  function frame(ts: number) {
    if (destroyed) return;
    if (pendingResize) {
      pendingResize = false;
      resize();
    }
    // Clamp dt so a stalled frame never causes a jump.
    const dt = last < 0 ? 1 / 60 : Math.min(0.05, (ts - last) / 1000);
    last = ts;
    elapsed += dt;
    update(dt);
    draw();
    if (elapsed >= FADE_END) {
      if (!completed) {
        completed = true;
        handle.destroy();
        options.onComplete?.();
      }
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  const handle: FireworksHandle = {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      try {
        ctx.clearRect(0, 0, width, height);
      } catch {
        // Ignore.
      }
      // Release backing-store memory promptly.
      canvas.width = 0;
      canvas.height = 0;
      for (const s of sprites) {
        s.width = 0;
        s.height = 0;
      }
    },
  };

  raf = requestAnimationFrame(frame);
  return handle;
}
