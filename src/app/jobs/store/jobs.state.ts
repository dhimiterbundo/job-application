import { JobModel } from 'src/app/shared/models/response.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';


export const adapter = createEntityAdapter<JobModel>({
  selectId: (sensor: JobModel) => sensor.id,
  sortComparer: false
});

export interface JobsState extends EntityState<JobModel> {
  selectedId: string | null;
  action: string | null;
  loading: boolean;
  loaded: boolean;
  error: any;
  allJobs: JobModel[];
}

export const initialstate: JobsState = adapter.getInitialState({
  selectedId: null,
  action: null,
  loading: false,
  loaded: false,
  error: null,
  allJobs: []
});

export const featureKey = 'jobs';
