import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SnackbarService } from './shared/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  snackbar$: Observable<any>

  constructor(private snackbar: SnackbarService) {
    this.snackbar$ = this.snackbar.getCurrentSnackbar()
  }
}
