"use client";

import { motion, useReducedMotion } from "framer-motion";

const companies = [
  "Greenfield Capital",
  "Axis Development",
  "NorthStar RE Group",
  "Portside Ventures",
  "Cedar Grove Properties",
  "Maple Urban",
];

const stats = [
  { number: "1,200+", label: "Properties Analyzed" },
  { number: "14", label: "Analysis Lenses" },
  { number: "< 30 sec", label: "Time to First Report" },
];

export default function TrustedBy() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      style={{
        padding: "clamp(80px, 10vw, 140px) 24px",
        background: "var(--color-bg-soft)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--color-accent)", letterSpacing: "0.1em" }}
          >
            Early traction
          </div>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", fontWeight: 500 }}>
            Used by developers and investors across the GTA
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="overflow-hidden mb-16" aria-hidden="true">
          <div className={`flex gap-10 whitespace-nowrap ${prefersReducedMotion ? "" : "animate-marquee"}`}>
            {/* Double the list for seamless loop */}
            {[...companies, ...companies].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="inline-flex items-center gap-4"
                style={{ color: "var(--color-text-muted)", fontWeight: 500, fontSize: "1rem" }}
              >
                {name}
                {i < companies.length * 2 - 1 && (
                  <span style={{ color: "var(--color-navy-light)" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {stats.map(({ number, label }) => (
            <div key={label} className="text-center">
              <div
                className="font-display font-bold mb-1"
                style={{ fontSize: "2.5rem", color: "var(--color-navy)" }}
              >
                {number}
              </div>
              <div style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
