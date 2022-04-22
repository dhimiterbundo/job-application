import { JobModel } from 'src/app/shared/models/response.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as jobsActions from './jobs.actions';
import { JobsService } from 'src/app/core/services/jobs.service';

@Injectable()
export class JobsEffects {

  findAllJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobsActions.findAllJobs),
      switchMap((action) =>
        this.jobsService.getAllJobs(action.pageNumber).pipe(
          map((jobs) => jobsActions.findAllJobsSuccess(jobs)),
          catchError((error) => of(jobsActions.findAllJobsFail({ error })))
        )
      )
    )
  );

  // findOneById$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(jobsActions.findOneJob),
  //     switchMap((action) =>
  //       this.jobsService.findById(action.id).pipe(
  //         map((job) => Actions.findOneSuccess({ job })),
  //         catchError((error) => of(jobsActions.findOneJobFail({ error })))
  //       )
  //     )
  //   )
  // );

  // createJob$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(jobsActions.createJob),
  //     switchMap((action) =>
  //       this.jobsService.create(action.book).pipe(
  //         map((job) => jobsActions.createBookSuccess({ job })),
  //         catchError((error) => of(jobsActions.createBookFail({ error })))
  //       )
  //     )
  //   )
  // );

  // updateJob$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(jobsActions.updateJob),
  //     switchMap((action) =>
  //       this.jobsService.update(action.job).pipe(
  //         map((job) => jobsActions.updateJobSuccess({ job })),
  //         catchError((error) => of(jobsActions.updateJobFail({ error })))
  //       )
  //     )
  //   )
  // );


  // deleteJob$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(jobsActions.deleteJob),
  //     switchMap((action) =>
  //       this.jobService.delete(action.id).pipe(
  //         map(() => jobsActions.deleteJobSuccess({ id: action.id })),
  //         catchError((error) => of(jobActions.deleteJobFail({ error })))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private jobsService: JobsService
  ) { }
}
