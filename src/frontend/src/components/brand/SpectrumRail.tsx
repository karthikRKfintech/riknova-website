interface SpectrumRailProps {
  /** Height in pixels. Defaults to 2. */
  height?: number;
  /** Slowly drift the spectrum (disabled automatically for reduced motion). */
  drift?: boolean;
  className?: string;
}

/**
 * The RIKNOVA spectrum hairline — an abstract motif derived from the full
 * logo's emerald→orange colour progression. Used to mark structural
 * boundaries (top of page, under the navbar). NOT a reconstruction of the
 * logo; purely a thin gradient rule.
 */
export default function SpectrumRail({
  height = 2,
  drift = false,
  className = "",
}: SpectrumRailProps) {
  return (
    <div
      aria-hidden="true"
      className={`${drift ? "rk-spectrum-drift" : "rk-spectrum"} w-full ${className}`}
      style={{ height }}
    />
  );
}
