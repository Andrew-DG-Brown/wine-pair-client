import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private loadingState$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private navDropdownClosed$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private userDataState$: BehaviorSubject<any> = new BehaviorSubject(null);
  private pairingResultsState$: BehaviorSubject<any> = new BehaviorSubject(null);
  private queryHistory$: BehaviorSubject<string[] | null> = new BehaviorSubject(null);

  constructor() {
    if (localStorage.getItem('uId')) {
      this.updateLoggedIn(true)
      this.saveUserData(JSON.parse(localStorage.getItem('uId')))
    }
    if (localStorage.getItem('pairingResults')) {
      this.setPairingResults(JSON.parse(localStorage.getItem('pairingResults')))
      this.queryHistory$.next(
        JSON.parse(localStorage.getItem('recentQueries'))
      )
    }
  }

  // === Pairing Result state ===

  setPairingResults(results: any) {
    this.pairingResultsState$.next(results)
    if (results && 'dish' in results) this.updateQueryHistory(results.dish)
  }

  getPairingResultsState() {
    return this.pairingResultsState$.asObservable()
  }

  // === Loading state ===

  updateLoadingState(bool: boolean) {
    this.loadingState$.next(bool);
  }

  getLoadingState() {
    return this.loadingState$.asObservable();
  }

  // === Login state ===

  updateLoggedIn(loggingIn: boolean, userData?) {
    if (!loggingIn) {
      localStorage.removeItem('uId')
    } else if (userData) {
      localStorage.setItem('uId', JSON.stringify(userData));
      this.saveUserData(JSON.parse(localStorage.getItem('uId')))
      this.updateNavDropdownState(false)
    }
    this.loggedIn$.next(loggingIn);
  }

  getLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  // === User state ===

  saveUserData(userData) {
    this.userDataState$.next(userData)
  }

  updateProfile({ username, email }) {
    const newProfileState = {
      ...JSON.parse(localStorage.getItem('uId')), username: username, email: email 
    }
    localStorage.setItem('uId', JSON.stringify(newProfileState));
    this.saveUserData(JSON.parse(localStorage.getItem('uId')))
  }

  getUserData() {
    return this.userDataState$.asObservable()
  }

  // === Nav Dropdown state ===

  updateNavDropdownState(bool: boolean) {
    this.navDropdownClosed$.next(bool);
  }

  getNavDropdownState() {
    return this.navDropdownClosed$.asObservable();
  }

  toggleNavDropdownState() {
    this.updateNavDropdownState(!this.navDropdownClosed$.getValue())
  }

  // === Query history state ===

  updateQueryHistory(query: string) {
    let queries: Array<string>;
    if (localStorage.getItem('recentQueries')) {
      queries = JSON.parse(localStorage.getItem('recentQueries')).filter(Boolean)
      queries.unshift(query)
      if (queries.length === 4) queries.pop()
      queries = [...new Set(queries)]
    } else {
      queries = [query]
    }
    this.queryHistory$.next(queries)
    localStorage.setItem('recentQueries', JSON.stringify(queries))
  }

  getQueryHistory() {
    return this.queryHistory$.asObservable()
  }
}
