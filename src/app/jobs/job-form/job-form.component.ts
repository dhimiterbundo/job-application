import { JobModel } from './../../shared/models/response.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobsService } from 'src/app/core/services/jobs.service';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStoreService } from 'src/app/core/infrastructure/auth-store.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, OnDestroy {
  private onComponentDestroy: Subject<void> = new Subject<void>();
  jobForm: FormGroup;
  job: JobModel;
  constructor(
    private fb: FormBuilder,
    private service: JobsService,
    private notification: SnackBarService,
    private route: ActivatedRoute,
    private authStore: AuthStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.job = this.route.snapshot.data.job;
    this.buildForm();
    if (this.job) {
      this.jobForm.setValue({
        id: this.job.id,
        image: this.job.image,
        title: this.job.title,
        postedBy: this.job.postedBy,
        email: this.job.email,
        description: this.job.description,
      });
    }
  }

  ngOnDestroy(): void {
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }

  buildForm(): void {
    this.jobForm = this.fb.group({
      id: new FormControl(Math.floor(Math.random())),
      image: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      postedBy: new FormControl(this.authStore.returnUsername(), Validators.required),
      email: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  public saveJob(): void {
    const data = this.jobForm.getRawValue();
    if (this.job) {
      this.service.editJob(data).pipe(tap(() => {
        this.notification.info('Postimi u editua me sukses');
      }),
        catchError(error => {
          this.notification.globalError(error?.error);
          return throwError(error);
        }),
        takeUntil(this.onComponentDestroy)
      ).subscribe();
    }
    else {

      this.service.postJob(data).pipe(tap((res) => {
        this.notification.info('Postimi u krijua me sukses');
        this.router.navigateByUrl(`jobs/edit/${res.id}`);
      }),
        catchError(error => {
          this.notification.globalError(error?.error);
          return throwError(error);
        }),
        takeUntil(this.onComponentDestroy)
      ).subscribe();
    }

  }

}
