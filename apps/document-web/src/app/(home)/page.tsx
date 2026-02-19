"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─────────────── Scroll-reveal wrapper ─────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────── Code line helper ─────────────── */

function CL({
  children,
  indent = 0,
}: {
  children?: ReactNode;
  indent?: number;
}) {
  return (
    <div className="whitespace-pre" style={{ paddingLeft: `${indent * 2}ch` }}>
      {children ?? "\u00A0"}
    </div>
  );
}

/* ─────────────── Decorative divider ─────────────── */

function Divider() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 py-1">
      <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
        <div className="h-1 w-1 rotate-45 rounded-[1px] bg-slate-200" />
        <div className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-[#0693e3]/30" />
        <div className="h-1 w-1 rotate-45 rounded-[1px] bg-slate-200" />
      </div>
    </div>
  );
}

/* ─────────────── Feature data ─────────────── */

const FEATURES = [
  {
    title: "Cross-Platform",
    desc: "Write once, deploy to iOS, Android, and Web. Every component adapts seamlessly across platforms.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.10)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-5 w-5"
      >
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Tailwind CSS",
    desc: "className prop on every component via Uniwind. Style with Tailwind utilities you already know.",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.33 10.79 14.44 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.67 7.21 14.56 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.33 16.79 9.44 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.67 13.21 9.56 12 7 12z" />
      </svg>
    ),
  },
  {
    title: "TypeScript-First",
    desc: "Full type safety with className augmentation. Autocomplete for every prop, variant, and size.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.10)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-5 w-5"
      >
        <path d="M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M14.882 4.632l-5.764 14.736" />
      </svg>
    ),
  },
  {
    title: "Composable",
    desc: "Card, CardHeader, CardContent — build complex UI from simple primitives with variant-based design.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-5 w-5"
      >
        <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-white"
    >
      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes floatAlt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-4deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.12; transform: translate(-50%,-50%) scale(1); }
          50% { opacity: 0.22; transform: translate(-50%,-50%) scale(1.04); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(20px, -15px); }
          66% { transform: translate(-10px, 10px); }
        }
      `}</style>

      {/* ── Background: dot grid ── */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(6,147,227,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Background: animated gradient orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-48 right-[20%] h-150 w-150 rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(6,147,227,0.10), transparent 70%)",
            animation: "orbDrift 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[55%] -left-32 h-125 w-125 rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)",
            animation: "orbDrift 18s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[-5%] h-96 w-96 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)",
            animation: "float 12s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute top-[38%] left-[50%] h-72 w-72 -translate-x-1/2 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.04), transparent 70%)",
            animation: "floatAlt 10s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* ── Floating geometric decorations ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Hexagon — top-left */}
        <svg
          className="absolute top-[12%] left-[8%] h-16 w-16 opacity-[0.07]"
          viewBox="0 0 100 100"
          style={{ animation: "float 7s ease-in-out infinite" }}
        >
          <polygon
            points="50,2 95,25 95,75 50,98 5,75 5,25"
            fill="none"
            stroke="#0693e3"
            strokeWidth="2"
          />
        </svg>

        {/* Diamond — top-right */}
        <svg
          className="absolute top-[18%] right-[12%] h-10 w-10 opacity-[0.08]"
          viewBox="0 0 100 100"
          style={{ animation: "floatAlt 6s ease-in-out infinite 0.5s" }}
        >
          <rect
            x="15"
            y="15"
            width="70"
            height="70"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            transform="rotate(45 50 50)"
          />
        </svg>

        {/* Circle — mid-left */}
        <svg
          className="absolute top-[45%] left-[5%] h-12 w-12 opacity-[0.06]"
          viewBox="0 0 100 100"
          style={{ animation: "float 9s ease-in-out infinite 1s" }}
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
          />
        </svg>

        {/* Triangle — mid-right */}
        <svg
          className="absolute top-[55%] right-[7%] h-14 w-14 opacity-[0.07]"
          viewBox="0 0 100 100"
          style={{ animation: "floatAlt 8s ease-in-out infinite 2s" }}
        >
          <polygon
            points="50,5 95,90 5,90"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
          />
        </svg>

        {/* Small spinning hexagon — bottom-left */}
        <svg
          className="absolute bottom-[20%] left-[15%] h-8 w-8 opacity-[0.06]"
          viewBox="0 0 100 100"
          style={{ animation: "spinSlow 25s linear infinite" }}
        >
          <polygon
            points="50,2 95,25 95,75 50,98 5,75 5,25"
            fill="none"
            stroke="#ec4899"
            strokeWidth="3"
          />
        </svg>

        {/* Plus — top-center */}
        <svg
          className="absolute top-[8%] left-[48%] h-5 w-5 opacity-[0.06]"
          viewBox="0 0 24 24"
          style={{ animation: "float 5s ease-in-out infinite 3s" }}
        >
          <path d="M12 2v20M2 12h20" stroke="#0693e3" strokeWidth="2" fill="none" />
        </svg>

        {/* Dot cluster — bottom-right */}
        <svg
          className="absolute bottom-[15%] right-[16%] h-20 w-20 opacity-[0.05]"
          viewBox="0 0 100 100"
          style={{ animation: "floatAlt 11s ease-in-out infinite" }}
        >
          <circle cx="20" cy="20" r="4" fill="#06b6d4" />
          <circle cx="55" cy="15" r="3" fill="#8b5cf6" />
          <circle cx="85" cy="28" r="5" fill="#0693e3" />
          <circle cx="30" cy="55" r="3" fill="#ec4899" />
          <circle cx="72" cy="58" r="4" fill="#f59e0b" />
          <circle cx="22" cy="82" r="5" fill="#0693e3" />
          <circle cx="58" cy="85" r="3" fill="#06b6d4" />
        </svg>

        {/* Cross — bottom-center */}
        <svg
          className="absolute bottom-[8%] left-[40%] h-6 w-6 opacity-[0.05]"
          viewBox="0 0 24 24"
          style={{ animation: "spinSlow 20s linear infinite reverse" }}
        >
          <path
            d="M12 2v20M2 12h20"
            stroke="#f59e0b"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-24 text-center md:pt-36 md:pb-36">
        {/* Concentric rings behind hero */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] md:h-[650px] md:w-[650px]"
          style={{ animation: "pulseRing 7s ease-in-out infinite" }}
        >
          <div className="absolute inset-0 rounded-full border border-[#0693e3]/[0.08]" />
          <div className="absolute inset-8 rounded-full border border-[#0693e3]/[0.05]" />
          <div className="absolute inset-16 rounded-full border border-[#0693e3]/[0.03]" />
        </div>

        {/* Badge */}
        <div
          style={{
            animation: "heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both",
          }}
        >
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#0693e3]/20 bg-white/60 px-5 py-2 text-xs tracking-wide text-[#0693e3] shadow-sm"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0693e3] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0693e3]" />
            </span>
            React Native &middot; Tailwind CSS &middot; Cross-Platform
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            animation: "heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both",
            fontFamily: "'Outfit', var(--font-display, sans-serif)",
          }}
          className="text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]"
        >
          <span className="bg-linear-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Build with{" "}
          </span>
          <span
            className="bg-linear-to-r from-[#0693e3] via-[#06b6d4] to-[#0693e3] bg-clip-text text-transparent"
            style={{
              backgroundSize: "200% auto",
              animation: "gradientShift 4s ease-in-out infinite",
            }}
          >
            @sdb/ui
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-slate-400"
          style={{
            animation: "heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both",
          }}
        >
          A React Native component library powered by{" "}
          <span className="font-medium text-[#0693e3]">Uniwind</span>. Write
          once with Tailwind CSS, deploy to{" "}
          <span className="text-slate-600">iOS</span>,{" "}
          <span className="text-slate-600">Android</span>, and{" "}
          <span className="text-slate-600">Web</span>.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          style={{
            animation: "heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both",
          }}
        >
          <Link
            href="/docs"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[#0693e3] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0693e3]/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0693e3]/35"
          >
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s linear infinite",
              }}
            />
            <span className="relative">Get Started</span>
            <svg
              className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            href="/docs/components/button"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white/80 px-7 py-3 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#0693e3]/20 hover:text-[#0693e3] hover:shadow-md"
          >
            Browse Components
          </Link>
        </div>

        {/* Platform tags */}
        <div
          className="mt-14 flex items-center justify-center gap-6"
          style={{
            animation: "heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.6s both",
          }}
        >
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400 transition-colors hover:text-[#0693e3]">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            iOS
          </span>
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400 transition-colors hover:text-emerald-500">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.27-.86-.31-.16-.69-.04-.86.27l-1.87 3.23c-1.53-.71-3.24-1.1-5.04-1.1s-3.51.39-5.04 1.1L4.53 5.71c-.17-.31-.55-.43-.86-.27-.31.17-.43.55-.27.86l1.84 3.18C2.42 11.35.39 14.53 0 18h24c-.39-3.47-2.42-6.65-6.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
            </svg>
            Android
          </span>
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400 transition-colors hover:text-cyan-500">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10 15 15 0 014-10z" />
            </svg>
            Web
          </span>
        </div>
      </section>

      <Divider />

      {/* ── Features ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2
            className="mb-3 text-center text-3xl font-bold text-slate-900 md:text-4xl"
            style={{ fontFamily: "'Outfit', var(--font-display, sans-serif)" }}
          >
            Why @sdb/ui?
          </h2>
          <p className="mb-14 text-center text-sm text-slate-400">
            Everything you need for cross-platform development
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={0.08 * i}>
              <div
                className="group relative h-full overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                style={
                  {
                    "--card-color": f.color,
                    "--card-bg": f.bg,
                  } as React.CSSProperties
                }
              >
                {/* Colored left accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-[3px] scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                  style={{
                    background: `linear-gradient(to bottom, ${f.color}, transparent)`,
                    transformOrigin: "top",
                  }}
                />

                {/* Top-right glow on hover */}
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: f.bg }}
                />

                {/* Icon */}
                <div
                  className="relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: f.bg,
                    color: f.color,
                  }}
                >
                  {f.icon}
                </div>

                <h3 className="relative mb-2 text-[13px] font-semibold text-slate-800">
                  {f.title}
                </h3>
                <p className="relative text-xs leading-relaxed text-slate-400">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Code Preview ── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <h2
            className="mb-3 text-center text-3xl font-bold text-slate-900 md:text-4xl"
            style={{ fontFamily: "'Outfit', var(--font-display, sans-serif)" }}
          >
            Simple by design
          </h2>
          <p className="mb-12 text-center text-sm text-slate-400">
            Import, compose, ship. The API stays out of your way.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="overflow-hidden rounded-xl border border-slate-800/50 bg-[#0f172a] shadow-2xl"
            style={{
              boxShadow:
                "0 0 80px rgba(6,147,227,0.08), 0 25px 50px -12px rgba(0,0,0,0.15)",
            }}
          >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
              <span className="ml-3 font-mono text-[11px] text-white/25">
                page.tsx
              </span>
            </div>

            {/* Shimmer line */}
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(6,147,227,0.3), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
              }}
            />

            {/* Code block */}
            <div className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
              <CL>
                <span className="text-violet-400">import</span>
                {" { "}
                <span className="text-amber-200">Button</span>
                {", "}
                <span className="text-amber-200">Card</span>
                {", "}
                <span className="text-amber-200">Text</span>
                {" } "}
                <span className="text-violet-400">from</span>{" "}
                <span className="text-emerald-300">{'"@sdb/ui"'}</span>
                <span className="text-white/20">;</span>
              </CL>
              <CL />
              <CL>
                <span className="text-violet-400">export default function</span>{" "}
                <span className="text-blue-300">Page</span>
                <span className="text-white/30">{"() {"}</span>
              </CL>
              <CL indent={1}>
                <span className="text-violet-400">return</span>
                <span className="text-white/30">{" ("}</span>
              </CL>
              <CL indent={2}>
                <span className="text-cyan-400">{"<Card"}</span>{" "}
                <span className="text-amber-300/80">className</span>
                <span className="text-white/20">=</span>
                <span className="text-emerald-300">{'"p-6"'}</span>
                <span className="text-cyan-400">{">"}</span>
              </CL>
              <CL indent={3}>
                <span className="text-cyan-400">{"<Text"}</span>{" "}
                <span className="text-amber-300/80">variant</span>
                <span className="text-white/20">=</span>
                <span className="text-emerald-300">{'"heading"'}</span>{" "}
                <span className="text-amber-300/80">size</span>
                <span className="text-white/20">=</span>
                <span className="text-emerald-300">{'"xl"'}</span>
                <span className="text-cyan-400">{">"}</span>
              </CL>
              <CL indent={4}>
                <span className="text-white/60">Hello from @sdb/ui</span>
              </CL>
              <CL indent={3}>
                <span className="text-cyan-400">{"</Text>"}</span>
              </CL>
              <CL indent={3}>
                <span className="text-cyan-400">{"<Button"}</span>{" "}
                <span className="text-amber-300/80">className</span>
                <span className="text-white/20">=</span>
                <span className="text-emerald-300">{'"mt-4"'}</span>
                <span className="text-cyan-400">{">"}</span>
                <span className="text-white/60">Get Started</span>
                <span className="text-cyan-400">{"</Button>"}</span>
              </CL>
              <CL indent={2}>
                <span className="text-cyan-400">{"</Card>"}</span>
              </CL>
              <CL indent={1}>
                <span className="text-white/30">{")"}</span>
                <span className="text-white/20">;</span>
              </CL>
              <CL>
                <span className="text-white/30">{"}"}</span>
                <span
                  className="ml-1 inline-block h-[18px] w-[2px] align-middle"
                  style={{
                    background: "#0693e3",
                    animation: "blink 1.2s step-end infinite",
                  }}
                />
              </CL>
            </div>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* ── Quick Start ── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <h2
            className="mb-3 text-center text-3xl font-bold text-slate-900 md:text-4xl"
            style={{ fontFamily: "'Outfit', var(--font-display, sans-serif)" }}
          >
            Get started in minutes
          </h2>
          <p className="mb-12 text-center text-sm text-slate-400">
            Choose your framework
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Next.js */}
          <Reveal delay={0.05}>
            <Link
              href="/docs/installation/nextjs"
              className="group relative block overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* Hover glow */}
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-slate-900/[0.03] blur-[30px] transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 shadow-md shadow-slate-900/20">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                  >
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    Next.js
                  </h3>
                  <p className="text-xs text-slate-400">
                    with withSdbUI() wrapper
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 px-4 py-3 font-mono text-xs text-slate-500 transition-colors duration-300 group-hover:bg-slate-100/80">
                <span className="text-[#0693e3]">$</span> bun add @sdb/ui
                react-native-web
              </div>
              <p className="mt-4 flex items-center gap-1 text-xs text-[#0693e3]/60 transition-colors group-hover:text-[#0693e3]">
                Read the guide
                <svg
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </p>
            </Link>
          </Reveal>

          {/* Expo */}
          <Reveal delay={0.12}>
            <Link
              href="/docs/installation/expo"
              className="group relative block overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* Hover glow */}
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#4630eb]/[0.03] blur-[30px] transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#4630eb] shadow-md shadow-[#4630eb]/20">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                  >
                    <path d="M0 20.084c.043.53.23 1.063.718 1.778.58.848 1.347 1.162 1.878.824.425-.272 1.09-1.216 2.455-3.477C7.034 16.026 9.49 11.554 10.4 9.9c.605-1.101 1.07-1.59 1.6-1.59.53 0 .995.489 1.6 1.59.91 1.654 3.367 6.126 5.349 9.31 1.365 2.26 2.03 3.204 2.455 3.476.53.338 1.298.024 1.878-.824.488-.715.675-1.248.718-1.778 0 0-6.964-12.053-8.69-14.93C14.56 3.882 13.594 2 12 2c-1.594 0-2.56 1.882-3.31 3.154C6.965 8.031 0 20.084 0 20.084z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Expo</h3>
                  <p className="text-xs text-slate-400">
                    with Uniwind and expo-router
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 px-4 py-3 font-mono text-xs text-slate-500 transition-colors duration-300 group-hover:bg-slate-100/80">
                <span className="text-[#0693e3]">$</span> bun add @sdb/ui
                uniwind tailwindcss
              </div>
              <p className="mt-4 flex items-center gap-1 text-xs text-[#0693e3]/60 transition-colors group-hover:text-[#0693e3]">
                Read the guide
                <svg
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </p>
            </Link>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── Footer CTA ── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(6,147,227,0.06), transparent 70%)",
          }}
        />

        <Reveal>
          <h2
            className="text-2xl font-bold text-slate-900 md:text-3xl"
            style={{ fontFamily: "'Outfit', var(--font-display, sans-serif)" }}
          >
            Ready to build?
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Start building cross-platform apps with @sdb/ui today.
          </p>
          <Link
            href="/docs"
            className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[#0693e3] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0693e3]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0693e3]/30"
          >
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s linear infinite",
              }}
            />
            <span className="relative">Read the Docs</span>
          </Link>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-slate-100 px-6 py-8 text-center text-xs text-slate-300">
        Built by{" "}
        <span className="text-slate-400">Spring Development Bank</span>
      </footer>
    </div>
  );
}
