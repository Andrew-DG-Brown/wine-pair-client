import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PairingComponent } from './core/components/pairing/pairing.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './core/routes/login-page/login-page.component';
import { RegisteredPageComponent } from './core/routes/registered-page/registered-page.component';
import { HomePageComponent } from './core/routes/home-page/home-page.component';
import { AccountPageComponent } from './core/routes/account-page/account-page.component';
import { ProfileComponent } from './core/routes/account-page/profile/profile.component';
import { SavedPairingsComponent } from './core/routes/account-page/saved-pairings/saved-pairings.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: PairingComponent
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: LoginPageComponent
      },
      {
        path: 'register-success',
        canActivate: [AuthGuard],
        component: RegisteredPageComponent
      },
      {
        path: 'account',
        redirectTo: 'account/profile',
        pathMatch: 'full',
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        component: AccountPageComponent,
        children: [
          {
            path: 'profile',
            canActivate: [AuthGuard],
            component: ProfileComponent
          },
          {
            path: 'saved-pairings',
            canActivate: [AuthGuard],
            component: SavedPairingsComponent
          }
        ]
      
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
