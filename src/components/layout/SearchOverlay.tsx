"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/ui";
import type { Product } from "@/lib/square/types";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const t = useTranslations("Search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Focus input after transition
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data.products ?? []);
        setSearched(true);
      } catch {
        setResults([]);
        setSearched(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClose = useCallback(() => {
    setQuery("");
    setResults([]);
    setSearched(false);
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-cream">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-body flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 text-xl text-dark placeholder:text-body/50 outline-none bg-transparent font-serif"
          />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="text-dark hover:text-primary transition-colors"
            aria-label={t("close")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Results area */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {query.length < 2 && (
          <p className="text-center text-body">{t("minChars")}</p>
        )}

        {loading && (
          <p className="text-center text-body">{t("searching")}</p>
        )}

        {!loading && searched && results.length === 0 && (
          <p className="text-center text-body">
            {t("noResults", { query })}
          </p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                alt={product.name}
                category={product.categoryName}
                name={product.name}
                price={product.priceDisplay}
                href={`/shop/${product.slug}`}
                imageSrc={product.images[0]?.url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
