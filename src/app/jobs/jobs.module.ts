import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchJobComponent } from './search-job/search-job.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobsStoreModule } from './store/jobs-store.module';

@NgModule({
  declarations: [SearchJobComponent, MyJobsComponent, JobFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FlexLayoutModule,
    JobsStoreModule,
  ]
})
export class JobsModule { }
