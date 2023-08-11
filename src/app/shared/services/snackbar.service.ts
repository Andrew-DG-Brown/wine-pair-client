import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SnackbarConfig { type: 'success' | 'error' | 'info', message: string }

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private currentSnackbar$: BehaviorSubject<null | SnackbarConfig> = new BehaviorSubject(null)

  constructor() { }

  getCurrentSnackbar() {
    return this.currentSnackbar$.asObservable()
  }

  updateSnackbar(type: 'success' | 'error' | 'info' | null, message: string) {
    const snackbarConfig: SnackbarConfig = { type, message }
    this.currentSnackbar$.next(snackbarConfig)
    setTimeout(() => {this.currentSnackbar$.next(null)}, 3000)
  }

  removeSnackbar() {
    this.currentSnackbar$.next(null)
  }
}
