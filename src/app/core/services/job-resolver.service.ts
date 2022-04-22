import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobsService } from './jobs.service';



@Injectable({ providedIn: 'root' })

export class JobResolver implements Resolve<any> {
    constructor(private service: JobsService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        if (route.paramMap.has('id')) {
            return this.service.getJobById(route.paramMap.get('id'));
        }
    }
}
