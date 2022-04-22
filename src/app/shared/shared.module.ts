import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module/material-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { JobComponent } from './components/job/job.component';
import { SnackBarService } from './services/snack-bar.service';


@NgModule({
  declarations: [ConfirmationDialogComponent, JobComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule
  ],
  exports: [MaterialModule, JobComponent],
  providers: [SnackBarService],
})
export class SharedModule { }
