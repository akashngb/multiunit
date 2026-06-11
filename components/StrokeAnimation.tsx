"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

/* Placeholder wireframe building SVG with pathLength="1" on each path for normalized stroke animation */
function BuildingSVG() {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 900 500"
      fill="none"
      className="w-full max-w-4xl mx-auto"
      style={{ maxHeight: "460px" }}
    >
      {/* Radial grid arcs — background detail */}
      {[80, 160, 240, 320, 400].map((r) => (
        <ellipse
          key={r}
          cx="450"
          cy="420"
          rx={r}
          ry={r * 0.35}
          stroke="#D6E0F0"
          strokeWidth="0.5"
          className="stroke-path"
          pathLength="1"
        />
      ))}

      {/* === LEFT SEMI-DETACHED HOUSE === */}
      {/* Foundation */}
      <line x1="120" y1="370" x2="340" y2="370" stroke="#0F1F3D" strokeWidth="1.5" className="stroke-path" pathLength="1" />
      {/* Front wall */}
      <rect x="120" y="250" width="220" height="120" stroke="#0F1F3D" strokeWidth="1.5" fill="none" className="stroke-path" pathLength="1" />
      {/* Gable roof */}
      <polyline points="110,250 230,170 350,250" stroke="#0F1F3D" strokeWidth="1.5" fill="none" className="stroke-path" pathLength="1" />
      {/* Chimney */}
      <rect x="280" y="185" width="18" height="45" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      {/* Door */}
      <rect x="200" y="310" width="32" height="60" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      {/* Window left */}
      <rect x="135" y="275" width="38" height="32" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      <line x1="154" y1="275" x2="154" y2="307" stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      <line x1="135" y1="291" x2="173" y2="291" stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      {/* Window right */}
      <rect x="270" y="275" width="38" height="32" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      <line x1="289" y1="275" x2="289" y2="307" stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      <line x1="270" y1="291" x2="308" y2="291" stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      {/* Upper window */}
      <rect x="202" y="210" width="28" height="22" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      {/* Brick hatching */}
      {[260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360].map((y) => (
        <line key={y} x1="120" y1={y} x2="340" y2={y} stroke="#0F1F3D" strokeWidth="0.4" className="stroke-path" pathLength="1" />
      ))}
      {[140, 170, 200, 230, 260, 290, 320].map((x, i) => (
        [260, 280, 300, 320, 340, 360].map((y) => (
          <line key={`${x}-${y}`} x1={x + (i % 2 === 0 ? 0 : 15)} y1={y} x2={x + (i % 2 === 0 ? 0 : 15)} y2={y + 10} stroke="#0F1F3D" strokeWidth="0.4" className="stroke-path" pathLength="1" />
        ))
      )).flat()}

      {/* === RIGHT SEMI-DETACHED HOUSE (attached unit) === */}
      <rect x="340" y="260" width="210" height="110" stroke="#0F1F3D" strokeWidth="1.5" fill="none" className="stroke-path" pathLength="1" />
      <polyline points="330,260 445,185 560,260" stroke="#0F1F3D" strokeWidth="1.5" fill="none" className="stroke-path" pathLength="1" />
      <rect x="390" y="185" width="18" height="40" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      <line x1="340" y1="370" x2="550" y2="370" stroke="#0F1F3D" strokeWidth="1.5" className="stroke-path" pathLength="1" />
      <rect x="415" y="315" width="30" height="55" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      <rect x="350" y="283" width="36" height="30" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      <line x1="368" y1="283" x2="368" y2="313" stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      <line x1="350" y1="298" x2="386" y2="298" stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      <rect x="475" y="283" width="36" height="30" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      <line x1="493" y1="283" x2="493" y2="313" stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      <line x1="475" y1="298" x2="511" y2="298" stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      <rect x="418" y="218" width="26" height="20" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />

      {/* === BACKGROUND MID-RISE === */}
      <rect x="610" y="160" width="200" height="210" stroke="#0F1F3D" strokeWidth="1.5" fill="none" className="stroke-path" pathLength="1" />
      <line x1="610" y1="370" x2="810" y2="370" stroke="#0F1F3D" strokeWidth="1.5" className="stroke-path" pathLength="1" />
      {/* Mid-rise floors */}
      {[195, 225, 255, 285, 315, 345].map((y) => (
        <line key={y} x1="610" y1={y} x2="810" y2={y} stroke="#0F1F3D" strokeWidth="0.5" className="stroke-path" pathLength="1" />
      ))}
      {/* Mid-rise windows — per floor */}
      {[168, 198, 228, 258, 288, 318, 348].map((y) =>
        [625, 651, 677, 703, 729, 755, 781].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="16" height="16" stroke="#0F1F3D" strokeWidth="0.5" fill="none" className="stroke-path" pathLength="1" />
        ))
      ).flat()}
      {/* Rooftop parapet */}
      <rect x="610" y="148" width="200" height="12" stroke="#0F1F3D" strokeWidth="1" fill="none" className="stroke-path" pathLength="1" />
      {/* Rooftop mechanical */}
      <rect x="660" y="130" width="50" height="18" stroke="#0F1F3D" strokeWidth="0.8" fill="none" className="stroke-path" pathLength="1" />

      {/* Ground line */}
      <line x1="60" y1="370" x2="840" y2="370" stroke="#0F1F3D" strokeWidth="1" className="stroke-path" pathLength="1" />

      {/* === ANNOTATION CALLOUTS === */}
      {/* Lot annotation */}
      <line x1="230" y1="390" x2="230" y2="430" stroke="#0F1F3D" strokeWidth="0.5" className="annotation-line" pathLength="1" />
      <text x="230" y="445" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#1E56A0" className="annotation-text">
        25×120 Lot
      </text>
      {/* Zone annotation */}
      <line x1="120" y1="250" x2="60" y2="220" stroke="#0F1F3D" strokeWidth="0.5" className="annotation-line" pathLength="1" />
      <text x="55" y="215" textAnchor="end" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#1E56A0" className="annotation-text">
        Zone: RD
      </text>
      {/* Units annotation */}
      <line x1="445" y1="185" x2="445" y2="145" stroke="#0F1F3D" strokeWidth="0.5" className="annotation-line" pathLength="1" />
      <text x="445" y="138" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#1E56A0" className="annotation-text">
        4 Units Permitted
      </text>
      {/* FSI annotation */}
      <line x1="710" y1="148" x2="760" y2="110" stroke="#0F1F3D" strokeWidth="0.5" className="annotation-line" pathLength="1" />
      <text x="762" y="107" textAnchor="start" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#1E56A0" className="annotation-text">
        FSI: 0.6
      </text>
    </svg>
  );
}

