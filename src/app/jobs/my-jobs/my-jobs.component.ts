import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/core/infrastructure/auth-store.service';
import { JobModel } from 'src/app/shared/models/response.model';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { JobsService } from 'src/app/core/services/jobs.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit, OnDestroy {
  private onComponentDestroy: Subject<void> = new Subject<void>();
  myJobs: JobModel[] = [];
  pageNumber = 1;
  constructor(
    public authStoreService: AuthStoreService,
    private jobsService: JobsService,
    private router: Router,
    private dialog: MatDialog,
    private notification: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }

  private getJobs(): void {
    if (this.authStoreService.isRecruiter()) {
      // Get Jobs for recruiter
      this.jobsService.getRecruiterJobs(this.authStoreService.returnUsername(), this.pageNumber).pipe(tap((res) => {
        Array.prototype.push.apply(this.myJobs, res);
      }),
        catchError(error => {
          return throwError(error);
        }),
        takeUntil(this.onComponentDestroy)
      ).subscribe();
    } else {
      this.jobsService.getFavouriteJobs().pipe(tap((res) => {
        let url = '?';
        res.forEach((el: { id: number }) => { url = url + `id=${el.id}&`; });
        this.getUserJobs(url);
      }),
        catchError(error => {
          return throwError(error);
        }),
        takeUntil(this.onComponentDestroy)
      ).subscribe();
    }
  }

  private getUserJobs(ids: string): void {
    this.jobsService.getUserJobs(ids, this.pageNumber).pipe(tap((res) => {
      Array.prototype.push.apply(this.myJobs, res);
    }),
      catchError(error => {
        return throwError(error);
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe();

  }

  loadMore(): void {
    this.pageNumber++;
    this.getJobs();
  }
  public doAction(event: any): void {
    if (event.action === 'delete') {
      this.delete(event.job);
    }
    else if (event.action === 'remove') {
      this.removeFromFavourite(event);
    }
    else if (event.action === 'details') {
      this.goToJob(event.job.id);
    }
  }

  public create(): void {
    this.router.navigateByUrl(`jobs/create`);
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
        this.jobsService.deleteJob(job.id).pipe(tap(() => {
          this.myJobs = this.myJobs.filter(({ id }) => id !== job.id);
          this.notification.info('Postimi u fshi me sukses!');
        }),
          catchError(error => {
            this.notification.globalError(error?.error);
            return throwError(error);
          }),
          takeUntil(this.onComponentDestroy)
        ).subscribe();
      }
    });
  }

  private removeFromFavourite(event): void {
    this.jobsService.removeFavouriteJobs(event.job.id).pipe(tap(() => {
      this.myJobs = this.myJobs.filter(({ id }) => id !== event.job.id);
      this.notification.info('Postimi u fshi nga lista me sukses!');
    }),
      catchError(error => {
        this.notification.globalError(error?.error);
        return throwError(error);
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe();
  }

  public goToJob(id: number): void {
    this.router.navigateByUrl(`jobs/edit/${id}`);
  }

}
