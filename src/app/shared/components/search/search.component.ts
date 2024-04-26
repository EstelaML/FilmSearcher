import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap
} from 'rxjs';

import { Film, FilmFull } from '../../interfaces/film.interface';
import { FilmDataService } from '../../services/film-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm$ = new Subject<string>();
  films$!: Observable<Film[]>;
  private filterSvc = inject(FilmDataService);
  showDetailsArray: boolean[] = [];
  selectedFilm: FilmFull | null = null;

  constructor() {
    // Subscribe to the searchTerm$ observable and map it to the films$ observable
    this.films$ = this.searchTerm$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterSvc.filterFilm(term))
    );

    // Subscribe to the films$ observable to initialize the showDetailsArray
    this.films$.subscribe(films => {
      this.showDetailsArray = new Array(films?.length).fill(false);
    });
  }

  // Toggle details for a film by changing the value in the showDetailsArray
  toggleDetails(index: number, imdbID: string) {
    // Set all values in showDetailsArray to false except for the selected index
    this.showDetailsArray = this.showDetailsArray.map((value, idx) => idx === index ? value : false);
    
    // Toggle the value for the selected index
    this.showDetailsArray[index] = !this.showDetailsArray[index];

    // If details are shown, fetch information about the selected film
    if (this.showDetailsArray[index]) {
      this.filterSvc.getInfAboutFilm(imdbID).subscribe(filmFull => {
        this.selectedFilm = filmFull;
      });
    } else {
      this.selectedFilm = null;
    }
  }

  // Handle search input changes
  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTerm$.next(element.value);
  }

  // Clear the films$ observable by emitting an empty array
  clearSearch(): void { 
    this.films$ = of([]);
  }
}