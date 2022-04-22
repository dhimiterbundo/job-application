import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';


const materialModules = [
  MatSidenavModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatTableModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  FormsModule,
  ReactiveFormsModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSortModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatTabsModule,
  MatMenuModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatProgressBarModule,
  DragDropModule,
  CdkStepperModule,
  MatChipsModule,
  MatGridListModule
];

@NgModule({
  declarations: [],
  imports: [],
  exports: [materialModules]
})
export class MaterialModule { }
