import Link from "next/link";
import { Code2, Heart, BriefcaseBusiness } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-paper-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Grid principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Colonne 1 : Brand */}
          <div className="lg:col-span-1 text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-paper" />
              </div>
              <span className="font-display text-base font-bold text-ink">
                Job<span className="text-accent">Board</span>
              </span>
            </Link>
            <p className="text-sm text-stone-500 font-body leading-relaxed max-w-xs mx-auto sm:mx-0">
              Centralisez vos offres d&apos;emploi en un seul endroit. Conçu pour les chercheurs d&apos;emploi modernes.
            </p>
          </div>

          {/* Colonne 2 : Produit */}
          <div className="text-center sm:text-left">
            <h4 className="font-display text-sm font-semibold text-ink mb-4">
              Produit
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/offres" className="text-sm text-stone-500 hover:text-accent transition-colors font-body">
                  Explorer les offres
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-stone-500 hover:text-accent transition-colors font-body">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-stone-500 hover:text-accent transition-colors font-body">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Ressources */}
          <div className="text-center sm:text-left">
            <h4 className="font-display text-sm font-semibold text-ink mb-4">
              Ressources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-stone-500 hover:text-accent transition-colors font-body">
                  Contact
                </Link>
              </li>
              <li>
                <span className="text-sm text-stone-400 font-body">Documentation (bientôt)</span>
              </li>
              <li>
                <span className="text-sm text-stone-400 font-body">API (bientôt)</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Légal */}
          <div className="text-center sm:text-left">
            <h4 className="font-display text-sm font-semibold text-ink mb-4">
              Légal
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-stone-400 font-body">Mentions légales</span>
              </li>
              <li>
                <span className="text-sm text-stone-400 font-body">Politique de confidentialité</span>
              </li>
              <li>
                <span className="text-sm text-stone-400 font-body">CGU</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="border-t border-stone-200 pt-8 flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-stone-500 font-body">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>JobBoard — Visualiseur d&apos;offres d&apos;emploi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Fait avec</span>
            <Heart className="h-3.5 w-3.5 text-accent fill-accent shrink-0" aria-hidden="true" />
            <span>et Next.js + Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}