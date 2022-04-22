import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrlsConfig } from './api-url-config.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(username: string): Observable<any> {
    const url: string = ApiUrlsConfig.auth.login(username);
    return this.httpClient.get<any>(url).pipe(
      map((res) => res[0]));
  }
  register(payload: any): Observable<any> {
    const url: string = ApiUrlsConfig.auth.register();
    return this.httpClient.post<any>(url, payload).pipe(
      map((res) => res));
  }
}
