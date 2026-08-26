import SpectrumRail from "./SpectrumRail";

/**
 * LightToNavyTransition — the engineered bridge from the light financial
 * canvas DOWN into the navy product moment. It is the counterpart to
 * DarkToLightTransition but not a mechanical mirror: here the ledger grid
 * performs a "handoff" (dark-on-light lines above fade out as light-on-navy
 * lines fade in), the temperature cools from canvas to navy, a single shear
 * tilts the opposite way, and the crisp spectrum hairline lands at the
 * BOTTOM — the line where the navy product ground fully takes over.
 *
 * Rendered at the top of the Products section, flush against About.
 */
export default function LightToNavyTransition() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-28 overflow-hidden sm:h-36"
    >
      {/* temperature shift: canvas (continuing About) → navy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--rk-canvas-2) 0%, var(--rk-canvas) 14%, var(--rk-navy) 100%)",
        }}
      />
      {/* ledger handoff — dark-on-light grid up top, fading out downward */}
      <div
        className="rk-ledger-l absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 55%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, transparent 55%)",
        }}
      />
      {/* …light-on-navy grid fading in toward the bottom */}
      <div
        className="rk-ledger absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 45%, #000 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 45%, #000 100%)",
        }}
      />
      {/* one controlled shear — tilted opposite to the navy→light seam */}
      <div
        className="absolute -inset-x-10 top-1/2 h-px origin-center -translate-y-1/2 rotate-[7deg]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(18,185,201,.32), rgba(28,130,232,.30), transparent)",
        }}
      />
      {/* crisp boundary where the navy ground fully takes over */}
      <div className="absolute inset-x-0 bottom-0">
        <SpectrumRail height={2} />
      </div>
    </div>
  );
}
