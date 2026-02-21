interface ValueCardProps {
  title: string;
  description: string;
}

export default function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="text-center">
      <h3 className="font-serif text-2xl text-dark">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-body text-center">{description}</p>
    </div>
  );
}
