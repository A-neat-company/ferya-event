"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/square";

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full rounded-lg bg-cream flex items-center justify-center">
        <span className="text-sm text-body/50 uppercase tracking-widest">
          {productName}
        </span>
      </div>
    );
  }

  return (
    <div>
      {/* Main image */}
      <div className="aspect-[3/4] w-full rounded-lg bg-cream overflow-hidden relative">
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].alt || productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 55vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                i === activeIndex
                  ? "border-primary"
                  : "border-transparent hover:border-primary/30"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
