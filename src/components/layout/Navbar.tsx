"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import LanguageToggle from "@/components/ui/LanguageToggle";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { key: "design", href: "/design" },
  { key: "rentals", href: "/rentals" },
  { key: "gallery", href: "/gallery" },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

        {/* Right — Language Toggle + Search + Cart */}
        <div className="flex items-center gap-5">
          <LanguageToggle />

          {/* Search */}
          <button
            className="text-dark hover:text-primary transition-colors"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>

          {/* Cart */}
          <button className="text-dark hover:text-primary transition-colors" aria-label="Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
