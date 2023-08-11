import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, firstValueFrom, Observable, of, take, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalStateService } from 'src/app/core/services/global-state.service';
import { AbstractControlOptions } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  route: 'login' | 'register';
  passwordMsg = 'Password must contain: 8 characters, 1 upper and 1 lowercase, 1 number, and 1 special character'
  notLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private globalState: GlobalStateService,
    private auth: AuthService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.notLoading$ = this.globalState.getLoadingState().pipe(
      delay(700), map(() => true),
      startWith(false)
    )
    this.route = this.router.url.replace('/', '') as 'login' | 'register'
    this.buildForm()
  }

  buildForm() {
    //Min. 8 chars, min. 1 uppercase letter, 1 lowercase letter, 1 number, 1 special char
    const validPassRegex = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"
    const config: AbstractControlOptions = { updateOn: 'blur' }
    this.form = this.route == 'register' ? (
        this.formBuilder.group({
          email: ['', [Validators.required, Validators.email], [this.auth.asyncEmailValidator()]] , 
          password: ['', [Validators.required, Validators.pattern(validPassRegex)]]
        }, config)
      ) : (
        this.formBuilder.group({
          email: ['', [Validators.required, Validators.email], [this.auth.asyncEmailRegistered()]], 
          password: ['']
        }, config)
      )
  }

  async submit() {
    if (this.form.valid) {
      const submitResponse = await firstValueFrom(
        this.auth.handleFormSubmit(this.route, this.form.getRawValue()).pipe(take(1))
      )
      if ('error' in submitResponse) {
        this.form.get('password').setErrors({'required': true});
      } else if ('uId' in submitResponse) {
        this.globalState.updateLoggedIn(true, submitResponse)
        this.snackbar.updateSnackbar('success', 'You are now logged in!')
        this.router.navigate([this.route === 'login' ? '/' : '/register-success'])
      }
    }
  }
}
