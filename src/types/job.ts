// types/job.ts

export interface Job {
  title: string;
  company: string;
  location: string;
  date_posted: string;
  url: string;
  source: string;
  description_snippet: string;
}

export type SortField = "title" | "company" | "location" | "date_posted" | "source";
export type SortDirection = "asc" | "desc";

export interface FilterState {
  search: string;
  source: string;
  location: string;
}

export interface SortState {
  field: SortField;
  direction: SortDirection;
}
