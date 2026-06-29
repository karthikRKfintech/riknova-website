interface LogoProps {
  /** Icon height in pixels. Defaults to 36. */
  size?: number;
  /** Whether to render the RIKNOVA / FINTECH SOLUTIONS text beside the icon. */
  showText?: boolean;
  /** Class applied to the root container. */
  className?: string;
  /** Class applied to the text block. */
  textClassName?: string;
}

/**
 * RIKNOVA brand lockup: symbol-only icon on the left, with HTML/CSS text
 * ("RIKNOVA" over "FINTECH SOLUTIONS") beside it. The icon's solid dark
 * background blends with the site's near-black theme via mix-blend-mode so
 * no visible box appears behind the logo.
 */
export default function Logo({
  size = 36,
  showText = true,
  className = "",
  textClassName = "",
}: LogoProps) {
  return (
    <span
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="RIKNOVA Fintech Solutions"
    >
      <img
        src="/assets/images/logo/riknova-symbol-dark.png"
        alt=""
        aria-hidden="true"
        className="w-auto"
        style={{
          height: size,
          // The icon ships with a solid near-black background that matches the
          // site theme. mix-blend-mode: lighten drops that near-black bg
          // against the near-black site bg while keeping the colorful glyph.
          mixBlendMode: "lighten",
        }}
      />
      {showText && (
        <span className={`flex flex-col leading-none ${textClassName}`}>
          <span className="font-display font-bold text-foreground tracking-tight">
            RIKNOVA
          </span>
          <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            FINTECH SOLUTIONS
          </span>
        </span>
      )}
    </span>
  );
}
