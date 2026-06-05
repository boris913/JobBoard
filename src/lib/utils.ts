import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.trim() === "") return "Date non précisée";
  return dateStr;
}

export function extractCity(location: string): string {
  if (!location) return "Non précisé";
  // Remove postal codes like "75001 " or "(75)"
  return location
    .replace(/\b\d{5}\b\s*/g, "")
    .replace(/\(\d+\)/g, "")
    .trim();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    "Indeed France": "bg-blue-50 text-blue-700 border-blue-200",
    "LinkedIn France (Public)": "bg-sky-50 text-sky-700 border-sky-200",
    "Welcome to the Jungle": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "France Travail": "bg-violet-50 text-violet-700 border-violet-200",
    "Apec": "bg-orange-50 text-orange-700 border-orange-200",
    "HelloWork": "bg-pink-50 text-pink-700 border-pink-200",
  };
  return colors[source] ?? "bg-stone-100 text-stone-600 border-stone-200";
}

export function isRemote(location: string): boolean {
  const lower = location?.toLowerCase() ?? "";
  return lower.includes("télétravail") || lower.includes("remote") || lower.includes("distanciel");
}
