import { Component, OnInit, Input } from '@angular/core';
import { ComplexResponse, ErrorRes, SimpleResponse } from '../../../interfaces/wine-query.models'
import { GlobalStateService } from '../../../services/global-state.service';
import { Observable } from 'rxjs';
import { AccountDataService } from 'src/app/core/services/account-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css']
})
export class QueryResultComponent implements OnInit {
  @Input() data: ComplexResponse | SimpleResponse | ErrorRes | HttpErrorResponse;
  data$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    private globalState: GlobalStateService,
    private accountData: AccountDataService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.globalState.getLoadingState()
    this.data$ = this.globalState.getPairingResultsState()
  }

  updateLoading() { 
    this.globalState.updateLoadingState(false)
  }

  isError(object: any): object is HttpErrorResponse {
    return 'error' in object;
  }

  getErrorMessage(errRes: HttpErrorResponse) {
    return typeof errRes.error === 'string' ? errRes.error : errRes.statusText
  }

  liked(pairing, dish) {
    console.log({...pairing, dish})
  }
}
