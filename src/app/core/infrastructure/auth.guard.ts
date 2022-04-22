import { Role } from './../../shared/models/response.model';
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthStoreService } from './auth-store.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthStoreService
  ) { }

  canActivate(): boolean {
    const userData = JSON.parse(localStorage.getItem(environment.localStorageKey));
    if (userData && this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userData = JSON.parse(localStorage.getItem(environment.localStorageKey));
    if (userData  && this.authService.isLoggedIn && this.isAllowedRoute(route)) {
      return true;
    }
    if (this.authService.loginResponse ){
      this.router.navigateByUrl('/');
    }
    return false;
  }

  private isAllowedRoute(route: ActivatedRouteSnapshot): boolean {
    let isAllowedRoute = true;
    if (route.data && route.data.role) {
      if (route.data.role !== Role.RECRUITER){
        isAllowedRoute = false;
      }
      // if (route.data.role instanceof Array) {
      //   isAllowedRoute = !!route.data.role.filter(role => this.authService.hasRole(role)).length;
      // } else {
      //   isAllowedRoute = this.authService.hasRole(route.data.role);
      // }
    }
    // if (route.data && route.data.rolesToExclude && route.data.rolesToExclude.length) {
    //   isAllowedRoute = !route.data.rolesToExclude.filter(roleToExclude => this.authService.hasRole(roleToExclude)).length;
    // }
    return isAllowedRoute;
  }
}
