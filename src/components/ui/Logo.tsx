interface LogoProps {
  size?: "sm" | "md" | "lg";
  color?: "dark" | "white";
}

export default function Logo({ size = "md", color = "dark" }: LogoProps) {
  const textColor = color === "dark" ? "text-dark" : "text-white";

  const sizes = {
    sm: { ferya: "text-lg", subtitle: "text-[8px] tracking-[0.25em]" },
    md: { ferya: "text-2xl", subtitle: "text-[9px] tracking-[0.3em]" },
    lg: { ferya: "text-3xl", subtitle: "text-[10px] tracking-[0.3em]" },
  };

  return (
    <div className="flex flex-col items-center leading-none">
      <span className={`font-logo ${sizes[size].ferya} tracking-[0.25em] uppercase ${textColor}`}>
        Ferya
      </span>
      <span className={`font-accent ${sizes[size].subtitle} uppercase ${textColor} opacity-70 mt-0.5`}>
        Event &amp; Decor
      </span>
    </div>
  );
}
