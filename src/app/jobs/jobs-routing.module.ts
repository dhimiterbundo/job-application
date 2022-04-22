import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobResolver } from '../core/services/job-resolver.service';
import { JobFormComponent } from './job-form/job-form.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { RecruiterGuard } from './recruiter.guard';
import { SearchJobComponent } from './search-job/search-job.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      { path: 'list', component: SearchJobComponent },
      { path: 'myJobs', component: MyJobsComponent },
      {
        path: 'edit/:id', component: JobFormComponent,
        resolve: {
          job: JobResolver
        },
        canActivate: [RecruiterGuard],
      },
      {
        path: 'create', component: JobFormComponent,
        canActivate: [RecruiterGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
