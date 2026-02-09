interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center">
      <p className="font-serif text-4xl text-dark">{value}</p>
      <p className="mt-1 text-sm font-semibold tracking-[0.15em] uppercase text-primary">
        {label}
      </p>
    </div>
  );
}
