
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile, getPopularMovies } from '@/lib/api';
import { Film, Clock, Star, ListChecks, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  // Fetch user profile
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  // Fetch movies (in a real app, we would fetch just the user's movies)
  const { data: allMovies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: getPopularMovies,
  });

  // Filter movies based on the user's watched/watchlist
  const watchedMovies = allMovies?.filter(movie => 
    userProfile?.watchedMovies.includes(movie.id)
  ) || [];

  const watchlistMovies = allMovies?.filter(movie => 
    userProfile?.watchlist.includes(movie.id)
  ) || [];

  // Create a map of user ratings
  const userRatings = userProfile?.ratings.reduce((acc, rating) => {
    acc[rating.movieId] = rating.rating;
    return acc;
  }, {} as Record<number, number>) || {};

  if (isLoadingProfile || isLoadingMovies) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="film-loading mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-destructive mb-4">Error loading profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage src={userProfile.avatar} alt={userProfile.username} />
            <AvatarFallback className="bg-cineletter-400 text-xl">
              {userProfile.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
              {userProfile.username}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 my-3">
              <div className="flex items-center text-sm text-gray-300">
                <Film className="mr-1 h-4 w-4" />
                <span>{userProfile.watchedMovies.length} films</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <ListChecks className="mr-1 h-4 w-4" />
                <span>{userProfile.watchlist.length} watchlist</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Users className="mr-1 h-4 w-4" />
                <span>{userProfile.followers} followers</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Users className="mr-1 h-4 w-4" />
                <span>{userProfile.following} following</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="watched" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="watched" className="data-[state=active]:bg-cineaccent">
              Watched
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-cineaccent">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="data-[state=active]:bg-cineaccent">
              Watchlist
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="watched">
            <MovieGrid 
              movies={watchedMovies} 
              userRatings={userRatings}
              title="Films You've Watched"
            />
          </TabsContent>
          
          <TabsContent value="reviews">
            {userProfile.ratings.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-display mb-4">Your Reviews</h2>
                {userProfile.ratings.map(rating => {
                  const movie = allMovies?.find(m => m.id === rating.movieId);
                  if (!movie) return null;
                  
                  return (
                    <div key={rating.movieId} className="bg-card rounded-lg p-4">
                      <div className="flex gap-4">
                        <img 
                          src={movie.posterPath} 
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{movie.title}</h3>
                          <div className="flex items-center my-1">
                            <Star className="h-4 w-4 text-cineaccent mr-1" />
                            <span>{rating.rating}</span>
                            <span className="mx-2">•</span>
                            <span className="text-sm text-gray-400">{rating.date}</span>
                          </div>
                          {rating.review && (
                            <p className="text-sm text-gray-300 mt-2">{rating.review}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No reviews yet</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="watchlist">
            <MovieGrid 
              movies={watchlistMovies} 
              title="Your Watchlist"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
