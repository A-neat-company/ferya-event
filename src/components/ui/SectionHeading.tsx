interface SectionHeadingProps {
  children: React.ReactNode;
  accent?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
}

export default function SectionHeading({
  children,
  accent,
  as: Tag = "h2",
  className = "text-dark",
}: SectionHeadingProps) {
  return (
    <Tag className={`font-serif text-4xl md:text-5xl ${className}`}>
      {children}
      {accent && <em>{accent}</em>}
    </Tag>
  );
}
