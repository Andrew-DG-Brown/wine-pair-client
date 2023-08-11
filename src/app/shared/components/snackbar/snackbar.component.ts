import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  @Input() type: 'success' | 'error' | 'info' | null
  @Input() message: string;
  snackbar$: Observable<any>

  constructor(public snackbar: SnackbarService) {
    this.snackbar$ = this.snackbar.getCurrentSnackbar()
  }
}
