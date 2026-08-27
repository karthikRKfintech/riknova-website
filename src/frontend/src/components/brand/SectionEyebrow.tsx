interface SectionEyebrowProps {
  children: React.ReactNode;
  /** Colour context. "light" for light sections, "dark" for navy sections. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * SectionEyebrow — the recurring RIKNOVA micro-label: an ascending bar-tick
 * (the data-bars motif, also used in the hero metric strip) followed by a
 * tracked mono label. Repeating this exact device across sections is one of
 * the rules that makes the light and navy sides read as one system.
 */
export default function SectionEyebrow({
  children,
  tone = "light",
  className = "",
}: SectionEyebrowProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="h-3.5 w-[3px] rounded-full"
        style={{ background: "var(--rk-grad-bars)" }}
      />
      <span
        className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]"
        style={{
          color: tone === "light" ? "var(--rk-cyan-ink)" : "var(--rk-slate)",
        }}
      >
        {children}
      </span>
    </span>
  );
}
