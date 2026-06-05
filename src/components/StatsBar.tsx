"use client";

import { Briefcase, Building2, MapPin, Wifi } from "lucide-react";
import { Job } from "@/types/job";
import { isRemote } from "@/lib/utils";

interface StatsBarProps {
  jobs: Job[];
  filteredCount: number;
}

export function StatsBar({ jobs, filteredCount }: StatsBarProps) {
  const uniqueCompanies = new Set(jobs.map((j) => j.company)).size;
  const uniqueLocations = new Set(jobs.map((j) => j.location)).size;
  const remoteJobs = jobs.filter((j) => isRemote(j.location)).length;

  const stats = [
    {
      icon: Briefcase,
      value: jobs.length,
      label: "offre" + (jobs.length > 1 ? "s" : ""),
      highlight: filteredCount < jobs.length,
      filtered: filteredCount,
    },
    { icon: Building2, value: uniqueCompanies, label: "entreprise" + (uniqueCompanies > 1 ? "s" : "") },
    { icon: MapPin, value: uniqueLocations, label: "localisation" + (uniqueLocations > 1 ? "s" : "") },
    { icon: Wifi, value: remoteJobs, label: "télétravail" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ icon: Icon, value, label, highlight, filtered }) => (
        <div
          key={label}
          className="rounded-xl border border-stone-200 bg-white/60 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-xs text-stone-500 font-body">{label}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-bold text-ink">
              {highlight && filtered !== undefined ? filtered : value}
            </span>
            {highlight && filtered !== undefined && (
              <span className="text-xs text-stone-400 font-mono">/ {value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
