import SpectrumRail from "./SpectrumRail";

/**
 * DarkToLightTransition — the engineered bridge from the navy Hero into the
 * light financial canvas. It is NOT a decorative wave or blob: a crisp
 * spectrum hairline marks the boundary, then the ground shifts temperature
 * from RIKNOVA navy to canvas while a ledger grid and a single controlled
 * diagonal shear carry the brand geometry across the seam.
 *
 * Rendered at the very top of the first light section, pulled up so it butts
 * flush against the Hero.
 */
export default function DarkToLightTransition() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-28 overflow-hidden sm:h-36"
    >
      {/* boundary hairline */}
      <SpectrumRail height={2} />
      {/* colour-temperature shift: navy (continuing the hero) → canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--rk-navy) 0%, var(--rk-navy) 10%, var(--rk-canvas) 100%)",
        }}
      />
      {/* ledger grid, brightest against the navy top, fading as it warms */}
      <div
        className="rk-ledger absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, transparent 70%)",
        }}
      />
      {/* one controlled diagonal shear — the leg motif crossing the seam */}
      <div
        className="absolute -inset-x-10 top-1/2 h-px origin-center -translate-y-1/2 -rotate-[6deg]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(28,130,232,.35), rgba(106,44,224,.28), transparent)",
        }}
      />
    </div>
  );
}
