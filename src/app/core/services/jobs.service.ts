import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrlsConfig } from './api-url-config.service';

@Injectable({ providedIn: 'root' })
export class JobsService {

  constructor(private httpClient: HttpClient) { }

  getAllJobs(pageNumber: number): Observable<any> {
    const url: string = ApiUrlsConfig.job();
    return this.httpClient.get<any>(url + `?_page=${pageNumber}`).pipe(
      map((res) => res));
  }
  filterJobs(title: string): Observable<any> {
    const url: string = ApiUrlsConfig.job();
    return this.httpClient.get<any>(url + `?title_like=${title}`).pipe(
      map((res) => res));
  }
  getRecruiterJobs(username: string, pageNumber?: number): Observable<any> {
    const url: string = ApiUrlsConfig.jobForRecruiter(username);
    return this.httpClient.get<any>(url + `&_page=${pageNumber}`).pipe(
      map((res) => res));
  }

  getUserJobs(ids: string, pageNumber: number): Observable<any> {
    const url: string = ApiUrlsConfig.job() + ids;
    return this.httpClient.get<any>(url + `_page=${pageNumber}`).pipe(
      map((res) => res));
  }

  postJob(payload: string): Observable<any> {
    const url: string = ApiUrlsConfig.job();
    return this.httpClient.post<any>(url, payload).pipe(
      map((res) => res));
  }
  getJobById(id: number | string): Observable<any> {
    const url: string = ApiUrlsConfig.jobById(id);
    return this.httpClient.get<any>(url).pipe(
      map((res) => res));
  }
  editJob(payload: any): Observable<any> {
    const url: string = ApiUrlsConfig.jobById(payload.id);
    return this.httpClient.put<any>(url, payload).pipe(
      map((res) => res));
  }
  deleteJob(id: number): Observable<any> {
    const url: string = ApiUrlsConfig.jobById(id);
    return this.httpClient.delete<any>(url).pipe(
      map((res) => res));
  }

  getFavouriteJobs(): Observable<any> {
    const url: string = ApiUrlsConfig.favouriteJobs();
    return this.httpClient.get<any>(url).pipe(
      map((res) => res));
  }

  addFavouriteJobs(job: any): Observable<any> {
    const url: string = ApiUrlsConfig.favouriteJobs();
    return this.httpClient.post<any>(url, job).pipe(
      map((res) => res));
  }

  removeFavouriteJobs(id: number): Observable<any> {
    const url: string = ApiUrlsConfig.favouriteJobs();
    return this.httpClient.delete<any>(url + `/${id}`).pipe(
      map((res) => res));
  }

}
