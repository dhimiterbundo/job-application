import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobsState, featureKey, adapter } from './jobs.state';
import * as jobsActions from './jobs.actions';

const {
  selectEntities,
  selectAll
} = adapter.getSelectors();

const getJobState = createFeatureSelector<JobsState>(featureKey);

const selectJobEntities = createSelector(getJobState, selectEntities);

const selectJobSensorId = createSelector(getJobState, (state: JobsState) => state.selectedId);

export const selectAllJobs = createSelector(getJobState, selectAll);

export const selectCurrentJob = createSelector(
  selectJobEntities,
  selectJobSensorId,
  (userEntities, userId) => userId && userEntities[userId]
);

export const isCreateSuccess = createSelector(getJobState, (state: JobsState) =>
  state.action === jobsActions.type.CREATE_JOB && !state.loading && !state.error);

export const isUpdateSuccess = createSelector(getJobState, (state: JobsState) =>
  state.action === jobsActions.type.UPDATE_JOB && !state.loading && !state.error);

export const isDeleteSuccess = createSelector(getJobState, (state: JobsState) =>
  state.action === jobsActions.type.DELETE_JOB && !state.loading && !state.error);
