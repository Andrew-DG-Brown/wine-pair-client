import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { AccountDataService } from 'src/app/core/services/account-data.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CacheService } from 'src/app/core/services/cache.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-wine-card',
  templateUrl: './wine-card.component.html',
  styleUrls: ['./wine-card.component.css']
})
export class WineCardComponent implements OnInit {
  @Input() cardType: 'simple' | 'complex';
  @Input() wineData: any;
  @Input() dish: string;
  @Output() emitDelete = new EventEmitter()
  savedPairing: boolean;

  constructor(
    private accountData: AccountDataService,
    private cache: CacheService,
    private snackbar: SnackbarService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.savedPairing = this.router.url.includes('saved-pairings')
  }

  async liked(pairing, dish: string) {
    if (this.auth.isLoggedIn()) {
      const uId = this.cache.getLocalData('uId', 'uId')
      const savedRes = await firstValueFrom(this.accountData.savePairing(Number(uId), { type: this.cardType, dish, ...pairing}).pipe(take(1)))
  
      if ('success' in savedRes) {
        this.snackbar.updateSnackbar('success', 'Pairing saved')
      } else if (savedRes instanceof HttpErrorResponse) {
        this.snackbar.updateSnackbar('error', "Sorry, couldn't save pairing")
      } else if ('error' in savedRes) {
        this.snackbar.updateSnackbar('info', 'Pairing already saved')
      }
    } else {
      this.router.navigate(['/login'])
    }
  }

  deletePairing(wine: string, dish: string) {
    //emit value up to update the pairings on savedParings-page
    this.emitDelete.emit({ wine, dish })
  }
}
