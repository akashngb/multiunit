"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Analysis", href: "#analysis" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid var(--color-navy-light)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center font-display text-xl font-bold leading-none tracking-tight" aria-label="multiunit.ca home">
          <span style={{ color: "var(--color-navy)" }}>multiunit</span>
          <span style={{ color: "var(--color-accent)" }}>.ca</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--color-navy-mid)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-navy)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-navy-mid)")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 transition-colors duration-200"
            style={{ color: "var(--color-navy-mid)" }}
          >
            Sign In
          </Link>
          <Link
            href="/app"
            className="text-sm font-semibold px-4 py-2 text-white transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "var(--color-navy)",
              borderRadius: "8px",
            }}
          >
            Get Started →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={20} color="var(--color-navy)" />
          ) : (
            <Menu size={20} color="var(--color-navy)" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ borderTop: "1px solid var(--color-navy-light)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium py-1"
              style={{ color: "var(--color-navy-mid)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/login" className="text-sm font-medium py-2 text-center" style={{ color: "var(--color-navy-mid)" }}>
              Sign In
            </Link>
            <Link
              href="/app"
              className="text-sm font-semibold py-2 text-center text-white"
              style={{ background: "var(--color-navy)", borderRadius: "8px" }}
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
