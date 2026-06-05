import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Job } from "@/types/job";
import { JobDetailClient } from "./JobDetailClient";
import { loadOffers } from "@/lib/offers";
import { extractCity } from "@/lib/utils";

// Fonction d'aide pour charger et adapter les données localement
function getAdaptedJobs(): Job[] {
  const rawOffers = loadOffers();
  return rawOffers.map((offer) => ({
    title: offer.title,
    company: offer.company,
    location: offer.location || "Non précisée",
    date_posted: offer.date || "",
    url: offer.url || "",
    source: offer.source || "Inconnue",
    description_snippet: offer.description || "",
  }));
}

function findJobById(jobs: Job[], id: string): Job | null {
  const decodedId = decodeURIComponent(id);
  return jobs.find(job => `${job.title}-${job.company}-${job.location}` === decodedId) || null;
}

export async function generateStaticParams() {
  // Extraction locale et synchrone pendant le build
  const jobs = getAdaptedJobs();
  return jobs.map((job) => ({
    id: encodeURIComponent(`${job.title}-${job.company}-${job.location}`),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const jobs = getAdaptedJobs();
  const job = findJobById(jobs, id);

  if (!job) {
    return { title: "Offre non trouvée — JobBoard" };
  }

  return {
    title: `${job.title} chez ${job.company} — JobBoard`,
    description: `Poste de ${job.title} chez ${job.company} à ${job.location}. Consultez et postulez via JobBoard.`,
    openGraph: {
      title: `${job.title} — ${job.company}`,
      description: `Offre d'emploi à ${job.location}`,
      type: "article",
    },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobs = getAdaptedJobs();
  const job = findJobById(jobs, id);

  if (!job) notFound();

  // On extrait la ville proprement grâce à ta fonction utilitaire
  const targetCity = extractCity(job.location);

  // Offres similaires : même source OU même ville (basé sur le nom nettoyé), exclure l'offre actuelle
  const similarJobs = jobs
    .filter((j) => {
      const isSameUrl = j.url === job.url;
      const isSameSource = j.source === job.source;
      const isSameCity = targetCity !== "Non précisé" && extractCity(j.location) === targetCity;
      
      return !isSameUrl && (isSameSource || isSameCity);
    })
    .slice(0, 4);

  return <JobDetailClient job={job} similarJobs={similarJobs} allJobsCount={jobs.length} />;
}