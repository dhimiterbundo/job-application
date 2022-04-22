import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subject, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private onComponentDestroy: Subject<void> = new Subject<void>();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService,
    private notification: SnackBarService,
  ) { }
  loginForm: FormGroup;
  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }

  public login(): void {
    const data = this.loginForm.value;
    this.service.login(data.username).pipe(
      tap((res) => {
        if (res) {
          localStorage.setItem(environment.localStorageKey, JSON.stringify(res));
          this.router.navigateByUrl('jobs');
        } else {
          this.notification.globalError('This user does not exist');
        }
      }),
      catchError(error => {
        this.notification.globalError(error?.message);
        return throwError(error);
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe();
  }

  private buildForm(): void {
    this.loginForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

}
