interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary">
      {children}
    </p>
  );
}
