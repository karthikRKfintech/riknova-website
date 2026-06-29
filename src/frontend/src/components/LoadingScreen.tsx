import { useEffect, useState } from "react";

export interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [render, setRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setRender(true);
    }
  }, [isVisible]);

  if (!render) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      onTransitionEnd={() => {
        if (!isVisible) {
          setRender(false);
        }
      }}
    >
      <img
        src="/assets/images/logo/riknova-symbol.png"
        alt="RIKNOVA"
        className="h-16 w-16 animate-fade-in-up"
      />
    </div>
  );
}
