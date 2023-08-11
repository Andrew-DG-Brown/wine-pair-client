import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalStateService } from 'src/app/core/services/global-state.service';
import { navConfig } from './nav-bar.config';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  host: {'(document:click)': 'clickOutside($event)'}
})
export class NavBarComponent implements OnInit {
  screenWidth: number;
  navConfig = navConfig;
  loggedIn$: Observable<boolean>;
  dropdownClosed$: Observable<boolean>;
  userState$: Observable<any>;
  loggedInVal: boolean

  constructor(
    private globalState: GlobalStateService,
    private auth: AuthService,
    private router: Router,
    private elRef: ElementRef
  ) {
    this.userState$ = this.globalState.getUserData()
  }

  async ngOnInit() {
    this.loggedIn$ = this.globalState.getLoggedIn()
    this.setNewLoggedInVal()
    if (window.innerWidth > 768 && !this.loggedInVal) this.globalState.updateNavDropdownState(true)
    this.dropdownClosed$ = this.globalState.getNavDropdownState()
  }

  async clickOutside(event) {
    this.loggedIn$.pipe(tap(loggedIn => {
      if (!this.elRef.nativeElement.contains(event.target) 
        && ((!loggedIn && window.innerWidth < 768) || loggedIn)
      ) {
        this.globalState.updateNavDropdownState(false)
      }
    })).subscribe().unsubscribe()
  }

  toggleDropdown() {
    this.globalState.toggleNavDropdownState()
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.loggedIn$.pipe(tap(loggedIn => {
      this.globalState.updateNavDropdownState(!loggedIn && window.innerWidth > 768)
    })).subscribe().unsubscribe()
  }

  async setNewLoggedInVal() {
    this.loggedInVal = await firstValueFrom(this.loggedIn$.pipe(take(1))) 
  }

  async logOut() {
    const logOutRes = await firstValueFrom(this.auth.logoutUser().pipe(take(1)))
    this.globalState.updateLoggedIn(false)
    this.setNewLoggedInVal()
    if ('success' in logOutRes) {
      this.globalState.updateLoggedIn(false)
      if (window.innerWidth < 768) {
        this.globalState.updateNavDropdownState(false)
      }
      this.router.navigate(['/'])
    }
  }
}
