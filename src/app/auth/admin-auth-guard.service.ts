import { AppUser } from './../shared/app-user.model';
import { map, switchMap, mapTo, switchMapTo } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) {

  }

  canActivate() {
    return this.authService.appUser$.pipe(
      map(appUser => {
        if (appUser.isAdmin) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
