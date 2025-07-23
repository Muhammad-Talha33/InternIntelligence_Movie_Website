import React from 'react';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  title?: string;
}

const MovieGrid: React.FC<Props> = ({ movies, title }) => {
  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-white text-2xl font-bold border-l-4 border-blue-500 pl-4">
          {title}
        </h2>
      )}

      {/*  Desktop/Grid layout: Only shown on sm and up */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Mobile/Scroll layout: Only on xs/screen */}
      <div className="sm:hidden overflow-x-auto">
        <div className="flex gap-4 px-1">
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-[250px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieGrid;
