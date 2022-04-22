import { Action, createReducer, on } from '@ngrx/store';
import * as jobsState from './jobs.state';
import * as jobsActions from './jobs.actions';

const jobsReducer = createReducer(
  jobsState.initialstate,
  // SELECT ONE
  on(jobsActions.SelectJob, (state, { id }) => ({
    ...state,
    selectedId: id
  })),
  // FIND ALL
  on(jobsActions.findAllJobs, (state) => ({
    ...state,
    action: jobsActions.type.FIND_ALL_JOBS,
    loading: true,
    error: null,
  })),
  on(jobsActions.findAllJobsSuccess, (state, { jobs }) => {
    return jobsState.adapter.addMany(jobs, {
      ...state,
      loading: false,
    });
  }),
  on(jobsActions.findAllJobsFail, (state, { error }) => ({
    ...state,
    error: {...error},
    loading: false,
  })),
  // FIND ONE
  on(jobsActions.findOneJob, (state) => ({
    ...state,
    action: jobsActions.type.FIND_ONE_JOB,
    loading: true,
    error: null,
  })),
  on(jobsActions.findOneSuccess, (state, { job }) => {
    return jobsState.adapter.setOne(job, {
      ...state,
      loading: false,
    });
  }),
  on(jobsActions.findOneJobFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // CREATE
  on(jobsActions.createJob, (state) => ({
    ...state,
    action: jobsActions.type.CREATE_JOB,
    loading: true,
    error: null,
  })),
  on(jobsActions.createJobSuccess, (state, { job }) => {
    return jobsState.adapter.addOne(job, {
      ...state,
      loading: false,
    });
  }),
  on(jobsActions.createJobFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
  // UPDATE
  on(jobsActions.updateJob, (state) => ({
    ...state,
    action: jobsActions.type.UPDATE_JOB,
    loading: true,
    error: null,
  })),
  on(jobsActions.updateJobSuccess, (state, { job }) => {
    return jobsState.adapter.updateOne({ id: job.id, changes: job }, {
      ...state,
      loading: false,
    });
  }),
  on(jobsActions.updateJobFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),

  // PATCH
  // on(jobsActions.patchJob, (state) => ({
  //   ...state,
  //   action: jobsActions.type.PATCH_JOB,
  //   loading: true,
  //   error: null,
  // })),
  // on(jobsActions.patchJobSuccess, (state, { job }) => {
  //   return jobsState.adapter.updateOne({ id: job._id, changes: job }, {
  //     ...state,
  //     loading: false,
  //   });
  // }),
  // on(jobsActions.patchJobFail, (state, { error }) => ({
  //   ...state,
  //   error: { ...error },
  //   loading: false,
  // })),

  // DELETE
  on(jobsActions.deleteJob, (state) => ({
    ...state,
    action: jobsActions.type.DELETE_JOB,
    loading: true,
    error: null,
  })),
  on(jobsActions.deleteJobSuccess, (state, { id }) => {
    return jobsState.adapter.removeOne(id, {
      ...state,
      loading: false,
    });
  }),
  on(jobsActions.patchJobFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    loading: false,
  })),
);

// tslint:disable-next-line: typedef
export function reducer(state: jobsState.JobsState, action: Action) {
  return jobsReducer(state, action);
}
