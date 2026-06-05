"use client";

import { useCallback, useState, useRef } from "react";
import { Upload, FileJson, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/Button";

interface UploadZoneProps {
  onJobsLoaded: (jobs: Job[]) => void;
}

type UploadStatus = "idle" | "dragging" | "loading" | "success" | "error";

export function UploadZone({ onJobsLoaded }: UploadZoneProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [jobCount, setJobCount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".json")) {
        setStatus("error");
        setErrorMsg("Le fichier doit être au format .json");
        return;
      }

      setStatus("loading");
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const data = JSON.parse(text);

          if (!Array.isArray(data)) {
            throw new Error("Le fichier doit contenir un tableau JSON d'offres.");
          }

          const jobs: Job[] = data.map((item: Record<string, unknown>) => ({
            title: String(item.title ?? ""),
            company: String(item.company ?? ""),
            location: String(item.location ?? ""),
            date_posted: String(item.date_posted ?? ""),
            url: String(item.url ?? ""),
            source: String(item.source ?? ""),
            description_snippet: String(item.description_snippet ?? ""),
          }));

          setJobCount(jobs.length);
          setStatus("success");
          onJobsLoaded(jobs);
        } catch (err) {
          setStatus("error");
          setErrorMsg(
            err instanceof Error ? err.message : "Erreur lors de la lecture du fichier."
          );
        }
      };
      reader.onerror = () => {
        setStatus("error");
        setErrorMsg("Impossible de lire le fichier.");
      };
      reader.readAsText(file);
    },
    [onJobsLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setStatus("idle");
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setStatus("dragging");
  };

  const handleDragLeave = () => {
    if (status === "dragging") setStatus("idle");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMsg("");
    setFileName("");
    setJobCount(0);
    if (inputRef.current) inputRef.current.value = "";
    onJobsLoaded([]);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Zone de dépôt de fichier JSON"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onClick={() => {
        if (status === "idle" || status === "error") inputRef.current?.click();
      }}
      className={cn(
        "relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        status === "idle" &&
          "border-stone-300 bg-white/40 hover:border-accent/50 hover:bg-white/60",
        status === "dragging" &&
          "border-accent bg-accent/5 scale-[1.01] shadow-lg shadow-accent/10",
        status === "loading" && "border-stone-300 bg-white/40 cursor-wait pointer-events-none",
        status === "success" &&
          "border-emerald-300 bg-emerald-50/50 cursor-default",
        status === "error" &&
          "border-red-300 bg-red-50/50 hover:border-red-400"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        aria-hidden="true"
        tabIndex={-1}
        className="sr-only"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center justify-center px-6 py-14 sm:py-16 text-center">
        {/* Icon */}
        <div
          className={cn(
            "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300",
            status === "idle" && "bg-stone-100 text-stone-400",
            status === "dragging" && "bg-accent text-white scale-110",
            status === "loading" && "bg-stone-100 text-stone-400",
            status === "success" && "bg-emerald-100 text-emerald-600",
            status === "error" && "bg-red-100 text-red-500"
          )}
        >
          {status === "loading" ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
          ) : status === "success" ? (
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          ) : status === "error" ? (
            <AlertCircle className="h-7 w-7" aria-hidden="true" />
          ) : status === "dragging" ? (
            <Upload className="h-7 w-7" aria-hidden="true" />
          ) : (
            <FileJson className="h-7 w-7" aria-hidden="true" />
          )}
        </div>

        {/* Text */}
        {status === "idle" && (
          <>
            <p className="font-display text-lg font-semibold text-ink">
              Déposez votre fichier JSON ici
            </p>
            <p className="mt-1.5 text-sm text-stone-500 font-body">
              ou{" "}
              <span className="text-accent underline underline-offset-2 font-medium">
                cliquez pour parcourir
              </span>
            </p>
            <p className="mt-3 text-xs text-stone-400 font-mono">
              Format attendu : tableau JSON d&apos;offres d&apos;emploi
            </p>
          </>
        )}

        {status === "dragging" && (
          <p className="font-display text-lg font-semibold text-accent">
            Relâchez pour importer
          </p>
        )}

        {status === "loading" && (
          <p className="font-display text-lg font-semibold text-ink">
            Lecture en cours…
          </p>
        )}

        {status === "success" && (
          <>
            <p className="font-display text-lg font-semibold text-emerald-700">
              {jobCount} offre{jobCount > 1 ? "s" : ""} importée{jobCount > 1 ? "s" : ""}
            </p>
            <p className="mt-1 text-sm text-stone-500 font-mono truncate max-w-xs">
              {fileName}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              className="mt-4"
            >
              Charger un autre fichier
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <p className="font-display text-lg font-semibold text-red-600">
              Erreur de chargement
            </p>
            <p className="mt-1 text-sm text-red-500 font-body max-w-xs">{errorMsg}</p>
            <p className="mt-3 text-xs text-stone-400">Cliquez pour réessayer</p>
          </>
        )}
      </div>
    </div>
  );
}
