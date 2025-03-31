
export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  director: string;
  runtime: number;
  genres: string[];
}

export interface UserRating {
  movieId: number;
  rating: number;
  review?: string;
  date: string;
}

export interface User {
  id: number;
  username: string;
  avatar: string;
  watchedMovies: number[];
  ratings: UserRating[];
  watchlist: number[];
  followers: number;
  following: number;
}
