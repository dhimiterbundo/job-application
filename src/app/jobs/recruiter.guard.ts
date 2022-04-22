
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthStoreService } from '../core/infrastructure/auth-store.service';
import { Role } from '../shared/models/response.model';




@Injectable({
    providedIn: 'root'
})
export class RecruiterGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authService: AuthStoreService
    ) { }

    canActivate(): boolean {
        const userData = JSON.parse(localStorage.getItem(environment.localStorageKey));
        if (userData && this.authService.isLoggedIn && userData.role === Role.RECRUITER) {
            return true;
        }
        if (this.authService.loginResponse) {
            // this.router.navigateByUrl('/');
        }
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userData = JSON.parse(localStorage.getItem(environment.localStorageKey));
        if (userData && this.authService.isLoggedIn && userData.role === Role.RECRUITER) {
            return true;
        }
        if (this.authService.loginResponse) {
            this.router.navigateByUrl('/');
        }
        return false;
    }

}
