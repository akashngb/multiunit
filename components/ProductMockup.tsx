"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AIPropertyInput } from "@/components/ui/ai-input";
import { Home, Layers, Map, BarChart2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/* ─── dot background (component 1/3) ─── */
function DotBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full flex-col items-center bg-[#0d1117]" style={{ minHeight: "420px" }}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]"
        )}
      />
      {/* faded radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[#0d1117] [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

/* ─── data card inside chat ─── */
function DataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-3 border border-white/8 bg-white/[0.04]">
      <div className="text-[0.6rem] uppercase tracking-wider text-white/40 mb-1">{label}</div>
      <div className="font-mono text-sm font-semibold text-blue-400">{value}</div>
    </div>
  );
}

/* ─── chat message ─── */
function AssistantMessage({ text }: { text: string }) {
  return (
    <div className="flex gap-2 items-start">
      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
        <span className="text-[8px] font-bold text-blue-400">M</span>
      </div>
      <p className="text-sm text-white/80 leading-relaxed">{text}</p>
    </div>
  );
}

function AddressChip({ address }: { address: string }) {
  return (
    <div className="flex justify-end">
      <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-white/60">
        {address}
      </span>
    </div>
  );
}

/* ─── tab content definitions ─── */
const TABS = [
  {
    id: "mli",
    label: "MLI Select",
    icon: Home,
    address: "247 Pharmacy Ave, Toronto, ON",
    message: "This property meets CMHC MLI Select eligibility criteria. Here's the breakdown:",
    cards: [
      { label: "Affordability Score", value: "82 pts" },
      { label: "Energy Efficiency", value: "Tier 2 eligible" },
      { label: "LTV", value: "Up to 95%" },
      { label: "Amortization", value: "50yr available" },
    ],
  },
  {
    id: "multiplex",
    label: "Multiplex",
    icon: Layers,
    address: "88 Kingsway Cres, Etobicoke, ON",
    message: "Under Toronto's new as-of-right multiplex permissions, this lot supports up to 4 units.",
    cards: [
      { label: "Lot Area", value: "3,400 sqft" },
      { label: "Max Units", value: "4" },
      { label: "Parking", value: "0 required" },
      { label: "Estimated GFA", value: "4,200 sqft" },
    ],
  },
  {
    id: "zoning",
    label: "Zoning",
    icon: Map,
    address: "1490 Midland Ave, Scarborough, ON",
    message: "Zoning analysis complete. Current designation allows significant density uplift.",
    cards: [
      { label: "Current Zone", value: "RM (u3)" },
      { label: "Official Plan", value: "Apt Neighbourhood" },
      { label: "Max Height", value: "14m" },
      { label: "Setbacks", value: "6m front / 1.2m side" },
    ],
  },
  {
    id: "proforma",
    label: "Pro Forma",
    icon: BarChart2,
    address: "34 Silverthorn Ave, York, ON",
    message: "Financial feasibility analysis for a 6-unit rental development:",
    cards: [
      { label: "Land", value: "$1.1M" },
      { label: "Hard Costs", value: "$1.6M" },
      { label: "Total", value: "$2.9M" },
      { label: "Cap Rate", value: "5.1%" },
    ],
  },
];

export default function ProductMockup() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="product-mockup"
      className="relative w-full overflow-hidden"
      style={{ background: "#fff" }}
    >
      {/* CN Tower background — full width, covers the top portion */}
      <div className="relative w-full" style={{ height: "clamp(520px, 75vh, 820px)" }}>
        {/* Background image */}
        <Image
          src="/cntower.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        {/* Dark overlay to deepen the image, making card legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* Floating card — Railway-style, centered, slides up from bottom of image */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-0">
          <motion.div
            className="w-full"
            style={{ maxWidth: "900px" }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer card shell — dark glass */}
            <div
              className="rounded-t-2xl overflow-hidden border border-white/10 shadow-2xl"
              style={{
                background: "rgba(13,17,23,0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 -8px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              {/* Window chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className="flex-1 mx-3 text-center">
                  <span className="text-xs text-white/30 font-mono">multiunit.ca — property analysis</span>
                </div>
              </div>

              {/* Tabs row — component 3/3 */}
              <div className="px-4 pt-3 border-b border-white/8">
                <Tabs defaultValue="mli">
                  <ScrollArea>
                    <TabsList className="h-auto -space-x-px bg-transparent p-0 shadow-none">
                      {TABS.map(({ id, label, icon: Icon }) => (
                        <TabsTrigger
                          key={id}
                          value={id}
                          className={cn(
                            "relative overflow-hidden rounded-none border border-white/8 py-2 px-3 text-xs font-medium",
                            "first:rounded-tl-lg last:rounded-tr-lg",
                            "text-white/50 bg-transparent transition-colors duration-150",
                            "data-[state=active]:bg-white/8 data-[state=active]:text-white",
                            "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5",
                            "data-[state=active]:after:bg-blue-500"
                          )}
                        >
                          <Icon className="-ms-0.5 me-1.5 opacity-70 inline-block" size={13} strokeWidth={2} aria-hidden="true" />
                          {label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>

                  {/* Tab content — dot background + chat + input */}
                  {TABS.map(({ id, address, message, cards }) => (
                    <TabsContent key={id} value={id} className="mt-0">
                      <DotBackground>
                        <div className="flex flex-col gap-4 p-5" style={{ minHeight: "260px" }}>
                          <AddressChip address={address} />
                          <AssistantMessage text={message} />
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {cards.map((card) => (
                              <DataCard key={card.label} {...card} />
                            ))}
                          </div>
                          {/* AI input — component 2/3 */}
                          <div className="mt-auto pt-2">
                            <AIPropertyInput dark />
                          </div>
                        </div>
                      </DotBackground>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
