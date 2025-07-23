import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Movie } from '@/types/movie';
import { getImageUrl, formatDate } from '@/services/tmdbApi';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const hasRating = typeof movie.vote_average === 'number';

  return (
    <Link 
      href={`/movie/${movie.id}`} 
      className="group block bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {hasRating && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 md:line-clamp-2 line-clamp-1  group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(movie.release_date)}</span>
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
