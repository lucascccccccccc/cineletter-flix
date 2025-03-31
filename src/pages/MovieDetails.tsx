
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, Calendar, Star, Plus, Check, ChevronLeft } from 'lucide-react';
import { getMovie, getUserRating, addToWatchlist, rateMovie } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '0', 10);
  const { toast } = useToast();
  const [userRating, setUserRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch movie details
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovie(movieId),
    enabled: !!movieId,
  });

  // Fetch user's rating for this movie
  const { data: ratingData } = useQuery({
    queryKey: ['userRating', movieId],
    queryFn: () => getUserRating(movieId),
    enabled: !!movieId,
  });

  // Use useEffect instead of onSuccess for setting rating data
  useEffect(() => {
    if (ratingData) {
      setUserRating(ratingData.rating);
      if (ratingData.review) setReview(ratingData.review);
    }
  }, [ratingData]);

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleAddToWatchlist = async () => {
    setIsSubmitting(true);
    try {
      await addToWatchlist(movieId);
      setInWatchlist(true);
      toast({
        title: "Added to watchlist",
        description: `${movie?.title} has been added to your watchlist.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add to watchlist. Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitRating = async () => {
    if (!userRating) return;
    
    setIsSubmitting(true);
    try {
      await rateMovie(movieId, userRating, review);
      toast({
        title: "Rating submitted",
        description: `You rated ${movie?.title} ${userRating} stars.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit rating. Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="film-loading mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-destructive mb-4">Error loading movie details.</p>
          <Link to="/">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Movie hero section with backdrop */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <img 
            src={movie.backdropPath} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 px-4 py-8 md:py-12">
          <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-4">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{movie.releaseDate.substring(0, 4)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-cineaccent" />
                <span>{movie.voteAverage.toFixed(1)}</span>
              </div>
              <div>
                {movie.genres.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster and action buttons */}
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-lg mb-4">
              <img 
                src={movie.posterPath} 
                alt={movie.title} 
                className="w-full h-auto"
              />
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full"
                disabled={isSubmitting}
                onClick={handleAddToWatchlist}
              >
                {inWatchlist ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Watchlist
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Details and rating section */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300 mb-6">{movie.overview}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Director</h2>
              <p className="text-gray-300">{movie.director}</p>
            </div>
            
            <Separator className="my-6" />
            
            {/* Rating section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Rate this film</h2>
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    className={`rating-star p-2 rounded-full ${
                      userRating && userRating >= rating 
                        ? 'text-cineaccent' 
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                    onClick={() => handleRatingClick(rating)}
                  >
                    <Star className="h-6 w-6" />
                  </button>
                ))}
              </div>
              
              <Textarea
                placeholder="Write a review (optional)"
                className="mb-4 bg-secondary/70 border-secondary-foreground/20"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              
              <Button 
                onClick={handleSubmitRating}
                disabled={!userRating || isSubmitting}
              >
                Submit Rating
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