export default function StrokeAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="svg-section"
      style={{
        background: "#fff",
        padding: "clamp(80px, 10vw, 140px) 24px",
      }}
    >
      <style>{`
        .svg-section .stroke-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .svg-section .annotation-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .svg-section .annotation-text {
          opacity: 0;
        }

        .svg-section.is-visible .stroke-path {
          animation: draw 2.5s ease-in-out forwards;
        }
        .svg-section.is-visible .annotation-line {
          animation: draw 0.6s ease-in-out forwards 2s;
        }
        .svg-section.is-visible .annotation-text {
          animation: fadeInText 0.5s ease forwards 2.4s;
        }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeInText {
          to { opacity: 1; }
        }
      `}</style>

      {/* Text block */}
      <motion.div
        className="text-center mx-auto mb-16"
        style={{ maxWidth: "640px" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="text-xs font-medium uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent)", letterSpacing: "0.1em" }}
        >
          Under the hood
        </div>
        <h2
          className="font-display font-semibold mb-5"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.02em",
            color: "var(--color-navy)",
          }}
        >
          Every property. Every angle.
        </h2>
        <p style={{ fontSize: "1.125rem", lineHeight: "1.7", color: "var(--color-text-muted)" }}>
          multiunit.ca cross-references zoning bylaws, CMHC policy, municipal data, and financial
          models — in one analysis.
        </p>
      </motion.div>

      {/* SVG */}
      {/* TODO: replace with detailed isometric Toronto building SVG */}
      <BuildingSVG />
    </section>
  );
}
