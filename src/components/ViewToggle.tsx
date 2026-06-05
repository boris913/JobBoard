import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white p-1">
      <Button
        variant={view === "grid" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        aria-label="Affichage en grille"
        className="px-3"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        aria-label="Affichage en liste"
        className="px-3"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}