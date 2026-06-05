"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Building2, Calendar, ExternalLink, ArrowLeft, Share2,
  Bookmark, Check, Globe, Clock, Briefcase, ChevronRight, Copy,
  AlertTriangle, Wifi, X
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Job } from "@/types/job";
import { getSourceColor, isRemote, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface JobDetailClientProps {
  job: Job;
  similarJobs: Job[];
  allJobsCount: number;
}

/* ─── Breadcrumb ─── */
function Breadcrumb({ job }: { job: Job }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-stone-400 font-body mb-6">
      <Link href="/offres" className="hover:text-accent transition-colors">Offres</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-stone-500 truncate max-w-[200px] sm:max-w-xs">{job.title}</span>
    </nav>
  );
}

/* ─── Share Modal ─── */
function ShareModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareData = { title, text: title, url };
  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  const handleNativeShare = async () => {
    try {
      await navigator.share(shareData);
      onClose();
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-ink">Partager l&apos;offre</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-stone-100 transition-colors">
            <X className="h-4 w-4 text-stone-400" />
          </button>
        </div>
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 mb-4">
          <p className="text-xs text-stone-400 font-mono break-all">{url}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copié !" : "Copier le lien"}
          </Button>
          {canNativeShare && (
            <Button variant="primary" className="flex-1" onClick={handleNativeShare}>
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Similar Job Card ─── */
function SimilarJobCard({ job }: { job: Job }) {
  const sourceColor = getSourceColor(job.source);
  const remote = isRemote(job.location);
  const jobId = encodeURIComponent(`${job.title}-${job.company}-${job.location}`);

  return (
    <Link href={`/job/${jobId}`} className="group block">
      <div className="rounded-xl border border-stone-200 bg-white/60 p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-stone-300">
        <h4 className="font-display text-sm font-semibold text-ink line-clamp-2 group-hover:text-accent transition-colors">
          {job.title}
        </h4>
        <div className="mt-2 flex items-center gap-1 text-xs text-stone-500">
          <Building2 className="h-3 w-3" />
          <span className="truncate">{job.company}</span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-stone-500">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{job.location || "Non précisée"}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge variant="colored" className={cn("text-[10px]", sourceColor)}>
            {job.source}
          </Badge>
          {remote && (
            <Badge variant="outline" className="text-[10px] border-accent/30 text-accent">
              Télétravail
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Component ─── */
export function JobDetailClient({ job, similarJobs, allJobsCount }: JobDetailClientProps) {
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const sourceColor = getSourceColor(job.source);
  const remote = isRemote(job.location);
  const hasDate = job.date_posted && job.date_posted.trim() !== "";

  const toggleSave = () => {
    setSaved(!saved);
    // Ici on pourrait persister dans localStorage
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const jobKey = `${job.title}-${job.company}-${job.location}`;
    if (!saved) {
      localStorage.setItem("savedJobs", JSON.stringify([...savedJobs, jobKey]));
    } else {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs.filter((k: string) => k !== jobKey)));
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb job={job} />

      {/* ─── Header Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-stone-200 bg-white/80 p-6 sm:p-8 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="colored" className={sourceColor}>
                {job.source}
              </Badge>
              {remote && (
                <Badge variant="outline" className="border-accent/30 text-accent">
                  <Wifi className="h-3 w-3 mr-1" />
                  Télétravail possible
                </Badge>
              )}
              {hasDate && (
                <Badge variant="default">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(job.date_posted)}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight leading-tight">
              {job.title}
            </h1>

            {/* Company & Location */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600 font-body">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100">
                  <Building2 className="h-4 w-4 text-stone-500" />
                </div>
                <span className="font-medium text-ink">{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100">
                  <MapPin className="h-4 w-4 text-stone-500" />
                </div>
                <span>{job.location || "Localisation non précisée"}</span>
              </div>
              {hasDate && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100">
                    <Calendar className="h-4 w-4 text-stone-500" />
                  </div>
                  <span>Publiée {formatDate(job.date_posted)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98] font-body shadow-lg shadow-accent/15 w-full lg:w-auto"
            >
              Postuler sur {job.source}
              <ExternalLink className="h-4 w-4" />
            </a>
            <div className="flex gap-2 w-full lg:w-auto">
              <Button
                variant="secondary"
                size="md"
                onClick={toggleSave}
                className={cn("flex-1 lg:flex-none", saved && "border-amber-200 bg-amber-50 text-amber-700")}
              >
                <Bookmark className={cn("h-4 w-4", saved && "fill-amber-500 text-amber-500")} />
                {saved ? "Sauvegardé" : "Sauvegarder"}
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShareOpen(true)}
                className="flex-1 lg:flex-none"
              >
                <Share2 className="h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* ─── Main Content ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Description */}
          {/* <div className="rounded-2xl border border-stone-200 bg-white/80 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-ink">Description du poste</h2>
            </div>
            {job.description_snippet ? (
              <div className="prose prose-stone max-w-none">
                <p className="text-stone-600 font-body leading-relaxed whitespace-pre-line">
                  {job.description_snippet}
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-stone-50 border border-stone-100 p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-stone-300 mx-auto mb-3" />
                <p className="text-sm text-stone-500 font-body">
                  La description complète n&apos;est pas disponible dans nos données.
                </p>
                <p className="text-xs text-stone-400 font-body mt-1">
                  Consultez l&apos;offre originale sur {job.source} pour plus de détails.
                </p>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-accent hover:text-accent-dark transition-colors font-body"
                >
                  Voir l&apos;offre complète
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div> */}

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <div className="rounded-2xl border border-stone-200 bg-white/80 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-lg font-semibold text-ink">Offres similaires</h2>
                <Link
                  href="/offres"
                  className="text-sm font-medium text-accent hover:text-accent-dark transition-colors font-body"
                >
                  Voir tout
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {similarJobs.map((sj, i) => (
                  <motion.div
                    key={sj.url || i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <SimilarJobCard job={sj} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* ─── Sidebar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Apply Card */}
          {/* <div className="rounded-2xl border border-stone-200 bg-white/80 p-6">
            <h3 className="font-display text-sm font-semibold text-ink mb-4">Postuler</h3>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98] font-body shadow-lg shadow-accent/15"
            >
              Postuler sur {job.source}
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-stone-400 text-center font-body">
              Vous serez redirigé vers {job.source}
            </p>
          </div> */}

          {/* Job Info Card */}
          <div className="rounded-2xl border border-stone-200 bg-white/80 p-6">
            <h3 className="font-display text-sm font-semibold text-ink mb-4">Informations</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Globe className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-stone-400 font-body">Source</div>
                  <div className="text-sm font-medium text-ink font-body">{job.source}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-stone-400 font-body">Entreprise</div>
                  <div className="text-sm font-medium text-ink font-body">{job.company}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-stone-400 font-body">Localisation</div>
                  <div className="text-sm font-medium text-ink font-body">{job.location || "Non précisée"}</div>
                </div>
              </div>
              {hasDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-stone-400 font-body">Date de publication</div>
                    <div className="text-sm font-medium text-ink font-body">{formatDate(job.date_posted)}</div>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Wifi className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-stone-400 font-body">Télétravail</div>
                  <div className="text-sm font-medium text-ink font-body">
                    {remote ? "Possible" : "Non précisé"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="rounded-2xl border border-stone-200 bg-white/80 p-6">
            <h3 className="font-display text-sm font-semibold text-ink mb-3">Base de données</h3>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold text-accent">{allJobsCount}</span>
              <span className="text-sm text-stone-500 font-body">offres indexées</span>
            </div>
            <Link
              href="/offres"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark transition-colors font-body"
            >
              Explorer toutes les offres
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom CTA ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex items-center justify-between rounded-xl border border-stone-200 bg-white/60 p-4 sm:p-6"
      >
        <Link
          href="/offres"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-ink transition-colors font-body"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux offres
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleSave}>
            <Bookmark className={cn("h-4 w-4", saved && "fill-amber-500 text-amber-500")} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShareOpen(true)}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* ─── Share Modal ─── */}
      {shareOpen && (
        <ShareModal
          url={typeof window !== "undefined" ? window.location.href : job.url}
          title={job.title}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}
