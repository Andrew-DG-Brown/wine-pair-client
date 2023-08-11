import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GlobalStateService } from '../../services/global-state.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(
    private router: Router,
    private globalState: GlobalStateService,
    private auth: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if ((!this.getDropdownSate() 
          && event instanceof NavigationStart
        ) || window.innerWidth < 768 || this.auth.isLoggedIn()
      ) {
        this.globalState.updateNavDropdownState(false)
      }
    });
  }

  async getDropdownSate() {
    return await firstValueFrom(this.globalState.getNavDropdownState().pipe(take(1)))
  }
}
