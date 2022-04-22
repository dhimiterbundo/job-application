import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule
  ]
})
export class AuthModule { }
