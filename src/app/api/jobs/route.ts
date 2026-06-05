import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    // Lire tous les fichiers du dossier data
    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    let allJobs: any[] = [];

    for (const file of jsonFiles) {
      const filePath = path.join(dataDir, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const jobs = JSON.parse(fileContent);
      if (Array.isArray(jobs)) {
        allJobs.push(...jobs);
      }
    }

    // Optionnel : dédoublonner par URL
    const uniqueJobs = Array.from(new Map(allJobs.map(job => [job.url, job])).values());

    return NextResponse.json(uniqueJobs);
  } catch (error) {
    console.error('Erreur lecture des JSON:', error);
    return NextResponse.json({ error: 'Impossible de lire les offres' }, { status: 500 });
  }
}