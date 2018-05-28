import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

import { UserService } from './../shared/user.service';
import { AppUser } from './../shared/app-user.model';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  appUser: AppUser;

  constructor(public authService: AuthService, private afAuth: AngularFireAuth) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
