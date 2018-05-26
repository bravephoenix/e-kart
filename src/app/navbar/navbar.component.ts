import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  user: firebase.User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      user => this.user = user
    );
  }

  onLogout() {
    this.authService.logout();
  }

}
