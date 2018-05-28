import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './app-user.model';

@Injectable()
export class UserService {

  // user: Observable<AppUser>;

  constructor(private db: AngularFireDatabase) {
  }

  saveUser(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getUser(uid: string): Observable<AppUser> {
    return this.db.object('/users/' + uid).valueChanges() as Observable<AppUser>;
  }
}
