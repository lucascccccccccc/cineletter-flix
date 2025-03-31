
import { Movie, User, UserRating } from '@/types/movie';

// Mock data - in a real app, this would come from an API
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Pulp Fiction",
    posterPath: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    backdropPath: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseDate: "1994-10-14",
    voteAverage: 8.9,
    director: "Quentin Tarantino",
    runtime: 154,
    genres: ["Crime", "Drama"]
  },
  {
    id: 2,
    title: "The Godfather",
    posterPath: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    backdropPath: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseDate: "1972-03-24",
    voteAverage: 9.2,
    director: "Francis Ford Coppola",
    runtime: 175,
    genres: ["Crime", "Drama"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    posterPath: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    backdropPath: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    overview: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "2008-07-18",
    voteAverage: 9.0,
    director: "Christopher Nolan",
    runtime: 152,
    genres: ["Action", "Crime", "Drama"]
  },
  {
    id: 4,
    title: "Parasite",
    posterPath: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    backdropPath: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    releaseDate: "2019-05-30",
    voteAverage: 8.6,
    director: "Bong Joon Ho",
    runtime: 132,
    genres: ["Comedy", "Drama", "Thriller"]
  },
  {
    id: 5,
    title: "Eternal Sunshine of the Spotless Mind",
    posterPath: "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_.jpg",
    backdropPath: "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_.jpg",
    overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    releaseDate: "2004-03-19",
    voteAverage: 8.3,
    director: "Michel Gondry",
    runtime: 108,
    genres: ["Drama", "Romance", "Sci-Fi"]
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    posterPath: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    backdropPath: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseDate: "1994-09-23",
    voteAverage: 9.3,
    director: "Frank Darabont",
    runtime: 142,
    genres: ["Drama"]
  }
];

// Mock user data
const mockUser: User = {
  id: 1,
  username: "filmfan42",
  avatar: "https://i.pravatar.cc/150?img=32",
  watchedMovies: [1, 2, 4],
  ratings: [
    { movieId: 1, rating: 4.5, review: "A masterpiece of storytelling!", date: "2023-08-15" },
    { movieId: 2, rating: 5, review: "An offer you can't refuse.", date: "2023-07-22" },
    { movieId: 4, rating: 4, review: "Brilliant social commentary.", date: "2023-09-05" }
  ],
  watchlist: [3, 5, 6],
  followers: 125,
  following: 98
};

// API functions
export const getPopularMovies = (): Promise<Movie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMovies);
    }, 500);
  });
};

export const getMovie = (id: number): Promise<Movie | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMovies.find(movie => movie.id === id));
    }, 300);
  });
};

export const getUserProfile = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 300);
  });
};

export const getUserRating = (movieId: number): Promise<UserRating | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser.ratings.find(rating => rating.movieId === movieId));
    }, 200);
  });
};

export const searchMovies = (query: string): Promise<Movie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

// In a real app, these would be POST requests
export const addToWatchlist = (movieId: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update the database
      console.log(`Added movie ${movieId} to watchlist`);
      resolve();
    }, 200);
  });
};

export const rateMovie = (movieId: number, rating: number, review?: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update the database
      console.log(`Rated movie ${movieId} with ${rating} stars`);
      if (review) {
        console.log(`Review: ${review}`);
      }
      resolve();
    }, 200);
  });
};
