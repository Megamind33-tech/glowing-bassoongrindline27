import React from "react";

export interface GrindlineLogoProps {
  variant?: "full" | "compact" | "mark";
  size?: "sm" | "md" | "lg";
  className?: string;
  subtitle?: string;
}

const SIZES = {
  sm: { mark: "h-8 w-8", word: "text-lg", gap: "gap-2.5" },
  md: { mark: "h-11 w-11", word: "text-2xl", gap: "gap-3" },
  lg: {
    mark: "h-[clamp(2.75rem,min(13vw,12vh),4rem)] w-[clamp(2.75rem,min(13vw,12vh),4rem)]",
    word: "text-[clamp(1.5rem,min(8.4vw,7vh),2.6rem)]",
    gap: "gap-[clamp(0.75rem,3.5vw,1rem)]",
  },
} as const;

/** Grindline's number-board mark; intentionally distinct from the upstream LibreCorsa logo. */
export const GrindlineMark: React.FC<{ className?: string; title?: string }> = ({ className = "h-10 w-10", title = "Grindline 27" }) => {
  const uid = React.useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`g27-${uid}`} x1="12" y1="10" x2="116" y2="118" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#202532" />
          <stop offset="1" stopColor="#08090D" />
        </linearGradient>
      </defs>
      <path d="M24 7H105L121 23V96L96 121H23L7 105V24Z" fill={`url(#g27-${uid})`} stroke="#3A4157" strokeWidth="2" />
      <path d="M25 106H74" stroke="#CCFF00" strokeWidth="5" strokeLinecap="round" />
      <path d="M84 106H101" stroke="#FF2A3C" strokeWidth="5" strokeLinecap="round" />
      <text x="64" y="79" textAnchor="middle" fill="#F5F7FA" fontFamily="Arial, sans-serif" fontSize="56" fontWeight="900" fontStyle="italic" letterSpacing="-5">27</text>
      <path d="M22 21H54" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

export const GrindlineLogo: React.FC<GrindlineLogoProps> = ({
  variant = "full",
  size,
  className = "",
  subtitle = "ANDROID RACING LEAGUE",
}) => {
  if (variant === "mark") return <GrindlineMark className={className || "h-10 w-10"} />;
  const s = SIZES[size ?? (variant === "compact" ? "sm" : "md")];

  return (
    <div className={`inline-flex max-w-full items-center select-none ${s.gap} ${className}`}>
      <GrindlineMark className={`${s.mark} shrink-0 drop-shadow-[0_4px_14px_rgba(204,255,0,0.18)]`} />
      <div className="flex min-w-0 flex-col justify-center">
        <div className={`font-f1-display leading-none font-black tracking-[0.04em] text-[#F5F7FA] italic ${s.word}`}>
          GRIND<span className="text-[#CCFF00]">LINE</span><span className="ml-2 text-[#8E96AA]">27</span>
        </div>
        {variant === "full" ? (
          <div className="mt-2 flex items-center gap-2">
            <span className="flex -skew-x-[20deg] items-center gap-[3px]" aria-hidden>
              <span className="h-[5px] w-4 bg-[#CCFF00]" />
              <span className="h-[5px] w-4 bg-[#FF2A3C]" />
            </span>
            <span className="font-f1-mono text-[10px] font-bold tracking-[0.24em] text-balance text-[#8E96AA] uppercase">{subtitle}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
