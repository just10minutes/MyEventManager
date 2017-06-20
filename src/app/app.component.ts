import { Component,NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  zone:NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      firebase.initializeApp({
          apiKey: "AIzaSyDkbiIAn8_8T9FyuKA46st3iEWMeVCcLmk",
          authDomain: "myeventmanager-aa2b2.firebaseapp.com",
          databaseURL: "https://myeventmanager-aa2b2.firebaseio.com",
          storageBucket: "",
          messagingSenderId: "317226098893"
        });
      statusBar.styleDefault();
      splashScreen.hide();
      this.zone = new NgZone({});
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            this.zone.run( () => {
              if (!user) {
                this.rootPage = 'login';
                unsubscribe();
              } else { 
                this.rootPage = HomePage;
                unsubscribe();
              }
            });     
          });
    });
  }
}

