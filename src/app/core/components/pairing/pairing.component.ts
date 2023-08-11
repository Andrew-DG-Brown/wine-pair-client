import { Component } from '@angular/core';
import { catchError, delay, firstValueFrom, Observable, of, take } from 'rxjs';
import { SimpleResponse, ComplexResponse } from '../../interfaces/wine-query.models';
import { WineQueryService } from '../../services/wine-query.service';
import { CacheService } from '../../services/cache.service';
import { GlobalStateService } from '../../services/global-state.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pairing',
  templateUrl: './pairing.component.html',
  styleUrls: ['./pairing.component.css']
})
export class PairingComponent {
  pairing$!: Observable<SimpleResponse | ComplexResponse | any>;
  initialLoading$: Observable<boolean> = of(true).pipe(delay(700))

  constructor(
    private wineQuery: WineQueryService,
    private globalState: GlobalStateService,
    private scroller: ViewportScroller,
    private router: Router
  ) { 
  }
  
  ngOnInit() {
    this.globalState.updateLoadingState(false)
  }
  
  async getPair(query: string) {
    this.globalState.updateLoadingState(true)
    this.globalState.setPairingResults(null)
    // this.scroller.scrollToAnchor('search-results')
    document.getElementById("search-results").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
    // this.router.navigate([], { fragment: "search-results" });
    const pairingRes = await firstValueFrom(this.wineQuery.getPairing(query).pipe(
      catchError((err) => of(err)),
      take(1)
    ))
    this.globalState.updateLoadingState(false)
    this.globalState.setPairingResults(pairingRes)
    if (!pairingRes.error) {
      localStorage.setItem('pairingResults', JSON.stringify(pairingRes))
      return;
    }
  }
}
