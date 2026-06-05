import Link from "next/link";
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/Badge";
import { getSourceColor, isRemote, formatDate } from "@/lib/utils";
import { MapPin, Building2, Calendar, ExternalLink } from "lucide-react";

interface JobCardProps {
  job: Job;
  view: "grid" | "list";
}

export function JobCard({ job, view }: JobCardProps) {
  const sourceColor = getSourceColor(job.source);
  const remote = isRemote(job.location);
  const jobId = encodeURIComponent(`${job.title}-${job.company}-${job.location}`);

  if (view === "grid") {
    return (
      <Link href={`/job/${jobId}`} className="group block">
        <div className="h-full rounded-xl border border-stone-200 bg-white/80 p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
          <h3 className="font-display text-base sm:text-lg font-semibold text-ink line-clamp-2">{job.title}</h3>
          <div className="mt-2 flex items-center gap-1 text-sm text-stone-500">
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{job.company}</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-stone-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{job.location || "Non précisée"}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="colored" className={sourceColor}>
              {job.source}
            </Badge>
            {remote && <Badge variant="outline">🌍 Télétravail</Badge>}
          </div>
        </div>
      </Link>
    );
  }

  // Vue liste
  return (
    <div className="group rounded-xl border border-stone-200 bg-white/80 p-4 sm:p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between min-w-0">
        <div className="flex-1 space-y-2 min-w-0">
          <Link href={`/job/${jobId}`} className="hover:underline">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-ink break-words">{job.title}</h3>
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-500">
            <div className="flex items-center gap-1 min-w-0">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.company}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.location || "Non précisée"}</span>
            </div>
            {job.date_posted && (
              <div className="flex items-center gap-1 shrink-0">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>{formatDate(job.date_posted)}</span>
              </div>
            )}
          </div>
          {job.description_snippet && (
            <p className="mt-2 text-sm text-stone-600 line-clamp-2">{job.description_snippet}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:shrink-0">
          <Badge variant="colored" className={sourceColor}>
            {job.source}
          </Badge>
          {remote && (
            <Badge variant="outline" className="border-accent/30 text-accent">
              Télétravail possible
            </Badge>
          )}
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent-dark"
            onClick={(e) => e.stopPropagation()}
          >
            Voir l&apos;offre
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}