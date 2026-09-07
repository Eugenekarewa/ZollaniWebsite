import React from "react";

interface SectionDividerProps {
  variant?: "curve-down" | "curve-up" | "diagonal" | "wave";
  fillColor?: string; // background of the section above or below
  strokeColor?: string; // accent coral divider line
  className?: string;
  flip?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = "curve-down",
  fillColor = "#3E7A78",
  strokeColor = "#EE8B6C",
  className = "",
  flip = false,
}) => {
  if (variant === "diagonal") {
    return (
      <div
        className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
          flip ? "rotate-180" : ""
        } ${className}`}
      >
        <svg
          className="relative block w-full h-8 sm:h-12 md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 0L0 120H1200V0Z"
            fill={fillColor}
          />
          {strokeColor && (
            <line
              x1="0"
              y1="120"
              x2="1200"
              y2="0"
              stroke={strokeColor}
              strokeWidth="5"
            />
          )}
        </svg>
      </div>
    );
  }

  // Default curve (matching the printed profile's signature swoosh)
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      <svg
        className="relative block w-full h-10 sm:h-16 md:h-24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C300,110 900,110 1200,0 L1200,120 L0,120 Z"
          fill={fillColor}
        />
        {strokeColor && (
          <path
            d="M0,0 C300,110 900,110 1200,0"
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
          />
        )}
      </svg>
    </div>
  );
};
