"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import MobileMenu from "./MobileMenu";
import LanguageToggle from "@/components/ui/LanguageToggle";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { key: "design", href: "/design" },
  { key: "rentals", href: "/rentals" },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("Navbar");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left — Nav Links (desktop) */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-base tracking-wide text-dark hover:text-primary transition-colors"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-dark"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Center — Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Logo size="md" />
        </Link>

        {/* Right — Language Toggle */}
        <div className="flex items-center gap-5">
          <LanguageToggle />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

    </header>
  );
}
