import { Router } from '@angular/router';
import { UserModel } from './../shared/models/response.model';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthStoreService } from '../core/infrastructure/auth-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: UserModel = null;
  constructor(
    private authStoreService: AuthStoreService
    ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(environment.localStorageKey));
  }

  logout(): void {
    this.authStoreService.logout();
  }

}
