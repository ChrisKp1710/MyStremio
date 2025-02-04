import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: { id?: string } } // Corretto per Next.js
) {
  try {
    // Attendi che `params` sia definito
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: "ID non fornito" }, { status: 400 });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: Number(id) },
    });

    if (!movie) {
      return NextResponse.json({ error: "Film non trovato" }, { status: 404 });
    }

    // **1️⃣ Ottieni la descrizione originale da YouTube**
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    let youtubeDescription = "Nessuna descrizione disponibile";
    
    try {
      const youtubeRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${movie.trailerUrl}&key=${YOUTUBE_API_KEY}`
      );
      const youtubeData = await youtubeRes.json();
      youtubeDescription = youtubeData.items?.[0]?.snippet?.description || youtubeDescription;
    } catch (err) {
      console.warn("Errore nel recupero della descrizione YouTube", err);
    }

    // **2️⃣ Genera automaticamente la thumbnail da YouTube**
    let movieImage = `https://img.youtube.com/vi/${movie.trailerUrl}/hqdefault.jpg`;

    // **3️⃣ Prova a ottenere l'immagine da TMDB**
    try {
      const TMDB_API_KEY = process.env.TMDB_API_KEY;
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.title)}&api_key=${TMDB_API_KEY}`
      );
      const tmdbData = await tmdbRes.json();
      if (tmdbData.results?.length > 0) {
        movieImage = `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}`;
      }
    } catch (err) {
      console.warn("Errore nel recupero della locandina TMDB", err);
    }

    return NextResponse.json({ 
      id: movie.id, 
      title: movie.title, 
      description: movie.description, 
      youtubeDescription,
      image: movieImage, 
      trailerUrl: movie.trailerUrl 
    });

  } catch (error) {
    console.error("Errore nel recupero del film:", error);
    return NextResponse.json(
      { error: "Errore nel recupero del film" },
      { status: 500 }
    );
  }
}
