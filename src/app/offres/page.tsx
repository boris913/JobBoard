"use client";

import { useState, useEffect } from "react";
import { Job, SortState, FilterState } from "@/types/job";
import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { StatsBar } from "@/components/StatsBar";
import { ViewToggle } from "@/components/ViewToggle";
import { Pagination } from "@/components/Pagination";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { UploadZone } from "@/components/UploadZone";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export default function OffresPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<"api" | "upload">("api");
  const itemsPerPage = 12;

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    source: "",
    location: "",
  });
  const [sort, setSort] = useState<SortState>({ field: "date_posted", direction: "desc" });

  useEffect(() => {
    if (dataSource === "api") {
      setLoading(true);
      fetch("/api/jobs")
        .then(res => res.json())
        .then(data => {
          setJobs(data);
          setFilteredJobs(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [dataSource]);

  useEffect(() => {
    let result = [...jobs];

    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower)
      );
    }
    if (filters.source) {
      result = result.filter(job => job.source === filters.source);
    }
    if (filters.location) {
      result = result.filter(job => job.location.includes(filters.location));
    }

    result.sort((a, b) => {
      let aVal = a[sort.field] || "";
      let bVal = b[sort.field] || "";
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
      if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredJobs(result);
    setCurrentPage(1);
  }, [jobs, filters, sort]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleJobsLoaded = (uploadedJobs: Job[]) => {
    setJobs(uploadedJobs);
    setFilteredJobs(uploadedJobs);
    setDataSource("upload");
  };

  if (loading && dataSource === "api") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 h-10 w-48 skeleton rounded" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Offres d&apos;emploi
        </h1>
        <p className="mt-2 text-stone-500 font-body">
          {jobs.length} offre(s) disponible(s) · Centralisées pour vous
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setDataSource("api")}
            className={`text-sm font-medium font-body pb-1 border-b-2 transition-colors ${
              dataSource === "api" ? "border-accent text-accent" : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            Offres agrégées
          </button>
          {/* <button
            onClick={() => setDataSource("upload")}
            className={`text-sm font-medium font-body pb-1 border-b-2 transition-colors ${
              dataSource === "upload" ? "border-accent text-accent" : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            Importer un fichier
          </button> */}
        </div>

        {/* {dataSource === "upload" && (
          <div className="mb-8">
            <UploadZone onJobsLoaded={handleJobsLoaded} />
            {jobs.length === 0 && (
              <p className="mt-4 text-sm text-stone-500 text-center font-body">
                Glissez un fichier JSON ou cliquez pour sélectionner
              </p>
            )}
          </div>
        )} */}
      </div>

      {jobs.length > 0 && (
        <>
          <StatsBar jobs={jobs} filteredCount={filteredJobs.length} />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <FilterBar
                jobs={jobs}
                filters={filters}
                sort={sort}
                onFilterChange={setFilters}
                onSortChange={setSort}
              />
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>

          <div className={`mt-8 ${view === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}`}>
            {paginatedJobs.map((job, idx) => (
              <JobCard key={job.url || idx} job={job} view={view} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}

      {jobs.length === 0 && !loading && (
        <EmptyState message="Aucune offre trouvée. Placez vos fichiers JSON dans le dossier 'data' ou importez-en un." />
      )}
    </div>
  );
}
