import * as firebase from 'firebase';

export class AuthService {

  googgleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(
      (result) => {
        console.log('Logged in as : ' + result.user.displayName);
      }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut()
      .then(
        result => console.log('Logged Out')
      );
  }
}
