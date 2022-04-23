import { createAction, props } from '@ngrx/store';
import { JobId, JobModel } from 'src/app/shared/models/response.model';


export enum type {
  SELECT_JOB = '[ Job ] Select a Job',

  FIND_ALL_JOBS = '[ Job ] Find All Jobs',
  FIND_ALL_JOBS_FAIL = '[ Job ] Find All Jobs Fail',
  FIND_ALL_JOBS_SUCCESS = '[ Job ] Find All Jobs Success',

  FIND_ONE_JOB = '[ Job ] Find One Job',
  FIND_ONE_JOB_FAIL = '[ Job ] Find One Job Fail',
  FIND_ONE_JOB_SUCCESS = '[ Job ] Find One Job Success',

  CREATE_JOB = '[ Job ] Create Job',
  CREATE_JOB_FAIL = '[ Job ] Create Job Fail',
  CREATE_JOB_SUCCESS = '[ Job ] Create Job Success',

  UPDATE_JOB = '[ Job ] Update Job',
  UPDATE_JOB_FAIL = '[ Job ] Update Job Fail',
  UPDATE_JOB_SUCCESS = '[ Job ] Update Job Success',

  PATCH_JOB = '[ Job ] Patch Job',
  PATCH_JOB_FAIL = '[ Job ] Patch Job Fail',
  PATCH_JOB_SUCCESS = '[ Job ] Patch Job Success',

  DELETE_JOB = '[ Job ] Delete Job',
  DELETE_JOB_FAIL = '[ Job ] Delete Job Fail',
  DELETE_JOB_SUCCESS = '[ Job ] Delete Job Success',
}

export const SelectJob = createAction(type.SELECT_JOB, props<{ id: string }>());

export const findAllJobs = createAction(type.FIND_ALL_JOBS, props<{ pageNumber: number }>());
export const findAllJobsFail = createAction(type.FIND_ALL_JOBS_FAIL, props<{ error: any }>());
export const findAllJobsSuccess = createAction(type.FIND_ALL_JOBS_SUCCESS, props<{ jobs: JobModel[] }>());

export const findOneJob = createAction(type.FIND_ONE_JOB, props<{ id: string }>());
export const findOneJobFail = createAction(type.FIND_ONE_JOB_FAIL, props<{ error: any }>());
export const findOneSuccess = createAction(type.FIND_ONE_JOB_SUCCESS, props<{ job: JobModel }>());

export const createJob = createAction(type.CREATE_JOB, props<{ job: Omit<JobModel, JobId> }>());
export const createJobFail = createAction(type.CREATE_JOB_FAIL, props<{ error: any }>());
export const createJobSuccess = createAction(type.CREATE_JOB_SUCCESS, props<{ job: JobModel }>());

export const updateJob = createAction(type.UPDATE_JOB, props<{ job: JobModel }>());
export const updateJobFail = createAction(type.UPDATE_JOB_FAIL, props<{ error: any }>());
export const updateJobSuccess = createAction(type.UPDATE_JOB_SUCCESS, props<{ job: JobModel }>());

export const patchJob = createAction(type.PATCH_JOB, props<{ id: string, job: Partial<JobModel> }>());
export const patchJobFail = createAction(type.PATCH_JOB_FAIL, props<{ error: any }>());
export const patchJobSuccess = createAction(type.PATCH_JOB_SUCCESS, props<{ job: JobModel }>());

export const deleteJob = createAction(type.DELETE_JOB, props<{ id: string }>());
export const deleteJobFail = createAction(type.DELETE_JOB_FAIL, props<{ error: any }>());
export const deleteJobSuccess = createAction(type.DELETE_JOB_SUCCESS, props<{ id: string }>());
