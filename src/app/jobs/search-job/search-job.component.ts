import { isUpdateSuccess } from './../store/jobs.selectors';
import { findAllJobs } from './../store/jobs.actions';
import { JobModel } from './../../shared/models/response.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Subject, Subscription, throwError } from 'rxjs';
import { AuthStoreService } from './../../core/infrastructure/auth-store.service';
import { Router } from '@angular/router';
import { JobsService } from './../../core/services/jobs.service';
import { Store } from '@ngrx/store';
import * as jobActions from '../store/jobs.actions';
import * as jobSelector from '../store/jobs.selectors';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-search-job',
  templateUrl: './search-job.component.html',
  styleUrls: ['./search-job.component.scss']
})
export class SearchJobComponent implements OnInit, OnDestroy {
  private onComponentDestroy: Subject<void> = new Subject<void>();
  filters: FormGroup;

  jobs: JobModel[] = [];
  favouriteJobs: JobModel[] = [];
  pageNumber = 1;

  private jobStore$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private jobService: JobsService,
    public authStoreService: AuthStoreService,
    private router: Router,
    private notification: SnackBarService,
    private store: Store<{ jobs: JobModel[] }>
  ) {
  }

  ngOnInit(): void {
    this.buildFilterForm();
    this.getJobs();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
    this.jobStore$?.unsubscribe();
  }

  buildFilterForm(): void {
    this.filters = this.fb.group({
      jobTitle: new FormControl('', [Validators.required, Validators.min(2)])
    });
  }

  clearFilters(): void {
    this.filters.reset();
    this.pageNumber = 1;
    this.jobs = [];
    this.getJobs();
  }

  delete(job): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {
        title: 'Warning', description: [{ name: `Are you sure do you want to delete ${job.title}?` }],
        confirmBtn: 'Yes', cancelBtn: 'No',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.jobService.deleteJob(job.id).pipe(tap(() => {
          this.jobs = this.jobs.filter(({ id }) => id !== job.id);
        }),
          catchError(error => {
            return throwError(error);
          }),
          takeUntil(this.onComponentDestroy)
        ).subscribe();
      }
    });
  }
  getJobs(): void {
    this.jobService.getAllJobs(this.pageNumber).pipe(tap((res) => {
      Array.prototype.push.apply(this.jobs, res);
    }),
      catchError(error => {
        return throwError(error);
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe();
    // this.store.dispatch(jobActions.findAllJobs({ pageNumber: this.pageNumber }));
    // this.jobStore$ = this.store.select(jobSelector.selectAllJobs)
    //   .subscribe((jobs) => {
    //     // Array.prototype.push.apply(this.jobs, jobs);
    //     this.jobs = [...jobs];;
    //   });

  }

  loadMore(): void {
    this.pageNumber++;
    this.getJobs();
  }
  public goToJob(id: number): void {
    this.router.navigateByUrl(`jobs/edit/${id}`);
  }

  getFavouriteJobs(): void {
    this.jobService.getFavouriteJobs().pipe(tap((res) => {
      this.favouriteJobs = res;
    }),
      catchError(error => {
        return throwError(error);
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe();
  }

  jobAction(event): void {
    if (event.action === 'delete') {
      this.delete(event.job);
    } else {
      this.jobService.addFavouriteJobs(event.job).pipe(tap(() => {
        this.notification.info('Postimi u shtua ne liste me sukses!');
      }),
        catchError(error => {
          this.notification.globalError(error?.error);
          return throwError(error);
        }),
        takeUntil(this.onComponentDestroy)
      ).subscribe();
    }
  }

  public filterJobs(): void {
    const data = this.filters.getRawValue();
    console.log(data);
    this.pageNumber = 1;
    this.jobs = [];
    this.filters.disable();
    this.jobService.filterJobs(data.jobTitle).pipe(tap((res) => {
      Array.prototype.push.apply(this.jobs, res);
      this.filters.enable();
    }),
      catchError(error => {
        return throwError(error);
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe();

  }

}
