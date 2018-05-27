import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    // const firebaseConfig = {
    //   apiKey: 'AIzaSyD1v2WKVy_1iX3tA0NM5naoIiI8fcQs-Rc',
    //   authDomain: 'e-kart-d733d.firebaseapp.com',
    //   databaseURL: 'https://e-kart-d733d.firebaseio.com',
    //   projectId: 'e-kart-d733d',
    //   storageBucket: 'e-kart-d733d.appspot.com',
    //   messagingSenderId: '252071520353'
    // };

    // firebase.initializeApp(firebaseConfig);
  }
}
