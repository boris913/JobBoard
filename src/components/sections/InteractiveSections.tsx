"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Filter, LayoutGrid, List, Upload, Globe, Zap, Shield,
  BarChart3, ArrowRight, Check, ChevronDown, ChevronUp,
  Star, Users, Briefcase, Clock, MapPin, Building2,
  FileText, Sparkles, Heart, MessageCircle, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  IndeedLogo, LinkedInLogo, WTTJLogo,
  FranceTravailLogo, ApecLogo, HelloWorkLogo
} from "@/components/logos/JobSourceLogos";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ─── TRUST LOGOS ─── */
export function TrustLogos() {
  const sources = [
    { name: "Indeed France", Logo: IndeedLogo, color: "hover:text-[#FF5A1F]" },
    { name: "LinkedIn", Logo: LinkedInLogo, color: "hover:text-[#0A66C2]" },
    { name: "Welcome to the Jungle", Logo: WTTJLogo, color: "hover:text-[#1DAF8D]" },
    { name: "France Travail", Logo: FranceTravailLogo, color: "hover:text-[#0053B3]" },
    { name: "Apec", Logo: ApecLogo, color: "hover:text-[#E1000F]" },
    { name: "HelloWork", Logo: HelloWorkLogo, color: "hover:text-[#7C3AED]" },
  ];

  return (
    <section className="border-y border-stone-200 bg-white/40 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium text-stone-400 uppercase tracking-wider font-body mb-8">
          Sources déjà compatibles
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-6">
          {sources.map((s) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={cn(
                "group flex flex-col items-center gap-2 cursor-default transition-colors duration-300 text-stone-400",
                s.color
              )}
              title={s.name}
            >
              <s.Logo className="transition-colors duration-300" />
              <span className="text-[10px] font-medium font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1">
                {s.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─── */
const features = [
  {
    icon: Globe,
    title: "Agrégation multi-sources",
    desc: "Rassemblez les offres de Indeed, LinkedIn, Welcome to the Jungle, France Travail, Apec et HelloWork en un seul endroit.",
  },
  {
    icon: Filter,
    title: "Filtres intelligents",
    desc: "Filtrez par source, localisation, entreprise ou télétravail. Triez par date, titre ou entreprise pour trouver rapidement.",
  },
  {
    icon: LayoutGrid,
    title: "Vue grille & liste",
    desc: "Passez d'une vue compacte en grille à une vue détaillée en liste selon votre préférence de lecture.",
  },
  {
    icon: Upload,
    title: "Import JSON",
    desc: "Importez vos propres fichiers JSON d'offres scrapées via drag & drop. Prêt en quelques secondes.",
  },
  {
    icon: FileText,
    title: "Fiches détaillées",
    desc: "Chaque offre dispose d'une page dédiée avec description, localisation, date et lien direct vers le site original.",
  },
  {
    icon: Zap,
    title: "100 % gratuit",
    desc: "Aucun abonnement, aucune carte de crédit. JobBoard est un outil libre et gratuit pour les chercheurs d'emploi.",
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Un tableau de bord pensé pour les chercheurs d&apos;emploi
          </h2>
          <p className="mt-4 text-stone-500 font-body">
            Chaque fonctionnalité a été conçue pour vous faire gagner du temps et ne plus rien manquer.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-stone-200 bg-white/60 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-stone-500 font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Collecter les offres",
      desc: "Laissez notre scraper (Jarvis) collecter les offres pour vous.",
      icon: Upload,
    },
    {
      num: "02",
      title: "Filtrez & triez",
      desc: "Utilisez les filtres par source, ville ou télétravail. Triez par date de publication ou par ordre alphabétique.",
      icon: Filter,
    },
    {
      num: "03",
      title: "Postulez en un clic",
      desc: "Chaque offre redirige vers le site original. Plus besoin de chercher l'annonce perdue au milieu de 15 onglets.",
      icon: ArrowRight,
    },
  ];

  return (
    <section id="comment-ca-marche" className="py-24 sm:py-32 bg-white/40 border-y border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-stone-500 font-body">
            Trois étapes simples pour reprendre le contrôle de votre recherche d&apos;emploi.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="rounded-2xl border border-stone-200 bg-white/80 p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-bold text-stone-200">{step.num}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-3">{step.title}</h3>
                <p className="text-sm text-stone-500 font-body leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ─── */
export function Stats() {
  const stats = [
    { label: "Offres agrégées", value: "1 500+", icon: Briefcase },
    { label: "Sources connectées", value: "6", icon: Globe },
    { label: "Temps gagné / semaine", value: "4h", icon: Clock },
    { label: "Utilisateurs actifs", value: "100%", icon: Users },
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-stone-200 bg-white/60 p-6 text-center"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-3xl font-bold text-ink">{s.value}</div>
              <div className="mt-1 text-sm text-stone-500 font-body">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
export function Testimonials() {
  const testimonials = [
    {
      name: "Marie D.",
      role: "Développeuse Fullstack",
      text: "J'ai trouvé mon poste en 2 semaines au lieu de 2 mois. Le fait d'avoir toutes les offres Java de Lyon sur une seule page m'a fait gagner un temps fou.",
      stars: 5,
    },
    {
      name: "Thomas L.",
      role: "Product Owner",
      text: "Plus besoin de 15 onglets ouverts entre Indeed et LinkedIn. Je check JobBoard le matin, je postule sur ce qui me correspond, et c'est réglé.",
      stars: 5,
    },
    {
      name: "Sarah K.",
      role: "Data Analyst",
      text: "L'interface est d'une clarté exemplaire. Les filtres par source et la vue liste me permettent de scanner 50 offres en quelques minutes.",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white/40 border-y border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Ils ont retrouvé le contrôle de leur recherche
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-stone-200 bg-white/80 p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 font-body text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-display font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink font-body">{t.name}</div>
                  <div className="text-xs text-stone-400 font-body">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─── */
export function Pricing() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Un prix simple : gratuit
          </h2>
          <p className="mt-4 text-stone-500 font-body">
            JobBoard est et restera gratuit pour les particuliers. Pas de surprise.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-stone-200 bg-white/60 p-8">
            <div className="text-sm font-medium text-stone-500 font-body mb-2">Gratuit</div>
            <div className="font-display text-4xl font-bold text-ink">0 €</div>
            <div className="text-sm text-stone-400 font-body">pour toujours</div>
            <ul className="mt-6 space-y-3">
              {[
                "Agrégation multi-sources",
                "Filtres & tri avancés",
                "Vue grille & liste",
                "Import JSON illimité",
                "Pages détaillées par offre",
                "Pagination & navigation",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-stone-600 font-body">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/offres"
                className="block text-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-paper transition-all hover:bg-ink-soft active:scale-[0.98] font-body"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 relative">
            <div className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white font-body">
              Bientôt disponible
            </div>
            <div className="text-sm font-medium text-accent font-body mb-2">Pro</div>
            <div className="font-display text-4xl font-bold text-ink">9 €</div>
            <div className="text-sm text-stone-400 font-body">/ mois</div>
            <ul className="mt-6 space-y-3">
              {[
                "Tout du plan Gratuit",
                "Alertes email personnalisées",
                "Export Excel / CSV",
                "Statistiques de candidature",
                "Support prioritaire",
                "API d'accès",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-stone-600 font-body">
                  <Check className="h-4 w-4 text-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button
                disabled
                className="block w-full text-center rounded-xl border border-stone-300 bg-white/40 px-6 py-3 text-sm font-semibold text-stone-400 cursor-not-allowed font-body"
              >
                Arrive prochainement
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    {
      q: "Comment les offres sont-elles collectées ?",
      a: "Notre scraper (surnommé Jarvis) parcourt régulièrement les principaux sites d'emploi français. Vous pouvez aussi importer manuellement vos propres fichiers JSON d'offres via notre zone de drag & drop.",
    },
    {
      q: "JobBoard est-il vraiment gratuit ?",
      a: "Oui, intégralement. Aucune fonctionnalité de base n'est payante. Nous prévoyons un plan Pro à l'avenir pour des fonctionnalités avancées (alertes, export), mais le cœur du produit restera gratuit.",
    },
    {
      q: "Mes données personnelles sont-elles stockées ?",
      a: "Non. JobBoard ne stocke aucune donnée personnelle. Les offres sont lues depuis des fichiers JSON locaux ou générées à la volée. Votre recherche d'emploi reste entièrement privée.",
    },
    {
      q: "Quelles sources d'emploi sont supportées ?",
      a: "Actuellement : Indeed France, LinkedIn France (Public), Welcome to the Jungle, France Travail, Apec et HelloWork. La liste s'agrandit régulièrement.",
    },
    {
      q: "Puis-je contribuer au projet ?",
      a: "Absolument ! JobBoard est pensé comme un outil communautaire. Vous pouvez proposer des améliorations, de nouvelles sources ou des corrections via nos canaux de contact.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white/40 border-y border-stone-200">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Questions fréquentes
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border transition-all duration-200",
                open === i
                  ? "border-accent/20 bg-accent/5"
                  : "border-stone-200 bg-white/60 hover:border-stone-300"
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-display text-sm font-semibold text-ink">{faq.q}</span>
                {open === i ? (
                  <ChevronUp className="h-4 w-4 text-accent shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-stone-400 shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-stone-600 font-body leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-ink p-10 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 h-full w-full opacity-10">
            <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-paper tracking-tight">
              Prêt à ne plus rien manquer ?
            </h2>
            <p className="mt-4 text-stone-300 font-body max-w-lg mx-auto">
              Rejoignez les chercheurs d&apos;emploi qui ont déjà adopté JobBoard pour centraliser leurs opportunités.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/offres"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98] font-body shadow-lg shadow-accent/20"
              >
                Explorer les offres
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-600 bg-transparent px-6 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-white/10 active:scale-[0.98] font-body"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}