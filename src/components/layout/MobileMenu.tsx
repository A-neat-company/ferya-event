"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageToggle from "@/components/ui/LanguageToggle";

const links = [
  { key: "home", href: "/" },
  { key: "design", href: "/design" },
  { key: "rentals", href: "/rentals" },
  { key: "gallery", href: "/gallery" },
  { key: "ethos", href: "/ethos" },
  { key: "services", href: "/services" },
  { key: "process", href: "/process" },
  { key: "faq", href: "/faq" },
] as const;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations("MobileMenu");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream px-6 py-4">
          <div className="flex flex-col leading-none">
            <span className="font-logo text-lg tracking-[0.25em] uppercase text-dark">
              Ferya
            </span>
            <span className="font-accent text-[8px] tracking-[0.25em] uppercase text-dark/70 mt-0.5">
              Event &amp; Decor
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-dark hover:text-primary transition-colors"
            aria-label="Close menu"
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

        {/* Links */}
        <nav className="px-6 py-6">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-xl text-dark hover:text-primary transition-colors"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-cream">
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
