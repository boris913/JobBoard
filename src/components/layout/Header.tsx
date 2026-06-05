"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Offres" },
  { href: "/features", label: "Fonctionnalités" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
              <BriefcaseBusiness className="h-4 w-4 text-paper" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-ink tracking-tight">
                Job<span className="text-accent">Board</span>
              </span>
              <p className="text-[11px] text-stone-500 font-body -mt-0.5 leading-none">
                Centralisez vos offres
              </p>
            </div>
            {/* Sur mobile : juste le nom sans sous-titre */}
            <span className="sm:hidden font-display text-base font-bold text-ink tracking-tight">
              Job<span className="text-accent">Board</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors font-body",
                  pathname === link.href
                    ? "text-ink bg-stone-100"
                    : "text-stone-500 hover:text-ink hover:bg-stone-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4">
              <Link
                href="/offres"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper transition-all hover:bg-ink-soft active:scale-[0.98] font-body"
              >
                Voir les offres
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-paper/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-colors font-body text-center",
                  pathname === link.href
                    ? "text-ink bg-stone-100"
                    : "text-stone-500 hover:text-ink hover:bg-stone-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-4">
              <Link
                href="/offres"
                onClick={() => setMobileOpen(false)}
                className="block text-center rounded-xl bg-ink px-4 py-3 text-sm font-medium text-paper transition-all hover:bg-ink-soft active:scale-[0.98] font-body"
              >
                Voir les offres
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}