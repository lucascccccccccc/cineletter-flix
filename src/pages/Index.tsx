
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Film, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPopularMovies, getUserProfile } from '@/lib/api';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [userRatings, setUserRatings] = useState<Record<number, number>>({});

  // Fetch popular movies
  const { data: movies, isLoading: isLoadingMovies, error: moviesError } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: getPopularMovies,
  });

  // Fetch user profile
  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  useEffect(() => {
    if (userProfile?.ratings) {
      const ratings: Record<number, number> = {};
      userProfile.ratings.forEach(rating => {
        ratings[rating.movieId] = rating.rating;
      });
      setUserRatings(ratings);
    }
  }, [userProfile]);

  const handleSearch = (query: string) => {
    toast({
      title: "Search initiated",
      description: `Searching for "${query}"`,
    });
    // In a real app, we would navigate to search results
    // For demo purposes, we'll just show a toast
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero section */}
      <section className="relative bg-cineletter-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-cineletter-900 to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-in">
              Track films you've watched.
              <br />
              <span className="text-cineaccent">Save those you want to see.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 animate-slide-up">
              CineLetter is the social network for film lovers. Keep a diary of what you watch, rate films, and create lists of films to share with friends.
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Popular movies section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-display">Popular Films</h2>
          <Link to="/films" className="flex items-center text-sm text-cineaccent hover:underline">
            View all <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        {isLoadingMovies && (
          <div className="py-12 text-center">
            <div className="film-loading mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading films...</p>
          </div>
        )}

        {moviesError && (
          <div className="py-12 text-center text-destructive">
            <p>Error loading movies. Please try again later.</p>
          </div>
        )}

        {movies && (
          <MovieGrid movies={movies} userRatings={userRatings} />
        )}
      </section>

      {/* CTA section */}
      <section className="py-12 bg-cineletter-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Film className="w-12 h-12 mx-auto mb-4 text-cineaccent" />
            <h2 className="text-2xl md:text-3xl font-display mb-4">Ready to start your film journey?</h2>
            <p className="mb-6 text-gray-300">
              Join CineLetter today to track your watched films, rate them, and connect with other cinema enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-cineaccent hover:bg-cineaccent-dark text-white">
                Sign Up
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
