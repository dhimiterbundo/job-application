import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JobsEffects } from './jobs.effects';
import { reducer } from './jobs.reducer';
import { featureKey } from './jobs.state';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([JobsEffects])
  ]
})
export class JobsStoreModule { }
