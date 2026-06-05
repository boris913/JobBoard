import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe, Filter, LayoutGrid, List, Upload, FileText,
  Zap, Shield, BarChart3, ArrowRight, Check, Sparkles,
  Search, MapPin, Calendar, Building2, Wifi
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fonctionnalités — JobBoard",
  description: "Découvrez toutes les fonctionnalités de JobBoard : agrégation, filtres, import JSON, fiches détaillées et plus encore.",
};

const mainFeatures = [
  {
    icon: Globe,
    title: "Agrégation multi-sources",
    desc: "Rassemblez automatiquement les offres de Indeed, LinkedIn, Welcome to the Jungle, France Travail, Apec et HelloWork. Plus besoin de consulter 6 sites différents.",
    points: ["Mise à jour régulière", "Déduplication par URL", "Badges colorés par source"],
  },
  {
    icon: Filter,
    title: "Filtres & tri avancés",
    desc: "Affinez votre recherche avec des filtres puissants et un tri flexible pour trouver l'offre parfaite en quelques secondes.",
    points: ["Recherche textuelle full-text", "Filtre par source et ville", "Tri A→Z / Z→A sur 5 champs"],
  },
  {
    icon: LayoutGrid,
    title: "Double vue : Grille & Liste",
    desc: "Adaptez l'affichage à votre style de lecture. La grille offre un aperçu rapide, la liste donne plus de contexte.",
    points: ["Vue grille responsive (1-3 colonnes)", "Vue liste avec snippet", "Switch instantané"],
  },
  {
    icon: Upload,
    title: "Import JSON par drag & drop",
    desc: "Avez-vous scrapé vos propres offres ? Importez-les instantanément via notre zone de dépôt sécurisée.",
    points: ["Support du format JSON tableau", "Validation automatique", "Reset rapide"],
  },
  {
    icon: FileText,
    title: "Fiches détaillées",
    desc: "Chaque offre dispose d'une page dédiée avec toutes les informations essentielles et un lien direct vers le site original.",
    points: ["URL canonique par offre", "Description complète", "CTA 'Postuler' direct"],
  },
  {
    icon: Zap,
    title: "Performance & UX",
    desc: "Une interface légère, rapide et accessible. Construite avec Next.js 14, Tailwind CSS et Framer Motion.",
    points: ["Pagination côté client", "Animations fluides", "100% responsive"],
  },
];

const techSpecs = [
  { label: "Framework", value: "Next.js 14 (App Router)" },
  { label: "Styling", value: "Tailwind CSS + CSS custom" },
  { label: "Animations", value: "Framer Motion" },
  { label: "Icônes", value: "Lucide React" },
  { label: "Fonts", value: "Syne, DM Sans, DM Mono" },
  { label: "Hébergement", value: "Vercel-ready" },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-2xl mb-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent border border-accent/20 mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Fonctionnalités
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          Tout ce dont vous avez besoin
        </h1>
        <p className="mt-4 text-lg text-stone-500 font-body leading-relaxed">
          JobBoard combine les outils essentiels pour transformer votre recherche d&apos;emploi en expérience fluide et efficace.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-24">
        {mainFeatures.map((f, i) => (
          <div
            key={f.title}
            className="rounded-2xl border border-stone-200 bg-white/60 p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-ink mb-3">{f.title}</h3>
            <p className="text-stone-500 font-body text-sm leading-relaxed mb-5">{f.desc}</p>
            <ul className="space-y-2">
              {f.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-stone-600 font-body">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-stone-200 bg-ink p-8 sm:p-12 mb-24">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-paper mb-8">Spécifications techniques</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techSpecs.map((spec) => (
            <div key={spec.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="text-xs text-stone-400 font-mono uppercase tracking-wider mb-1">{spec.label}</div>
              <div className="text-sm font-medium text-paper font-body">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Convaincu ?</h2>
        <p className="text-stone-500 font-body mb-6">Commencez à centraliser vos offres dès maintenant.</p>
        <Link
          href="/offres"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98] font-body"
        >
          Voir les offres
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
