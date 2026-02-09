import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "dark" | "primary";
  type?: "button" | "submit";
  className?: string;
}

export default function CTAButton({
  children,
  href,
  variant = "dark",
  type = "button",
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-block rounded-full px-8 py-3 text-base font-medium tracking-wide transition-colors";
  const variants = {
    dark: "bg-dark text-white hover:bg-dark/90",
    primary: "bg-primary text-white hover:bg-primary-dark",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
