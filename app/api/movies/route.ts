import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const movies = await prisma.movie.findMany();

    // Sostituisci tutte le immagini statiche con quelle di YouTube
    const moviesWithImages = movies.map((movie) => ({
      ...movie,
      image: `https://img.youtube.com/vi/${movie.trailerUrl}/hqdefault.jpg`,
    }));

    return NextResponse.json(moviesWithImages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Errore nel recupero dei film" }, { status: 500 });
  }
}
