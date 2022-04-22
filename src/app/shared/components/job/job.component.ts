import { JobModel } from './../../models/response.model';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { tap, catchError, takeUntil } from 'rxjs/operators';
import { AuthStoreService } from 'src/app/core/infrastructure/auth-store.service';
import { JobsService } from 'src/app/core/services/jobs.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {
  private onComponentDestroy: Subject<void> = new Subject<void>();

  @Input() job: JobModel;
  @Input() showAddButton: boolean;
  @Input() showRemoveButton: boolean;
  @Output() favAction = new EventEmitter<any>();

  constructor(
    public authStoreService: AuthStoreService,

  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.onComponentDestroy.next();
    this.onComponentDestroy.complete();
  }

  public action(action: string): void {
    this.favAction.emit({ action, job: this.job });
  }

}
