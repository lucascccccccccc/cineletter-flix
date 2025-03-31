
import React from 'react';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import { cn } from '@/lib/utils';

interface MovieGridProps {
  movies: Movie[];
  userRatings?: Record<number, number>;
  className?: string;
  title?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  userRatings = {}, 
  className,
  title
}) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No movies found</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-display mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            userRating={userRatings[movie.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
