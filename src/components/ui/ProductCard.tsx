import Link from "next/link";

interface ProductCardProps {
  alt: string;
  category: string;
  name: string;
  price: string;
  href?: string;
}

export default function ProductCard({
  alt,
  category,
  name,
  price,
  href,
}: ProductCardProps) {
  const card = (
    <div className="group">
      {/* Placeholder image */}
      <div className="aspect-[3/4] w-full rounded-lg bg-cream flex items-center justify-center overflow-hidden">
        <span className="text-sm text-body/50 uppercase tracking-widest">
          {alt}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold tracking-[0.15em] uppercase text-primary">
          {category}
        </p>
        <h3 className="mt-1 font-serif text-xl text-dark group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="mt-1 text-base text-body">{price}</p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}
