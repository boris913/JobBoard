import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Job } from "@/types/job";
import { JobDetailClient } from "./JobDetailClient";

async function getAllJobs(): Promise<Job[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/jobs`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

function findJobById(jobs: Job[], id: string): Job | null {
  const decodedId = decodeURIComponent(id);
  return jobs.find(job => `${job.title}-${job.company}-${job.location}` === decodedId) || null;
}

export async function generateStaticParams() {
  const jobs = await getAllJobs();
  return jobs.map((job) => ({
    id: encodeURIComponent(`${job.title}-${job.company}-${job.location}`),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const jobs = await getAllJobs();
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
  const jobs = await getAllJobs();
  const job = findJobById(jobs, id);

  if (!job) notFound();

  // Offres similaires : même source ou même ville, exclure l'offre actuelle
  const similarJobs = jobs
    .filter((j) => j.url !== job.url && (j.source === job.source || j.location.includes(job.location.split(" ")[0])))
    .slice(0, 4);

  return <JobDetailClient job={job} similarJobs={similarJobs} allJobsCount={jobs.length} />;
}
