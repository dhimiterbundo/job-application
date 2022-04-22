import { Injectable } from '@angular/core';
import { Role } from './../../shared/models/response.model';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private data: any;
  private loaded: boolean;

  constructor(
    private router: Router
  ) {
  }

  logout(): void {
    localStorage.removeItem(environment.localStorageKey);
    this.router.navigateByUrl('/login');
  }

  setData(data: any): void {
    this.data = data || '';
    if (data) {
      localStorage.setItem(environment.localStorageKey, JSON.stringify(data));
    } else {
      localStorage.removeItem(environment.localStorageKey);
    }
    this.loaded = true;
  }

  get isLoggedIn(): boolean {
    this.ensureLoaded();
    return !!this.data.username;
  }

  get loginResponse(): any {
    this.ensureLoaded();
    return this.data;
  }


  private ensureLoaded(): void {
      this.data = JSON.parse(localStorage.getItem(environment.localStorageKey));
  }

  hasRole(role: string): boolean {
    return (
      this.data && this.data.roles && this.data.roles.filter(currentRole => currentRole === role).length > 0
    );
  }

  isRecruiter(): boolean {
    this.ensureLoaded();
    return (
      this.data && this.data.role && this.data.role === Role.RECRUITER
    );
  }
  returnUsername(): string{
    this.ensureLoaded();
    return this.data.username;
  }

}
