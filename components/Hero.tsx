"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainerSlow } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion ? {} : staggerContainerSlow;
  const itemVariants = prefersReducedMotion ? {} : fadeUp;

  return (
    <section
      className="flex flex-col items-center text-center bg-white"
      style={{ paddingTop: "140px", paddingBottom: "72px" }}
    >
      <motion.div
        className="flex flex-col items-center max-w-[780px] px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="mb-8">
          <span
            className="inline-flex items-center text-xs font-medium uppercase tracking-widest pl-3"
            style={{
              color: "var(--color-accent)",
              borderLeft: "2px solid var(--color-accent)",
              letterSpacing: "0.1em",
            }}
          >
            Toronto &amp; GTA · Property Intelligence
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-bold leading-[1.05] tracking-tight mb-6"
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            letterSpacing: "-0.03em",
            color: "var(--color-navy)",
          }}
        >
          Property Intelligence.
          <br />
          <span style={{ color: "var(--color-navy)" }}>Instantly.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="max-w-[520px] mb-10"
          style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--color-text-muted)" }}
        >
          Enter any GTA address and get instant feasibility analysis — zoning, MLI Select
          eligibility, multiplex potential, and full pro forma.
        </motion.p>

        {/* CTAs — using Button component (4/4) */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-5">
          <Button
            asChild
            className="gap-1.5 px-5 h-10 text-sm font-semibold"
            style={{ background: "var(--color-navy)", color: "#fff" }}
          >
            <Link href="/app">
              Analyze a Property
              <ArrowRight size={15} />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-10 px-5 text-sm font-semibold"
            style={{ color: "var(--color-navy)", borderColor: "var(--color-navy-light)" }}
          >
            <Link href="#product-mockup">See a Demo</Link>
          </Button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}
        >
          No account needed · Toronto/GTA addresses only (for now)
        </motion.p>
      </motion.div>
    </section>
  );
}
