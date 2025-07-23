"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Star, Calendar, Clock, Play, Clapperboard } from "lucide-react";
import { MovieDetails, Credits, Video } from "@/types/movie";
import {
  tmdbApi,
  getImageUrl,
  formatDate,
  formatRuntime,
} from "@/services/tmdbApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import Link from "next/link";
import { useParams } from "next/navigation";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [watchProviders, setWatchProviders] = useState<{ link?: string } | null>(null);


  const handleWatchTrailer = async () => {
    try {
      const data = await tmdbApi.getMovieVideos(id as string);
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

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [movieData, creditsData] = await Promise.all([
          tmdbApi.getMovieDetails(id),
          tmdbApi.getMovieCredits(id),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }

      const [movieData, creditsData, providersData] = await Promise.all([
        tmdbApi.getMovieDetails(id),
        tmdbApi.getMovieCredits(id),
        tmdbApi.getWatchProviders(id),
      ]);

      setMovie(movieData);
      setCredits(creditsData);
      setWatchProviders(
        providersData.results?.PK || providersData.results?.US || null
      );
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">
            {error || "Movie not found"}
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const director = credits?.crew.find((person) => person.job === "Director");
  const mainCast = credits?.cast.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 h-screen">
          <img
            src={getImageUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Movies
          </Link>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <img
                src={getImageUrl(movie.poster_path, "w500")}
                alt={movie.title}
                className="w-full max-w-md rounded-xl shadow-2xl mx-auto lg:mx-0"
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-2 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-6">
                  &quot;{movie.tagline}&quot;
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg font-semibold">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                  <span className="text-gray-400">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-400" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-gray-700"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-8 text-gray-200">
                {movie.overview}
              </p>

              <div className="md:flex items-center gap-4 mt-6">
                <button
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors"
                  onClick={handleWatchTrailer}
                >
                  <Play className="h-6 w-6 fill-white" />
                  Watch Trailer
                </button>

                {watchProviders?.link && (
                  <Link
                    href={watchProviders.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg w-56 md:w-auto mt-2 transition-colors"
                  >
                    <Clapperboard className="w-6 h-6" />
                    Watch Now
                  </Link>
                )}
              </div>

              {director && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-2">Director</h3>
                  <p className="text-gray-300">{director.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {mainCast.length > 0 && (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
            Cast
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mainCast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={getImageUrl(actor.profile_path || "", "w185")}
                  alt={actor.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h4 className="text-white font-semibold text-sm mb-1">
                  {actor.name}
                </h4>
                <p className="text-gray-400 text-xs">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default MovieDetail;
