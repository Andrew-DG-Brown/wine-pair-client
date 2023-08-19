import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, Observable, take } from 'rxjs';
import { AccountDataService } from 'src/app/core/services/account-data.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalStateService } from 'src/app/core/services/global-state.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  form: FormGroup;
  userState$: Observable<any>;
  userData;

  constructor(
    private globalState: GlobalStateService,
    private formBuilder: FormBuilder,
    private accountService: AccountDataService,
    private snackbar: SnackbarService,
    private auth: AuthService
  ) { }

  async ngOnInit() {
    this.userData = await firstValueFrom(this.globalState.getUserData().pipe(take(1)))
    this.userState$ = this.globalState.getUserData()
    this.buildForm()
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: [this.userData.username || '', [Validators.required, Validators.minLength(5)], [this.auth.asyncEmailValidator()]] , 
      email: [this.userData.email, [Validators.required, Validators.email]]
    }, { updateOn: 'blur' })
  }

  async submit() {
    if (this.form.valid) {
      const updateRes = await firstValueFrom(this.accountService.updateProfile({
          ...this.form.getRawValue(), uId: this.userData.uId
        }).pipe(take(1))
      )
      this.globalState.updateProfile(updateRes)
  
      if ('error' in updateRes) {
        this.snackbar.updateSnackbar({ type: 'error', message: 'Could not update profile'})
      } else {
        this.snackbar.updateSnackbar({ type: 'success', message: 'Profile updated' })
      }
    }
  }
}
