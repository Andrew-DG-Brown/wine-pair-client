import { Component, OnInit } from '@angular/core';
import { delay, Observable, tap, map, shareReplay, Subscription } from 'rxjs';
import { AccountDataService } from 'src/app/core/services/account-data.service';
import { CacheService } from 'src/app/core/services/cache.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-saved-pairings',
  templateUrl: './saved-pairings.component.html',
  styleUrls: ['./saved-pairings.component.css']
})
export class SavedPairingsComponent implements OnInit{
  savedPairings$: Observable<any>
  savedPairingsSubscription: Subscription
  uId: number;
  filterValue: string = '';
  filterByWineValue: string = 'All';
  filterByWineDropdownValues: Array<string>

  constructor(
    private accountData: AccountDataService,
    private snackbar: SnackbarService,
    private cache: CacheService
  ) {
  }

  ngOnInit(): void {
    this.uId = Number(this.cache.getLocalData('uId', 'uId'))
    this.savedPairings$ = this.accountData.getSavedPairings(Number(this.uId)).pipe(
      map((wines) => wines.reverse()),
      delay(700),
      tap((res) => console.log('saved data', res)),
      shareReplay()
    )
    this.savedPairingsSubscription = this.savedPairings$.subscribe((res: Array<any>) => {
      this.updateWineFilterDropdown(res)
    })
  }

  ngOnDestroy(): void {
    if (this.savedPairingsSubscription) {
      this.savedPairingsSubscription.unsubscribe()
    }
  }

  filterSearch() {
    this.savedPairings$ = this.savedPairings$.pipe(
      map((arr) => arr.filter((pairing) => {
        return (
          pairing.wine_name.toLowerCase().includes(this.filterValue)
          || pairing.dish.toLowerCase().includes(this.filterValue)
        )
      }))
    )
  }

  filterWine() {
    this.savedPairings$ = this.savedPairings$.pipe(
      map((arr) => arr.filter((pairing) => {
        if (this.filterByWineValue === 'All') return pairing
        return pairing.wine_name.toLowerCase().includes(this.filterByWineValue.toLowerCase())
      }))
    )
  }

  updateAfterDelete(deleteParams) {
    this.savedPairings$ = this.accountData.deletePairing(this.uId, deleteParams).pipe(
      tap((res) => {
        this.updateWineFilterDropdown(res)
        this.snackbar.updateSnackbar(null, 'Pairing removed')
      }),
      map((wines) => wines.reverse()),
      shareReplay()
    )
  }

  updateWineFilterDropdown(getSavedWinesRes: Array<any>) {
    this.filterByWineDropdownValues = [...new Set(getSavedWinesRes.map((pair) => {
      return pair.wine_name
    }))]
  }
}
