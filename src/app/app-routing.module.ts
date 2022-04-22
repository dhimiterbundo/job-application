import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/infrastructure/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthModule) },
  {
    path: 'jobs',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./jobs/jobs-routing.module').then(m => m.JobsRoutingModule) }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
