import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, delay, throwError, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { SimpleResponse, ComplexResponse, FoodPair, ErrorRes } from '../interfaces/wine-query.models';
import { searchStateOptions } from './configs/search-state-options'

export interface SearchState { placeholder: string; queryType: string; dropdownValue: string, url: string }

@Injectable({
  providedIn: 'root',
})
export class WineQueryService {
  private readonly SEARCH_STATE_OPTIONS = searchStateOptions;
  private querySearchState$: BehaviorSubject<SearchState> = new BehaviorSubject(
    this.SEARCH_STATE_OPTIONS['Dish to Wine']
  );
  private pairingResult$: Observable<any> = new Observable<any>();

  constructor(private http: HttpClient) {}

  updateSearchSate(queryType: 'Wine to Dish' | 'Dish to Wine'): void {
    this.querySearchState$.next(this.SEARCH_STATE_OPTIONS[queryType])
  }

  getSearchState(): Observable<SearchState> {
    return this.querySearchState$
  }

  getPairing(query: string) {
    const url = this.querySearchState$.getValue().url
    const params = url.includes('wine') ? { dish: query } : { wine: query }
    this.pairingResult$ = this.http.get<SimpleResponse | ComplexResponse | FoodPair | ErrorRes>(url, { params: params, withCredentials: true })
    return this.pairingResult$
  }

  getPairingResult() {
    return this.pairingResult$
  }
}
