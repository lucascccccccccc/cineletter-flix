
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Movie } from '@/types/movie';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  userRating?: number;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, userRating, className }) => {
  return (
    <Link to={`/movie/${movie.id}`} className={cn("block movie-card rounded-lg overflow-hidden bg-card transition-all", className)}>
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={movie.posterPath} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {userRating && (
          <div className="absolute top-2 right-2 bg-cineaccent rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold text-sm">
            {userRating}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-1 mb-1">{movie.title}</h3>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <Star className="w-3 h-3 mr-1 text-cineaccent" />
            <span>{movie.voteAverage.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{movie.releaseDate.substring(0, 4)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
