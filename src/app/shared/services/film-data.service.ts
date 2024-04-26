import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  EMPTY,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Film, FilmFull, SearchResult } from '../interfaces/film.interface';
import { mapFilmData, mapFilmFullData } from '../mappers/Film.mapper';
const DEFAULT_TIME = 400;

@Injectable({
  providedIn: 'root',
})
export class FilmDataService {
  private readonly http = inject(HttpClient);

  // Return films based on the provided name
  filterFilm(name: string): Observable<Film[]> {
    const API = `https://www.omdbapi.com/?s=${name}&apikey=1c11289b`;
    return this.http.get(API).pipe(
      debounceTime(DEFAULT_TIME),
      distinctUntilChanged(),
      map((res: any) => mapFilmData(res.Search) || []),
      catchError(() => EMPTY)
    );
  }

  // Return detailed information about a film based on its ID
  getInfAboutFilm(id: string): Observable<FilmFull> {
    const API = `https://www.omdbapi.com/?i=${id}&apikey=1c11289b&plot=full`;
    return this.http.get<FilmFull>(API).pipe(
      debounceTime(DEFAULT_TIME),
      distinctUntilChanged(),
      map((res: any) => mapFilmFullData(res)),
      catchError(() => EMPTY)
    );
  }
}