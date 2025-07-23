"use client";
import React, { useState } from "react";
import { Play, Info } from "lucide-react";
import { Movie, Video } from "@/types/movie";
import { getImageUrl, tmdbApi } from "@/services/tmdbApi";
import Link from "next/link";

interface HeroProps {
  movie: Movie;
}

const Hero: React.FC<HeroProps> = ({ movie }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);

  const handleWatchTrailer = async () => {
    try {
      const data = await tmdbApi.getMovieVideos(movie.id.toString());
      const trailer = data.results.find(
        (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setVideoKey(trailer.key);
        setIsTrailerOpen(true);
      } else {
        alert("Trailer not available");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
      alert("Failed to load trailer");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden mt-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {movie.title}
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200 line-clamp-4">
            {movie.overview}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleWatchTrailer}
              className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Play className="h-6 w-6 fill-black" />
              Watch Trailer
            </button>

            <Link
              href={`/movie/${movie.id}`}
              className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700/80 transition-colors border border-gray-600"
            >
              <Info className="h-6 w-6" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {isTrailerOpen && videoKey && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
              loading="lazy"
            />
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full z-10"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
