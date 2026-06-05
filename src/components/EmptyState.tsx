import { SearchX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "Aucune offre trouvée." }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-white/40 py-12 text-center">
      <div className="rounded-full bg-stone-100 p-3">
        <SearchX className="h-6 w-6 text-stone-400" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">
        {message}
      </h3>
      <p className="mt-1 text-sm text-stone-500">
        Vérifiez que le dossier <code className="rounded bg-stone-100 px-1">data/</code> contient des fichiers JSON valides.
      </p>
    </div>
  );
}