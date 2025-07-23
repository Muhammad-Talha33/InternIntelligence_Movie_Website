"use client";
import React, { useState, useCallback } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Movie } from '../../types/movie';
import { tmdbApi } from '../../services/tmdbApi';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovies = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await tmdbApi.searchMovies(searchQuery);
      setMovies(response.results || []);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(query);
  };

  const clearSearch = () => {
    setQuery('');
    setMovies([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 lg:mt-6">
      <div className="container mx-auto px-6 py-12">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Movies
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Search through thousands of movies to find your next favorite film
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full pl-12 pr-16 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search Movies'}
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="max-w-7xl mx-auto">
          {loading && <LoadingSpinner />}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-400 text-xl mb-4">{error}</p>
              <button
                onClick={() => searchMovies(query)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {hasSearched && !loading && !error && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {movies.length > 0 
                    ? `Found ${movies.length} results for "${query}"`
                    : `No results found for "${query}"`
                  }
                </h2>
              </div>

              {movies.length > 0 && <MovieGrid movies={movies} />}

              {movies.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">
                    Try searching with different keywords
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'].map((genre) => (
                      <button
                        key={genre}
                        onClick={() => {
                          setQuery(genre);
                          searchMovies(genre);
                        }}
                        className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 px-4 py-2 rounded-full text-sm transition-colors"
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!hasSearched && !loading && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <SearchIcon className="h-24 w-24 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Start Your Search
                </h3>
                <p className="text-gray-400">
                  Enter a movie title, actor name, or keyword to discover amazing films
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
