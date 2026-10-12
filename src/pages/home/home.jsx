import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import Html from "../../assets/text.png";
import ReactPng from "../../assets/react.svg";
import Js from "../../assets/js.png";
import Css from "../../assets/css-3.png";
import Git from "../../assets/github.png";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const phrases = [
  "I build things for the web.",
  "I create modern web apps.",
  "I love turning ideas into code.",
];

const icons = [
  { src: Html, name: "HTML", glow: "rgba(249,115,22,0.55)" },
  { src: Css, name: "CSS", glow: "rgba(56,189,248,0.55)" },
  { src: Js, name: "JavaScript", glow: "rgba(250,204,21,0.55)" },
  { src: ReactPng, name: "React", glow: "rgba(34,211,238,0.55)" },
  { src: Git, name: "GitHub", glow: "rgba(96,165,250,0.55)" },
];

const ease = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*  Typing text (fixed: speed now actually changes while deleting)            */
/* -------------------------------------------------------------------------- */

function TypingText() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 32 : 68,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
      {text}
      <span className="ml-1 inline-block h-7 w-0.5 translate-y-1 animate-pulse bg-sky-400 sm:h-8 lg:h-9" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Interactive particle network (canvas)                                     */
/* -------------------------------------------------------------------------- */

function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(80, Math.floor((w * h) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }

        // gentle pull toward cursor
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 160) {
          if (!reduce) {
            p.x += mdx * 0.004;
            p.y += mdy * 0.004;
          }
          ctx.strokeStyle = `rgba(167,139,250,${(1 - md / 160) * 0.55})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(125,211,252,0.85)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(56,189,248,${(1 - d / 130) * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Magnetic wrapper – button leans toward the cursor                         */
/* -------------------------------------------------------------------------- */

function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  3D tilt code card with floating tech chips                                */
/* -------------------------------------------------------------------------- */

function CodeCard() {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [11, -11]), {
    stiffness: 140,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-13, 13]), {
    stiffness: 140,
    damping: 16,
  });

  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(380px circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), transparent 60%)`;

  const onMove = (e) => {
    if (reduce) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const float = (delay, dist = 10) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -dist, 0] },
          transition: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      style={{ perspective: 1100 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      ref={ref}
    >
      {/* soft halo behind the card */}
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-sky-500/25 via-blue-600/10 to-purple-500/25 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.35 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Window */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_30px_80px_-20px_rgba(56,189,248,0.35)] backdrop-blur-xl">
          {/* gradient border sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: glare }}
          />

          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
            <span className="ml-3 text-xs text-gray-500">developer.js</span>
          </div>

          {/* Code */}
          <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 sm:text-[13px]">
            <code>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-sky-300">developer</span>{" "}
              <span className="text-gray-400">=</span>{" "}
              <span className="text-gray-400">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-blue-300">name</span>
              <span className="text-gray-400">:</span>{" "}
              <span className="text-emerald-300">"Anshul"</span>
              <span className="text-gray-400">,</span>
              {"\n"}
              {"  "}
              <span className="text-blue-300">role</span>
              <span className="text-gray-400">:</span>{" "}
              <span className="text-emerald-300">"Web Developer"</span>
              <span className="text-gray-400">,</span>
              {"\n"}
              {"  "}
              <span className="text-blue-300">stack</span>
              <span className="text-gray-400">: [</span>
              <span className="text-emerald-300">"HTML"</span>
              <span className="text-gray-400">, </span>
              <span className="text-emerald-300">"CSS"</span>
              <span className="text-gray-400">, </span>
              <span className="text-emerald-300">"JS"</span>
              <span className="text-gray-400">, </span>
              <span className="text-emerald-300">"React"</span>
              <span className="text-gray-400">],</span>
              {"\n"}
              {"  "}
              <span className="text-blue-300">available</span>
              <span className="text-gray-400">:</span>{" "}
              <span className="text-orange-300">true</span>
              <span className="text-gray-400">,</span>
              {"\n"}
              <span className="text-gray-400">{"}"};</span>
              {"\n\n"}
              <span className="text-sky-300">developer</span>
              <span className="text-gray-400">.</span>
              <span className="text-yellow-200">build</span>
              <span className="text-gray-400">(</span>
              <span className="text-emerald-300">"your idea"</span>
              <span className="text-gray-400">);</span>
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-sky-400" />
            </code>
          </pre>
        </div>

        {/* Floating chips (pop out in 3D) */}
        <motion.div
          style={{ z: 70 }}
          {...float(0)}
          className="absolute -right-3 -top-6 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 shadow-lg backdrop-blur-md sm:-right-8"
        >
          <img src={ReactPng} alt="" className="h-5 w-5" />
          <span className="text-xs font-medium text-gray-200">React</span>
        </motion.div>

        <motion.div
          style={{ z: 90 }}
          {...float(1.2, 14)}
          className="absolute -left-3 top-1/2 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 shadow-lg backdrop-blur-md sm:-left-10"
        >
          <img src={Js} alt="" className="h-5 w-5 object-contain" />
          <span className="text-xs font-medium text-gray-200">JavaScript</span>
        </motion.div>

        <motion.div
          style={{ z: 60 }}
          {...float(2.1, 8)}
          className="absolute -bottom-6 right-6 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 shadow-lg backdrop-blur-md sm:right-10"
        >
          <img src={Git} alt="" className="h-5 w-5 object-contain" />
          <span className="text-xs font-medium text-gray-200">GitHub</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Staggered hero entrance                                                   */
/* -------------------------------------------------------------------------- */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease },
  },
};

