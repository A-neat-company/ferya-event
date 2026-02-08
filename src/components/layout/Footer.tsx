import Link from "next/link";

const studioLinks = [
  { label: "Our Ethos", href: "/ethos" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Press", href: "/press" },
];

const conciergeLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Policy", href: "/policy" },
  { label: "Privacy", href: "/privacy" },
  { label: "Imprint", href: "/imprint" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-serif text-2xl tracking-widest text-white">
              FERYA
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              Bespoke event design studio crafting luxury stationery, signage,
              decor, and keepsakes for life&apos;s most meaningful celebrations.
            </p>
          </div>

          {/* The Studio */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              The Studio
            </h4>
            <ul className="flex flex-col gap-2.5">
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Concierge
            </h4>
            <ul className="flex flex-col gap-2.5">
              {conciergeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Follow Us
            </h4>
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Ferya. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
