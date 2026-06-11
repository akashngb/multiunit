"use client";

import { CornerRightDown, MapPin, Building2, BarChart2, DollarSign } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";

const SUGGESTIONS = [
  { text: "Check MLI eligibility", icon: Building2, colors: { icon: "text-blue-600", border: "border-blue-400", bg: "bg-blue-50" } },
  { text: "Multiplex feasibility", icon: BarChart2, colors: { icon: "text-emerald-600", border: "border-emerald-400", bg: "bg-emerald-50" } },
  { text: "Pro forma estimate", icon: DollarSign, colors: { icon: "text-amber-600", border: "border-amber-400", bg: "bg-amber-50" } },
];

interface AIPropertyInputProps {
  onSubmit?: (text: string) => void;
  className?: string;
  dark?: boolean;
}

export function AIPropertyInput({ onSubmit, className, dark = false }: AIPropertyInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 52, maxHeight: 160 });

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit?.(inputValue);
      setInputValue("");
      setSelectedSuggestion(null);
      adjustHeight(true);
    }
  };

  const currentSuggestion = selectedSuggestion
    ? SUGGESTIONS.find((s) => s.text === selectedSuggestion)
    : null;

  const textClass = dark ? "text-white placeholder:text-white/50" : "text-black placeholder:text-black/40";
  const borderClass = dark
    ? "border-white/10 focus-within:border-white/25 bg-white/[0.06]"
    : "border-black/10 focus-within:border-black/20 bg-black/[0.03]";

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full">
        <div className={cn("relative border rounded-2xl transition-colors", borderClass)}>
          <div className="flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: "112px" }}>
              <Textarea
                ref={textareaRef}
                placeholder="Ask about this property..."
                className={cn(
                  "w-full rounded-2xl pr-10 pt-3 pb-3 border-none focus:ring-0 resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 leading-[1.2] text-sm",
                  textClass
                )}
                style={{ minHeight: "52px" }}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  adjustHeight();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>
            <div className="h-10 relative">
              {currentSuggestion && (
                <div className="absolute left-3 bottom-2 z-10">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 border shadow-sm rounded-md px-2 py-0.5 text-xs font-medium",
                      currentSuggestion.colors.bg,
                      currentSuggestion.colors.border
                    )}
                  >
                    <currentSuggestion.icon className={cn("w-3.5 h-3.5", currentSuggestion.colors.icon)} />
                    <span className={currentSuggestion.colors.icon}>{selectedSuggestion}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <CornerRightDown
            className={cn(
              "absolute right-3 top-3 w-4 h-4 transition-all duration-200",
              dark ? "text-white" : "text-black",
              inputValue ? "opacity-100 scale-100" : "opacity-30 scale-95"
            )}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2 justify-start px-1">
        {SUGGESTIONS.filter((s) => s.text !== selectedSuggestion).map(({ text, icon: Icon, colors }) => (
          <button
            key={text}
            type="button"
            onClick={() => setSelectedSuggestion((prev) => (prev === text ? null : text))}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 border transition-all duration-200 flex-shrink-0",
              dark
                ? "border-white/10 bg-white/5 hover:bg-white/10 text-white/70"
                : "border-black/10 bg-white hover:bg-black/5 text-black/70"
            )}
          >
            <Icon className={cn("h-3.5 w-3.5", colors.icon)} />
            <span className="whitespace-nowrap">{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
