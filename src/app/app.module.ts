import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PairingComponent } from './core/components/pairing/pairing.component';
import { PairingSearchComponent } from './core/components/pairing/pairing-search/pairing-search.component';
import { QueryResultComponent } from './core/components/pairing/query-result/query-result.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { LoginPageComponent } from './core/routes/login-page/login-page.component';
import { RegisteredPageComponent } from './core/routes/registered-page/registered-page.component';
import { HomePageComponent } from './core/routes/home-page/home-page.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { AccountPageComponent } from './core/routes/account-page/account-page.component';
import { ProfileComponent } from './core/routes/account-page/profile/profile.component';
import { SavedPairingsComponent } from './core/routes/account-page/saved-pairings/saved-pairings.component';
import { WineCardComponent } from './shared/components/wine-card/wine-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PairingComponent,
    PairingSearchComponent,
    QueryResultComponent,
    ButtonComponent,
    NavBarComponent,
    LoginPageComponent,
    RegisteredPageComponent,
    HomePageComponent,
    SpinnerComponent,
    SnackbarComponent,
    AccountPageComponent,
    ProfileComponent,
    SavedPairingsComponent,
    WineCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
