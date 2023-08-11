import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
  
  async setLocalStorage(localId: string, observable: Observable<any>) {
    const data = await firstValueFrom(observable.pipe(take(1)))
    localStorage.setItem(localId, JSON.stringify(data));
  }

  getLocalData(key: string, keyInObj?: string): string | null {
    if (keyInObj) {
      return JSON.parse(localStorage.getItem(key))[keyInObj]
    }
    return JSON.parse(localStorage.getItem(key))
  }

  // removeCache(key: any): void {
  //   localStorage.removeItem(key)
  // }
}
