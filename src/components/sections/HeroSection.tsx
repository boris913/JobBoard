"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, ArrowRight, Shield, Sparkles, MapPin, Clock } from "lucide-react";
import { JobOffer } from "@/lib/offers";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface HeroProps {
  offers: JobOffer[];
}

export function HeroSection({ offers }: HeroProps) {
  // Prend les 3 premières offres pour le mockup, ou des placeholders si vide
  const displayOffers = offers.slice(0, 3);
  const hasOffers = displayOffers.length > 0;

  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent border border-accent/20 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              {hasOffers ? `${offers.length} offres disponibles` : "Nouveau : importez vos fichiers JSON"}
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.1]">
              Toutes vos offres d&apos;emploi,{" "}
              <span className="text-accent">centralisées</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-stone-600 font-body leading-relaxed max-w-lg">
              Finissez de jongler entre Indeed, LinkedIn, Welcome to the Jungle et les autres.
              JobBoard agrège automatiquement les offres qui vous correspondent en un seul tableau de bord clair.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/offres"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-ink-soft active:scale-[0.98] font-body shadow-lg shadow-ink/10"
              >
                Explorer les offres
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#comment-ca-marche"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-stone-50 active:scale-[0.98] font-body"
              >
                Comment ça marche ?
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} custom={4} className="mt-6 text-xs text-stone-400 font-body flex items-center gap-2">
              <Shield className="h-3.5 w-3.5" />
              100 % gratuit · Aucune donnée personnelle stockée
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-2xl shadow-stone-200/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-auto text-xs text-stone-400 font-mono">job-board.app/offres</div>
              </div>

              <div className="space-y-3">
                {hasOffers ? (
                  displayOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className="rounded-xl border border-stone-100 bg-paper/60 p-4 flex items-center gap-4 hover:border-accent/20 transition-colors cursor-pointer group"
                    >
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-sm font-semibold text-ink truncate group-hover:text-accent transition-colors">
                          {offer.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-stone-500 font-body">{offer.company}</span>
                          {offer.location && (
                            <span className="flex items-center gap-1 text-xs text-stone-400">
                              <MapPin className="h-3 w-3" />
                              {offer.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-medium text-accent">
                          <Clock className="h-3 w-3" />
                          {offer.source || "Voir"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback skeleton si aucune donnée
                  <>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl border border-stone-100 bg-paper/60 p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-stone-200/70 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-stone-400" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-3/4 rounded bg-stone-200/70" />
                          <div className="h-3 w-1/2 rounded bg-stone-200/50" />
                        </div>
                        <div className="h-6 w-20 rounded-full bg-accent/10 border border-accent/20" />
                      </div>
                    ))}
                    <div className="text-center text-xs text-stone-400 py-2">
                      Placeholder — aucune donnée trouvée dans /data
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <div className="h-8 flex-1 rounded-lg bg-stone-100 flex items-center px-3 text-xs text-stone-400">
                  {hasOffers ? `${offers.length} offres chargées...` : "Recherche..."}
                </div>
                <div className="h-8 w-24 rounded-lg bg-stone-100 flex items-center justify-center text-xs text-stone-500 font-medium">
                  Filtrer
                </div>
              </div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-stone-300/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}