"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import YouTube from "react-youtube";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<{ title: string; description: string; youtubeDescription: string; image: string; trailerUrl: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-white text-center text-2xl mt-10">🎬 Caricamento...</div>;
  if (!movie) return <div className="text-red-500 text-center text-2xl mt-10">❌ Film non trovato</div>;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
      {/* Sfondo sfocato */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <Image src={movie.image} alt={movie.title} layout="fill" objectFit="cover" className="blur-lg" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full bg-black/80 backdrop-blur-lg rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start"
      >
        {/* Colonna sinistra: Titolo e trailer */}
        <div className="md:w-2/3">
          <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg">{movie.title}</h1>

          {/* Trailer YouTube adattabile */}
          <div className="my-6 aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <YouTube videoId={movie.trailerUrl} className="w-full h-full" />
          </div>
        </div>

        {/* Colonna destra: Descrizione */}
        <div className="md:w-1/3 px-6">
          <h2 className="text-2xl font-semibold mb-4">📖 Descrizione</h2>
          <p className="text-gray-300">{movie.youtubeDescription}</p>
        </div>

        {/* Pulsante di ritorno */}
        <div className="mt-6 text-center w-full">
          <Link href="/" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-all">
            ⬅ Torna al Catalogo
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
