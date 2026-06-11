"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

const lenses = [
  {
    title: "MLI Select Feasibility",
    description:
      "Determine CMHC MLI Select eligibility. Score affordability, accessibility, and energy tiers. Know your LTV ceiling before you model.",
    tags: ["Policy", "Financing"],
  },
  {
    title: "Multiplex Feasibility",
    description:
      "Toronto's as-of-right multiplex rules unlocked new density city-wide. See exactly what's permitted on any lot — units, GFA, parking, setbacks.",
    tags: ["Zoning", "Density"],
  },
  {
    title: "Zoning & Permitted Density",
    description:
      "Current zone, Official Plan designation, variance history, and maximum achievable density. The full picture, not just the label.",
    tags: ["Zoning", "Policy"],
  },
  {
    title: "Financial Pro Forma",
    description:
      "Land + hard costs + soft costs vs. stabilized income. Cap rates, NOI, and a simple go/no-go score. Rough but fast — built for early-stage decisions.",
    tags: ["Finance", "Feasibility"],
  },
];

function LensCard({ title, description, tags }: (typeof lenses)[0]) {
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? {} : fadeUp}
      className="relative flex flex-col p-7 transition-all duration-200 cursor-default"
      style={{
        background: "#fff",
        border: hovered ? "1px solid var(--color-accent)" : "1px solid var(--color-navy-light)",
        borderLeft: hovered ? "3px solid var(--color-accent)" : "1px solid var(--color-navy-light)",
        borderRadius: "12px",
        transform: hovered && !prefersReducedMotion ? "translateX(2px)" : "translateX(0)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tags */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium uppercase tracking-wider px-2.5 py-1"
            style={{
              background: "var(--color-navy-light)",
              color: "var(--color-navy-mid)",
              borderRadius: "999px",
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3
        className="font-semibold mb-3"
        style={{ fontSize: "1.25rem", color: "var(--color-navy)" }}
      >
        {title}
      </h3>
      <p
        className="flex-1"
        style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--color-text-muted)" }}
      >
        {description}
      </p>

      {/* Hover CTA */}
      <div
        className="mt-4 text-sm font-medium transition-all duration-200"
        style={{
          color: "var(--color-accent)",
          opacity: hovered ? 1 : 0,
        }}
      >
        More details →
      </div>
    </motion.div>
  );
}

export default function AnalysisLenses() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="analysis"
      style={{
        padding: "clamp(80px, 10vw, 140px) 24px",
        background: "var(--color-bg)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="text-xs font-medium uppercase tracking-widest mb-4"
            style={{ color: "var(--color-accent)", letterSpacing: "0.1em" }}
          >
            What you can analyze
          </div>
          <h2
            className="font-display font-semibold"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-navy)",
            }}
          >
            Built around how developers actually think.
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={prefersReducedMotion ? {} : staggerContainer}
        >
          {lenses.map((lens) => (
            <LensCard key={lens.title} {...lens} />
          ))}
        </motion.div>

        {/* Coming soon note */}
        <p
          className="text-center mt-10 italic"
          style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}
        >
          More lenses coming soon.
        </p>
      </div>
    </section>
  );
}
