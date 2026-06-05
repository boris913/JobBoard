import { NextResponse } from 'next/server';
import { loadOffers } from '@/lib/offers';
import { Job } from '@/types/job';

export async function GET() {
  try {
    const rawOffers = loadOffers();

    // Mapping pour correspondre exactement au type Job attendu par ton front
    const jobs: Job[] = rawOffers.map((offer) => ({
      title: offer.title,
      company: offer.company,
      location: offer.location || "Non précisée",
      date_posted: offer.date || "",
      url: offer.url || "",
      source: offer.source || "Inconnue",
      description_snippet: offer.description || "",
    }));

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Erreur lecture des offres via API:', error);
    return NextResponse.json({ error: 'Impossible de lire les offres' }, { status: 500 });
  }
}