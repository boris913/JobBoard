import fs from "fs";
import path from "path";

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location?: string;
  source?: string;
  date?: string;
  url?: string;
  description?: string;
  remote?: boolean;
}

export function loadOffers(): JobOffer[] {
  const dataDir = path.join(process.cwd(), "data");

  if (!fs.existsSync(dataDir)) {
    console.warn("Dossier data introuvable à la racine du projet");
    return [];
  }

  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  const offers: JobOffer[] = [];

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);

    // Gère plusieurs formats : tableau d'objets ou objet unique
    const items = Array.isArray(data) ? data : [data];

    for (const item of items) {
      offers.push({
        id: item.id || item.slug || `${file}-${offers.length}`,
        title: item.title || item.titre || item.jobTitle || item.name || "Offre sans titre",
        company: item.company || item.entreprise || item.societe || item.organization || item.employer || "Entreprise non précisée",
        location: item.location || item.lieu || item.city || item.address || item.localisation,
        source: item.source || item.origin || item.platform || item.site || file.replace(".json", ""),
        date: item.date || item.publishedAt || item.publicationDate || item.createdAt || item.scrapedAt,
        url: item.url || item.link || item.applyUrl || item.sourceUrl,
        description: item.description || item.desc || item.summary || item.content,
        remote: item.remote || item.teletravail || item.isRemote || false,
      });
    }
  }

  // Supprime les doublons par URL ou titre+entreprise
  const seen = new Set<string>();
  return offers.filter((o) => {
    const key = o.url || `${o.title}-${o.company}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}