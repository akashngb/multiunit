"use client";

import { MapPin, SlidersHorizontal, FileBarChart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Enter an address",
    copy: "Type any Toronto or GTA address. We'll pull zoning, lot data, and ownership context automatically.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Choose your lens",
    copy: "Select from MLI Select, Multiplex feasibility, Zoning analysis, or full Pro Forma. More lenses coming soon.",
  },
  {
    number: "03",
    icon: FileBarChart,
    title: "Get your intelligence report",
    copy: "Receive a structured, shareable analysis — scores, flags, financials, and plain-language recommendations.",
  },
];

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      style={{
        padding: "clamp(80px, 10vw, 140px) 24px",
        background: "var(--color-bg-soft)",
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
            Simple by design
          </div>
          <h2
            className="font-display font-semibold"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-navy)",
            }}
          >
            From address to insight in seconds.
          </h2>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={prefersReducedMotion ? {} : staggerContainer}
        >
          {steps.map(({ number, icon: Icon, title, copy }) => (
            <motion.div
              key={number}
              variants={prefersReducedMotion ? {} : fadeUp}
              className="relative p-8 group cursor-default transition-all duration-200"
              style={{
                background: "#fff",
                border: "1px solid var(--color-navy-light)",
                borderRadius: "12px",
              }}
              whileHover={prefersReducedMotion ? undefined : { y: -4, boxShadow: "0 12px 32px rgba(15,31,61,0.1)" }}
            >
              {/* Decorative step number */}
              <div
                className="absolute top-6 right-6 font-display font-bold select-none"
                style={{
                  fontSize: "4rem",
                  color: "var(--color-navy-light)",
                  lineHeight: 1,
                  opacity: 0.3,
                }}
              >
                {number}
              </div>

              {/* Icon */}
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--color-navy)",
                  borderRadius: "8px",
                }}
              >
                <Icon size={18} color="#fff" />
              </div>

              <h3
                className="font-semibold mb-3"
                style={{ fontSize: "1.25rem", color: "var(--color-navy)" }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
                {copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
