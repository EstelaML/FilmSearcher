import { Injectable } from '@angular/core';
import { EMPTY, of, Observable } from 'rxjs';
import { Film } from '../../interfaces/film.interface';
import { films } from '../../mock_data/film-data';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search$(film: string): Observable<Film> {
    const found = films.Search.find((item: Film) => item.Title === film);
    return found ? of(found) : EMPTY
  }

}