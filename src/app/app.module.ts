import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { LayoutComponent } from './layout/layout.component';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JobsStoreModule } from './jobs/store/jobs-store.module';
import { environment } from 'src/environments/environment.prod';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    AuthModule,
    JobsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FlexLayoutModule,
    CommonModule,
    CoreModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
