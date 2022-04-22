import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public snackBar: MatSnackBar) { }


   info(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'snackbar-info',
    });
  }

   globalError(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'snackbar-danger'
    });
  }

}
