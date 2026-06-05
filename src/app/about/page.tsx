import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Target, Eye, Zap, ArrowRight, Users, Globe, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos — JobBoard",
  description: "Pourquoi JobBoard existe, notre mission et les valeurs qui guident notre produit.",
};

const values = [
  {
    icon: Target,
    title: "Simplicité",
    desc: "La recherche d'emploi est déjà assez complexe. Notre interface élimine le superflu pour ne garder que l'essentiel.",
  },
  {
    icon: Eye,
    title: "Transparence",
    desc: "Aucune donnée personnelle stockée, aucun algorithme opaque. Vous voyez exactement ce que nous voyons.",
  },
  {
    icon: Zap,
    title: "Efficacité",
    desc: "Chaque seconde compte. JobBoard est optimisé pour charger rapidement et filtrer instantanément.",
  },
  {
    icon: Heart,
    title: "Accessibilité",
    desc: "L'emploi est un droit. Notre outil est et restera gratuit pour les particuliers.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-3xl mb-16">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          À propos de JobBoard
        </h1>
        <p className="mt-6 text-lg text-stone-500 font-body leading-relaxed">
          JobBoard est né d&apos;une frustration simple : chercher un emploi en France signifie encore aujourd&apos;hui 
          jongler entre une demi-douzaine de plateformes, chacune avec sa propre interface, ses filtres limités et ses doublons.
        </p>
        <p className="mt-4 text-lg text-stone-500 font-body leading-relaxed">
          Nous avons construit cet outil pour les chercheurs d&apos;emploi qui veulent reprendre le contrôle de leur recherche 
          sans passer des heures à copier-coller des annonces dans un tableur.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-accent/5 p-8 sm:p-12 mb-24">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Alimenté par Jarvis</h2>
            <p className="text-stone-500 font-body mt-1">Notre scraper intelligent</p>
          </div>
        </div>
        <p className="text-stone-600 font-body leading-relaxed">
          Jarvis est le nom de notre robot de collecte. Il parcourt les principaux sites d&apos;emploi français 
          plusieurs fois par jour, normalise les données et élimine les doublons. Le résultat : un flux propre 
          et structuré d&apos;offres d&apos;emploi directement exploitable dans votre dashboard.
        </p>
      </div>

      <div className="mb-24">
        <h2 className="font-display text-3xl font-bold text-ink mb-10">Nos valeurs</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-stone-200 bg-white/60 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink mb-2">{v.title}</h3>
              <p className="text-sm text-stone-500 font-body leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-24">
        <div className="rounded-2xl border border-stone-200 bg-white/60 p-6 text-center">
          <Users className="h-8 w-8 text-accent mx-auto mb-3" />
          <div className="font-display text-3xl font-bold text-ink">1</div>
          <div className="text-sm text-stone-500 font-body">Créateur passionné</div>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white/60 p-6 text-center">
          <Globe className="h-8 w-8 text-accent mx-auto mb-3" />
          <div className="font-display text-3xl font-bold text-ink">6</div>
          <div className="text-sm text-stone-500 font-body">Sources connectées</div>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white/60 p-6 text-center">
          <Heart className="h-8 w-8 text-accent mx-auto mb-3" />
          <div className="font-display text-3xl font-bold text-ink">∞</div>
          <div className="text-sm text-stone-500 font-body">Amour du produit</div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Vous voulez contribuer ?</h2>
        <p className="text-stone-500 font-body mb-6 max-w-lg mx-auto">
          JobBoard est un projet vivant. Vous avez une idée, un bug à signaler ou une nouvelle source à suggérer ?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-ink-soft active:scale-[0.98] font-body"
        >
          Nous écrire
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
