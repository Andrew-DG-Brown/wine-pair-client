import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { UserData } from '../interfaces/user-data.models';
import { of, Observable, map, catchError, tap } from 'rxjs';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.api.url

  constructor(
    private http: HttpClient,
    private snackbar: SnackbarService
  ) { }

  handleFormSubmit(formType: 'login' | 'register', userData: UserData) {
    return this.http.post<UserData | { error: string }>(`${this.API_URL}/auth/${formType}`, userData, { withCredentials: true }).pipe(catchError((err) => of(err)))
  }

  logoutUser() {
    return this.http.get(`${this.API_URL}/auth/logout`, { withCredentials: true })
    .pipe(
      map((_) => {
        this.snackbar.updateSnackbar({ type: 'success', message: "Log out successful"})
        return _
      }),
      catchError((err) => {
        this.snackbar.updateSnackbar({ type: 'error', message: "Couldn't log you out"})
        return of(err)
      })
    )
  }

  isLoggedIn(): boolean {
    return Boolean(localStorage.getItem('uId'))
  }

  asyncEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return this.http.post(`${this.API_URL}/auth/email-validate`, { email: control.value})
        .pipe(
          map((res) =>
            'valid' in res ? { emailAlreadyExists: true } : null
          )
        );
    };
  }

  asyncEmailRegistered(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return this.http.post(`${this.API_URL}/auth/email-validate`, { email: control.value})
        .pipe(
          map((res) =>
            'valid' in res ? null : { emailAlreadyExists: true }
          )
        );
    };
  }
}
