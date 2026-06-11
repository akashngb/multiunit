"use client";

import { useState } from "react";
import Link from "next/link";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Analysis Types", href: "#analysis" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "/changelog" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer
      style={{
        background: "#0A1628",
        padding: "64px 24px 0",
        color: "#fff",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* Col 1 — Brand */}
          <div>
            <div className="font-display text-xl font-bold mb-3">
              <span style={{ color: "#fff" }}>multiunit</span>
              <span style={{ color: "var(--color-accent-glow)" }}>.ca</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              © 2025 multiunit.ca
              <br />
              Toronto, ON
            </p>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Stay Updated */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Stay Updated
            </h4>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="flex-1 px-3 py-2 text-sm rounded-lg outline-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                  minWidth: 0,
                }}
                required
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200"
                style={{
                  background: "var(--color-accent)",
                  color: "#fff",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </form>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
              Product updates only. No spam.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-5 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
            Built in Toronto.
          </p>
        </div>
      </div>
    </footer>
  );
}
