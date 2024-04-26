import { Film, FilmDTO, FilmFull, FilmFullDTO } from '../interfaces/film.interface';

// Films array mapper
export function mapFilmData(dto: FilmDTO[]): Film[] {
  return dto.map(item => ({
    Title: item.Title || '',
    Year: item.Year || '',
    imdbID: item.imdbID || '',
    Poster: item.Poster || '',
  }));
}

// FilmFull mapper
export function mapFilmFullData(dto: FilmFullDTO): FilmFull {
  return {
    Title: dto.Title || '',
    Year: dto.Year || '',
    Rated: dto.Rated || '',
    Released: dto.Released || '',
    Director: dto.Director || '',
    Actors: dto.Actors || '',
    Plot: dto.Plot || '',
    Language: dto.Language || '',
    Awards: dto.Awards || '',
    Poster: dto.Poster || '',
    imdbRating: dto.imdbRating || '',
    imdbID: dto.imdbID || '',
  };
}