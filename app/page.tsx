"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  const [movies, setMovies] = useState<
    { id: number; title: string; image: string }[]
  >([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🎬 Catalogo Film</h1>

      {/* Barra di ricerca */}
      <motion.input
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        type="text"
        placeholder="🔍 Cerca un film..."
        className="w-full p-2 rounded mb-6 text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Grid dei film */}
      <div className="grid grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Link href={`/movie/${movie.id}`} className="block">
              <Image 
                src={movie.image} 
                alt={movie.title} 
                width={500} 
                height={300} 
                className="w-full h-40 object-cover rounded-lg shadow-lg" 
                unoptimized // Aggiunto per evitare problemi di ottimizzazione Next.js con immagini remote
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
