 "use client";
import React, { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdbApi';
import Hero from './Hero';
import MovieGrid from './MovieGrid';
import LoadingSpinner from './LoadingSpinner';
import FilterBar from './FilterBar';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ genre: '', year: '' });
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trending, nowPlaying, popular, upcoming] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getNowPlaying(),
          tmdbApi.getPopular(),
          tmdbApi.getUpcoming(),
        ]);

        setTrendingMovies(trending.results.slice(0, 10));
        setNowPlayingMovies(nowPlaying.results.slice(0, 10));
        setPopularMovies(popular.results.slice(0, 10));
        setUpcomingMovies(upcoming.results.slice(0, 10));
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      if (!filters.genre && !filters.year) return;

      try {
        const params: Record<string, string> = {};
        if (filters.genre) params.with_genres = filters.genre;
        if (filters.year) params.primary_release_year = filters.year;

        const result = await tmdbApi.discoverMovies(params);
        setFilteredMovies(result.results);
      } catch (error) {
        console.error('Filter fetch error:', error);
      }
    };

    fetchFilteredMovies();
  }, [filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const heroMovie = trendingMovies[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      {heroMovie && <Hero movie={heroMovie} />}

      {/* Filter Bar */}
      <div className="container mx-auto px-6 pt-12">
        <FilterBar onChange={setFilters} />
      </div>

      {/* Filtered Results */}
      {(filters.genre || filters.year) && (
        <div className="container mx-auto px-6 py-4">
          <MovieGrid movies={filteredMovies} title="Filtered Results" />
        </div>
      )}

      {/* Other Sections */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        <MovieGrid movies={trendingMovies.slice(1)} title="Trending Now" />
        <MovieGrid movies={nowPlayingMovies} title="Now Playing" />
        <MovieGrid movies={popularMovies} title="Popular Movies" />
        <MovieGrid movies={upcomingMovies} title="Coming Soon" />
      </div>
    </div>
  );
};

export default HomePage;