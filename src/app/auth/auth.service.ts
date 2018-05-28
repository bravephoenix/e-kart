import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  googleLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(
      res => {
        this.userService.saveUser(res.user);
        this.router.navigateByUrl(returnUrl);
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

