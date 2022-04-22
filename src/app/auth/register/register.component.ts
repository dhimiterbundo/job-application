import { SnackBarService } from './../../shared/services/snack-bar.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from './../../shared/models/response.model';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private onComponentDestroy: Subject<void> = new Subject<void>();
  passwordFormGroup: FormGroup;
  registerForm: FormGroup;
  roles = Object.keys(Role);
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private notification: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }

  register(): void {
    this.registerForm.disable();
    this.passwordFormGroup.disable();
    const userInfo = this.registerForm.getRawValue();
    const password = this.passwordFormGroup.getRawValue();
    const payload = { ...userInfo, ...password};
    delete payload.confirmPassword;

    this.service.register(payload).pipe(
      tap((res) => {
        if (res) {
          this.notification.info('User u krijua me sukses');
          this.router.navigateByUrl('/login');
        }
      }),
      catchError(error => {
        this.notification.globalError(error?.error);
        return throwError(error);
      }),
      takeUntil(this.onComponentDestroy)
    ).subscribe();
  }
  private buildForm(): void {
    this.registerForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      id: Math.floor(Math.random()),
    });
    this.passwordFormGroup = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],

    }, { validators: this.checkPasswords });
  }

  // tslint:disable-next-line: typedef
  private checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if (password !== confirmPassword) {
      group.get('confirmPassword').setErrors({ notSame: true });

    }
    return password === confirmPassword ? null : { notSame: true };
  }
}
