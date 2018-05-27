import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;

  constructor(public authService: AuthService, private afAuth: AngularFireAuth) {
   }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
