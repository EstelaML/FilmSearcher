export interface FilmDTO {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResultDTO {
  Search: FilmDTO[];
  totalResults: string;
  Response: string;
}

export interface FilmFullDTO {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingDTO[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface RatingDTO {
  Source: string;
  Value: string;
}

export interface Film {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface SearchResult {
  Search: Film[];
}

export interface FilmFull {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
}