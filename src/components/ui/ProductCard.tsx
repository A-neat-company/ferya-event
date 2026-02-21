import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  alt: string;
  category: string;
  name: string;
  price: string;
  href?: string;
  imageSrc?: string;
}

export default function ProductCard({
  alt,
  category,
  name,
  price,
  href,
  imageSrc,
}: ProductCardProps) {
  const card = (
    <div className="group">
      <div className="aspect-[3/4] w-full rounded-lg bg-cream flex items-center justify-center overflow-hidden relative">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <span className="text-sm text-body/50 uppercase tracking-widest">
            {alt}
          </span>
        )}
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
