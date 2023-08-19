import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SnackbarConfig { type: 'success' | 'error' | 'info' | null, message: string }

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private currentSnackbar$: BehaviorSubject<null | SnackbarConfig> = new BehaviorSubject(null)

  constructor() { }

  getCurrentSnackbar() {
    return this.currentSnackbar$.asObservable()
  }

  updateSnackbar(config: SnackbarConfig) {
    this.currentSnackbar$.next(config)
    setTimeout(() => this.removeSnackbar(), 3000)
  }

  removeSnackbar() {
    this.currentSnackbar$.next(null)
  }
}
