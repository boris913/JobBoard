"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Job, SortState, FilterState } from "@/types/job";
import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { StatsBar } from "@/components/StatsBar";
import { ViewToggle } from "@/components/ViewToggle";
import { Pagination } from "@/components/Pagination";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";

function OffresPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [dataSource, setDataSource] = useState<"api" | "upload">("api");
  const itemsPerPage = 12;

  // Lire la page depuis l'URL, défaut à 1
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    source: "",
    location: "",
  });
  const [sort, setSort] = useState<SortState>({ field: "date_posted", direction: "desc" });

  // Synchroniser l'état local avec l'URL
  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    if (!isNaN(urlPage) && urlPage >= 1) {
      setCurrentPage(urlPage);
    }
  }, [searchParams]);

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
    // Ne pas réinitialiser la page ici, laisser l'URL gérer
  }, [jobs, filters, sort]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Fonction pour changer de page et mettre à jour l'URL
  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(newPage);
    
    // Mettre à jour l'URL avec le paramètre de page
    const params = new URLSearchParams(searchParams.toString());
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl, { scroll: false });
  };

  // Réinitialiser à la page 1 quand les filtres changent significativement
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Réinitialiser la page à 1 quand les filtres changent
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl, { scroll: false });
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: SortState) => {
    setSort(newSort);
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
        </div>
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
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
              />
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>

          <div className={`mt-8 ${view === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}`}>
            {paginatedJobs.map((job, idx) => (
              <JobCard 
                key={job.url || idx} 
                job={job} 
                view={view} 
                currentPage={currentPage}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}

      {jobs.length === 0 && !loading && (
        <EmptyState message="Aucune offre trouvée. Placez vos fichiers JSON dans le dossier 'data' ou importez-en un." />
      )}
    </div>
  );
}

export default function OffresPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    }>
      <OffresPageContent />
    </Suspense>
  );
}