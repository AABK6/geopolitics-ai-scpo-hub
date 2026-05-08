// Cosmic stage controller.
//
// Receives the global scroll progress and interpolates every visual layer:
// - sky gradient (top/mid/bottom colours)
// - star density via a lightweight canvas
// - Earth curvature (translateY + scale) and orbital ring visibility
// - rocket Y, scale, rotation, exhaust thrust, shake
// - launchpad fade-out, scroll hint, altitude HUD label

import { clamp, lerp, remap, smoothstep, rampColor, rgb, hex } from "./util/lerp.js";

// ---------- Colour ramps ----------

const SKY_TOP = [
  { at: 0.0,  color: hex("#0a0e1a") },
  { at: 0.08, color: hex("#0d1128") },
  { at: 0.22, color: hex("#071028") },
  { at: 0.45, color: hex("#030820") },
  { at: 0.7,  color: hex("#000614") },
  { at: 1.0,  color: hex("#000005") },
];

const SKY_MID = [
  { at: 0.0,  color: hex("#141722") },
  { at: 0.08, color: hex("#20142e") },
  { at: 0.22, color: hex("#0c2040") },
  { at: 0.45, color: hex("#071530") },
  { at: 0.7,  color: hex("#040a1c") },
  { at: 1.0,  color: hex("#01030c") },
];

const SKY_BOTTOM = [
  { at: 0.0,  color: hex("#201a18") },
  { at: 0.08, color: hex("#4a1c0c") },
  { at: 0.22, color: hex("#1a3066") },
  { at: 0.45, color: hex("#102050") },
  { at: 0.7,  color: hex("#081426") },
  { at: 1.0,  color: hex("#020614") },
];

// ---------- Starfield ----------

