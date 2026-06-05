"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { FilterState, SortState, SortField } from "@/types/job";
import { Job } from "@/types/job";

interface FilterBarProps {
  jobs: Job[];
  filters: FilterState;
  sort: SortState;
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortState) => void;
}

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "title", label: "Titre" },
  { value: "company", label: "Entreprise" },
  { value: "location", label: "Localisation" },
  { value: "source", label: "Source" },
  { value: "date_posted", label: "Date" },
];

export function FilterBar({ jobs, filters, sort, onFilterChange, onSortChange }: FilterBarProps) {
  const sources = Array.from(new Set(jobs.map((j) => j.source))).filter(Boolean).sort();
  const locations = Array.from(
    new Set(jobs.map((j) => j.location.split(" à ").pop()?.trim() ?? j.location))
  )
    .filter(Boolean)
    .sort();

  const hasFilters = filters.search || filters.source || filters.location;

  const clearFilters = () => {
    onFilterChange({ search: "", source: "", location: "" });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-stone-400" aria-hidden="true" />
        <span className="text-sm font-medium text-stone-600 font-body">Filtres & tri</span>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
            aria-label="Effacer tous les filtres"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Effacer
          </Button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <Input
          icon={<Search className="h-4 w-4" aria-hidden="true" />}
          placeholder="Rechercher…"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          aria-label="Rechercher dans les offres"
          className="lg:col-span-1"
        />

        {/* Source filter */}
        <Select
          value={filters.source}
          onChange={(e) => onFilterChange({ ...filters, source: e.target.value })}
          aria-label="Filtrer par source"
        >
          <option value="">Toutes les sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>

        {/* Location filter */}
        <Select
          value={filters.location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          aria-label="Filtrer par localisation"
        >
          <option value="">Toutes les villes</option>
          {locations.slice(0, 30).map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </Select>

        {/* Sort */}
        <div className="flex gap-2">
          <Select
            value={sort.field}
            onChange={(e) => onSortChange({ ...sort, field: e.target.value as SortField })}
            aria-label="Trier par"
            className="flex-1"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              onSortChange({ ...sort, direction: sort.direction === "asc" ? "desc" : "asc" })
            }
            aria-label={`Ordre ${sort.direction === "asc" ? "croissant" : "décroissant"}`}
            className="px-3 shrink-0"
          >
            <span className="font-mono text-xs">{sort.direction === "asc" ? "A→Z" : "Z→A"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
