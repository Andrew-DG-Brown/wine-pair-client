import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  private readonly API_URL = `${environment.api.url}/account`

  constructor(private http: HttpClient) { }

  getSavedPairings(uId: number) {
    return this.http.get(`${this.API_URL}/saved-pairings`, { params: { uId: uId }, withCredentials: true })
    .pipe(catchError((err) => of(err)))
  }

  savePairing(uId: number, pairing: object) {
    return this.http.post(`${this.API_URL}/saved-pairings`, { pairing: pairing, uId: uId }, { withCredentials: true })
    .pipe(catchError((err) => of(err)))
  }

  deletePairing(uId: number, { wine, dish }) {
    return this.http.delete(`${this.API_URL}/saved-pairings`, { params: { wine: wine, dish: dish, uId: uId }, withCredentials: true })
    .pipe(catchError((err) => of(err)))
  }

  updateProfile({ username, email, uId }) {
    return this.http.put(`${this.API_URL}/profile`, { username: username, email: email, uId: uId }, { withCredentials: true })
    .pipe(catchError((err) => of(err)))
  }
}