/* -------------------------------------------------------------------------- */
/*  Home                                                                      */
/* -------------------------------------------------------------------------- */

export const Home = () => {
  const reduce = useReducedMotion();

  // cursor spotlight
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(56,189,248,0.13), transparent 65%)`;

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-black text-white"
    >
      {/* ---------------- Background layers ---------------- */}

      {/* aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={reduce ? {} : { x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-sky-600/25 blur-[120px]"
        />
        <motion.div
          animate={reduce ? {} : { x: [0, -70, 30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-48 -right-40 h-[36rem] w-[36rem] rounded-full bg-purple-600/25 blur-[130px]"
        />
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]"
        />
      </div>

      {/* faded grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 100%)",
        }}
      />

      {/* particle network that reacts to the cursor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParticleNetwork />
      </div>

      {/* cursor spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />

      {/* ---------------- Content ---------------- */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* Left: hero copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="min-w-0"
          >
            {/* status pill */}
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-4 py-2 text-xs text-emerald-300 backdrop-blur sm:text-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Web developer, open to new projects
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Anshul
                </span>
                {/* animated underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.9, ease }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-sky-400 to-purple-500"
                />
              </span>
            </motion.h1>

            <motion.h2
              variants={item}
              className="mt-6 min-h-[5.5rem] text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl"
            >
              <TypingText />
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-2 max-w-lg text-sm leading-7 text-gray-400 sm:text-base"
            >
              I'm a passionate web developer specializing in building
              responsive, user-friendly digital experiences with modern
              technologies.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
              <Magnetic>
                <motion.a
                  href="#projects"
                  whileHover={{ boxShadow: "0 0 40px rgba(99,102,241,0.55)" }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-7 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  {/* shine sweep */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">View my work</span>
                  <span className="relative ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </motion.a>
              </Magnetic>

              <Magnetic>
                <motion.a
                  href="/Anshul-CV.pdf"
                  download
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  Download CV <span className="ml-2">↓</span>
                </motion.a>
              </Magnetic>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={item} className="mt-12">
              <p className="text-xs font-medium text-gray-500">My tech stack</p>

              <div className="mt-4 flex w-fit max-w-full flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl sm:gap-4 sm:p-4">
                {icons.map((icon, i) => (
                  <motion.div
                    key={icon.name}
                    initial={{ opacity: 0, y: 18, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.45, ease }}
                    whileHover={{
                      scale: 1.15,
                      y: -6,
                      rotate: 4,
                      boxShadow: `0 10px 30px ${icon.glow}`,
                    }}
                    className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-white/5 bg-white/[0.05]"
                  >
                    <img
                      src={icon.src}
                      alt={icon.name}
                      className="h-7 w-7 object-contain"
                    />
                    {/* tooltip */}
                    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-[11px] text-gray-200 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {icon.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D code card */}
          <CodeCard />
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <motion.span
            animate={reduce ? {} : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-sky-300"
          />
        </span>
      </a>
    </section>
  );
};

export default Home;