class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.stars = [];
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this._resize();
    this._generate();
    window.addEventListener("resize", () => {
      this._resize();
      this._generate();
    });
  }

  _resize() {
    const { canvas } = this;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * this.dpr;
    canvas.height = h * this.dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  _generate() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const density = Math.max(220, Math.round((w * h) / 7200));
    this.stars = new Array(density).fill(0).map(() => {
      const layer = Math.random() < 0.15 ? 2 : Math.random() < 0.5 ? 1 : 0;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: layer === 2 ? 1.4 + Math.random() * 1.1 : layer === 1 ? 0.9 + Math.random() * 0.6 : 0.5 + Math.random() * 0.4,
        layer,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      };
    });
  }

  render(t, progress) {
    const { ctx, canvas } = this;
    const w = canvas.width / this.dpr;
    const h = canvas.height / this.dpr;
    ctx.clearRect(0, 0, w, h);

    const base = smoothstep(remap(progress, 0.04, 0.4, 0, 1));
    if (base <= 0) return;

    // Subtle parallax drift that speeds up at altitude
    const drift = progress * 40;

    for (const s of this.stars) {
      const twinkle = 0.6 + 0.4 * Math.sin(t * 0.001 * s.speed + s.phase);
      const layerBoost = s.layer === 2 ? 1 : s.layer === 1 ? 0.8 : 0.55;
      const a = base * twinkle * layerBoost;
      if (a <= 0.02) continue;
      ctx.globalAlpha = a;
      ctx.fillStyle = s.layer === 2 ? "#ffffff" : s.layer === 1 ? "#dce6ff" : "#9fb0d4";
      const y = (s.y + drift * (s.layer + 1) * 0.25) % h;
      ctx.beginPath();
      ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

// ---------- Stage controller ----------

export class Stage {
  constructor({ root, canvas, rocket, hud, hint, launchpad, orbitsGroup }) {
    this.root = root;
    this.canvas = canvas;
    this.rocket = rocket;
    this.hud = hud;
    this.hint = hint;
    this.launchpad = launchpad;
    this.orbitsGroup = orbitsGroup;

    this.stars = new Starfield(canvas);

    this._populateSatellites();
    this._raf = this._raf.bind(this);
    this._startTime = performance.now();
    this._lastProgress = 0;
    requestAnimationFrame(this._raf);
  }

  _populateSatellites() {
    if (!this.orbitsGroup) return;
    const svgNS = "http://www.w3.org/2000/svg";
    const orbits = [
      { r: 1060, count: 6, color: "#7df9ff" },
      { r: 1180, count: 7, color: "#ffffff" },
      { r: 1320, count: 5, color: "#ff6b2b" },
      { r: 1480, count: 4, color: "#b48cff" },
    ];
    orbits.forEach((o, oi) => {
      for (let i = 0; i < o.count; i++) {
        const angle = (Math.PI * 2 * i) / o.count + oi * 0.5;
        const x = Math.cos(angle) * o.r;
        const y = Math.sin(angle) * o.r;
        const c = document.createElementNS(svgNS, "circle");
        c.setAttribute("cx", x);
        c.setAttribute("cy", y);
        c.setAttribute("r", 10);
        c.setAttribute("fill", o.color);
        c.setAttribute("opacity", "0");
        c.dataset.orbit = String(oi);
        c.dataset.angle = String(angle);
        c.dataset.radius = String(o.r);
        this.orbitsGroup.appendChild(c);
      }
    });
  }

  update(progress) {
    this._lastProgress = progress;

    const root = this.root.style;
    const vh = window.innerHeight;

    // ---- Sky colours ----
    const top = rgb(rampColor(SKY_TOP, progress));
    const mid = rgb(rampColor(SKY_MID, progress));
    const bot = rgb(rampColor(SKY_BOTTOM, progress));
    root.setProperty("--sky-top", top);
    root.setProperty("--sky-mid", mid);
    root.setProperty("--sky-bottom", bot);

    // ---- Stars opacity ----
    const starsOpacity = smoothstep(remap(progress, 0.04, 0.32, 0, 1));
    root.setProperty("--stars-opacity", starsOpacity.toFixed(3));

    // ---- Earth position & scale ----
    // Stops chosen so the horizon curve appears around 0.2 and Earth recedes past 0.75.
    const earthStops = [
      { at: 0.0,  y: 320, s: 1.3 },
      { at: 0.18, y: 260, s: 1.4 },
      { at: 0.35, y: 210, s: 1.25 },
      { at: 0.55, y: 170, s: 1.0 },
      { at: 0.78, y: 120, s: 0.6 },
      { at: 0.92, y: 80,  s: 0.3 },
      { at: 1.0,  y: 75,  s: 0.22 },
    ];
    const { y: earthY, s: earthS } = interpStops(earthStops, progress);
    root.setProperty("--earth-y", `${earthY}vh`);
    root.setProperty("--earth-scale", earthS.toFixed(3));

    // ---- Orbital rings ----
    const orbitsOp = smoothstep(remap(progress, 0.42, 0.55, 0, 1))
      * smoothstep(remap(progress, 1.0, 0.85, 0, 1));
    root.setProperty("--orbits-opacity", orbitsOp.toFixed(3));

    // Fade satellites in as the Act I → Act II handoff approaches.
    if (this.orbitsGroup) {
      const sats = this.orbitsGroup.querySelectorAll("circle");
      const satBase = smoothstep(remap(progress, 0.46, 0.60, 0, 1))
        * smoothstep(remap(progress, 0.88, 0.78, 0, 1));
      sats.forEach((c, i) => {
        const delay = i * 0.02;
        const op = clamp(satBase - delay, 0, 1);
        c.setAttribute("opacity", op.toFixed(3));
      });
    }

    // ---- Rocket ----
    // Stays on the pad during the first ~5% of scroll, ignites, then rises.
    const igniteT = smoothstep(remap(progress, 0.02, 0.08, 0, 1));
    const flightT = smoothstep(remap(progress, 0.06, 0.9, 0, 1));

    // Y in px (negative = up). From 0 (on pad) to roughly -75vh at peak, then
    // slight recede past 0.9 as the rocket drifts into deep space.
    const rocketY = lerp(0, -vh * 0.72, flightT);
    const driftY  = smoothstep(remap(progress, 0.9, 1.0, 0, 1)) * -vh * 0.08;
    root.setProperty("--rocket-y", `${rocketY + driftY}px`);

    // Gentle sinusoidal sway during mid-flight.
    // On wide viewports, the rocket lives in a dedicated visual lane:
    //   - liftoff (progress < ~0.08): right lane, so hero text reads on the left
    //   - after liftoff: rocket pans to the left lane, and reading content
    //     takes the right column.
    const isWide = window.innerWidth >= 520;
    const sway = Math.sin(progress * Math.PI * 4) * 10 * smoothstep(remap(progress, 0.12, 0.7, 0, 1));
    let laneShift = 0;
    if (isWide) {
      const w = window.innerWidth;
      // During flight the rocket/cluster live far to the left, leaving a
      // generous right-hand reading column — like a broadsheet article with
      // an illustration pinned to the outer margin. The pan completes well
      // before Act I begins (at progress 0.10) so the rocket is already
      // parked in the outer lane by the time the reader reaches the
      // article's opening paragraphs — no crossing the reading column.
      const right = w * 0.22;   // right lane offset during liftoff
      const left  = -w * 0.36;  // far-left lane offset during flight
      const panT = smoothstep(remap(progress, 0.025, 0.075, 0, 1));
      laneShift = lerp(right, left, panT);
    }
    root.setProperty("--rocket-x", `${(sway + laneShift).toFixed(1)}px`);

    // Keep the launchpad tower lined up with the rocket during early liftoff.
    // Tower fades with the pad, so we only need to track it briefly.
    if (isWide) {
      const towerX = laneShift;
      root.setProperty("--pad-tower-x", `${towerX.toFixed(1)}px`);
    } else {
      root.setProperty("--pad-tower-x", "0px");
    }

    // Subtle rotation: lean slightly, then straighten out in space
    const rot = Math.sin(progress * Math.PI * 2) * 2.2 * smoothstep(remap(progress, 0.1, 0.6, 0, 1));
    root.setProperty("--rocket-rot", `${rot.toFixed(2)}deg`);

    // Rocket grows from launch-pad scale into full flight scale, then
    // recedes as it drifts into deep space.
    const grow = lerp(0.45, 1.0, smoothstep(remap(progress, 0.0, 0.14, 0, 1)));
    const recede = lerp(1.0, 0.62, smoothstep(remap(progress, 0.75, 1.0, 0, 1)));
    const rScale = grow * recede;
    root.setProperty("--rocket-scale", rScale.toFixed(3));

    // Rocket flies the whole of Act I, then fades out right as the reader
    // hits the pinned gallery ("The wager, in four frames" at progress
    // 0.42). The satellite cluster takes the stage from there on — so
    // when the pin releases, only the cluster comes back, not the rocket.
    const rocketOpacity = 1 - smoothstep(remap(progress, 0.38, 0.42, 0, 1));
    root.setProperty("--rocket-opacity", rocketOpacity.toFixed(3));

    // Thrust: full during liftoff, starts cutting out as the rocket begins
    // its transformation into the satellite cluster, just before the
    // gallery pin engages at progress 0.42.
    const clusterMix = smoothstep(remap(progress, 0.34, 0.42, 0, 1));
    const thrust = igniteT * (1 - smoothstep(remap(progress, 0.30, 0.40, 0, 1)) * 0.95);
    root.setProperty("--thrust", thrust.toFixed(3));

    // ---- Satellite cluster (replaces the rocket above ~1000 km) ----
    // Cross-fade from rocket to cluster BEFORE the gallery pin
    // (rocket fades 0.38–0.42, cluster fades in 0.34–0.42). The
    // gallery hides both via stage-muted while pinned. When the
    // gallery releases, the cluster is already at full strength.
    root.setProperty("--cluster-mix", clusterMix.toFixed(3));

    // Cluster starts high (where the rocket was climbing to) and gently drifts
    // as we head toward GEO + deep space. The starting Y is negative so the
    // cluster appears up high, matching where the eye is tracking the rocket.
    const clusterStartY = -vh * 0.08;
    const clusterEndY = -vh * 0.04;
    const clusterY = lerp(clusterStartY, clusterEndY, smoothstep(remap(progress, 0.40, 0.95, 0, 1)));
    root.setProperty("--cluster-y", `${clusterY.toFixed(1)}px`);

    // Slow ambient rotation for cinematic feel — just a subtle yaw
    const clusterRot = (progress - 0.40) * 14;
    root.setProperty("--cluster-rot", `${clusterRot.toFixed(2)}deg`);

    // Cluster grows in as the cross-fade happens; settles at full size
    // by the time the gallery pin engages.
    const clusterGrow = lerp(0.55, 1.1, smoothstep(remap(progress, 0.32, 0.50, 0, 1)));
    const clusterRecede = lerp(1.0, 0.5, smoothstep(remap(progress, 0.78, 1.0, 0, 1)));
    root.setProperty("--cluster-scale", (clusterGrow * clusterRecede).toFixed(3));

    // Shake during ignition
    const shaking = progress > 0.015 && progress < 0.12 ? "1" : "0";
    if (this.rocket && this.rocket.dataset.shaking !== shaking) {
      this.rocket.dataset.shaking = shaking;
    }

    // ---- Launchpad ----
    const padOpacity = 1 - smoothstep(remap(progress, 0.03, 0.12, 0, 1));
    root.setProperty("--launchpad-opacity", padOpacity.toFixed(3));

    // T‑0 release: umbilical arms swing away from the rocket and hold-down
    // clamps drop back *just before* the pad fades. This gives a clear
    // "attachment → detachment" beat right as the engines light up.
    const padRelease = smoothstep(remap(progress, 0.012, 0.05, 0, 1));
    root.setProperty("--pad-release", padRelease.toFixed(3));

    // ---- Scroll hint ----
    const hintOpacity = 1 - smoothstep(remap(progress, 0.01, 0.08, 0, 1));
    root.setProperty("--hint-opacity", hintOpacity.toFixed(3));

    // ---- Altitude HUD ----
    if (this.hud) {
      this.hud.textContent = altitudeLabel(progress);
    }
  }

  _raf(t) {
    const elapsed = t - this._startTime;
    this.stars.render(elapsed, this._lastProgress);
    requestAnimationFrame(this._raf);
  }
}

// ---------- helpers ----------

function interpStops(stops, t) {
  const x = clamp(t, 0, 1);
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (x >= a.at && x <= b.at) {
      const local = (x - a.at) / (b.at - a.at);
      const e = smoothstep(local);
      const out = {};
      for (const k of Object.keys(a)) {
        if (k === "at") continue;
        out[k] = lerp(a[k], b[k], e);
      }
      return out;
    }
  }
  const last = stops[stops.length - 1];
  const { at: _, ...rest } = last;
  return rest;
}

function altitudeLabel(progress) {
  // Non-linear: lots of detail below 500 km, compresses at GEO + beyond.
  if (progress < 0.08) {
    // countdown style before liftoff / early flight
    const t = Math.max(0, 10 - Math.round(progress * 120));
    return `T−00:${String(t).padStart(2, "0")}`;
  }
  if (progress < 0.28) {
    const km = Math.round(lerp(12, 180, remap(progress, 0.08, 0.28, 0, 1)));
    return `${km.toLocaleString()} KM`;
  }
  if (progress < 0.52) {
    const km = Math.round(lerp(180, 2000, remap(progress, 0.28, 0.52, 0, 1)));
    return `${km.toLocaleString()} KM · LEO`;
  }
  if (progress < 0.78) {
    const km = Math.round(lerp(2000, 36000, remap(progress, 0.52, 0.78, 0, 1)));
    return `${km.toLocaleString()} KM · GEO`;
  }
  if (progress < 0.95) {
    return `BEYOND GEO`;
  }
  return `DEEP SPACE`;
}
