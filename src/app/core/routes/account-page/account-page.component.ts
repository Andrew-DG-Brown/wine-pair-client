import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { accountRoutes } from './account-route.config';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  routesConfig = accountRoutes;
  subRoute: string;

  constructor(private router: Router) {
    this.router.events
  }

  ngOnInit() {
    this.subRoute = this.router.url.replace('/account/', '')
  }

  selectNavigate(target) {
    this.router.navigate([`/account/${target.value}`])
  }

  updateSubRoute() {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.subRoute = res.url.replace('/account/', '')
      }
    })
  }
}
