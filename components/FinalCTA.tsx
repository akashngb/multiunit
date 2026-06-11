"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";

/* Faint isometric grid for texture */
function GridTexture() {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 400"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.05 }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h-${i}`} x1="0" y1={i * 36} x2="800" y2={i * 36} stroke="#fff" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 22 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="#fff" strokeWidth="0.5" />
      ))}
      {/* Diagonal grid lines for isometric feel */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`d1-${i}`} x1={i * 60 - 300} y1="0" x2={i * 60} y2="400" stroke="#fff" strokeWidth="0.3" />
      ))}
    </svg>
  );
}

export default function FinalCTA() {
  const [address, setAddress] = useState("");
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      router.push(`/app?address=${encodeURIComponent(address.trim())}`);
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--color-navy)",
        padding: "clamp(80px, 10vw, 140px) 24px",
      }}
    >
      <GridTexture />

      <motion.div
        className="relative z-10 mx-auto text-center"
        style={{ maxWidth: "700px" }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="font-display font-semibold text-white mb-5"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Your next deal starts with the right data.
        </h2>
        <p
          className="mb-10"
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Stop guessing. Enter any GTA address and get a full intelligence report in under a minute.
        </p>

        {/* Address input */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 mx-auto mb-4"
          style={{ maxWidth: "560px" }}
        >
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter a Toronto/GTA address..."
              className="w-full pl-9 pr-4 py-3 text-sm font-medium transition-all duration-200"
              style={{
                background: "#fff",
                border: "1.5px solid transparent",
                borderRadius: "8px",
                color: "var(--color-navy)",
                outline: "none",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-accent-glow)")
              }
              onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 font-semibold text-sm transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "#fff",
              color: "var(--color-navy)",
              borderRadius: "8px",
              whiteSpace: "nowrap",
            }}
          >
            Analyze →
          </button>
        </form>

        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
          No account needed to get started.
        </p>
      </motion.div>
    </section>
  );
}
