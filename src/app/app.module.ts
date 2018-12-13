import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PhotosPage } from '../pages/photos/photos';
import { TakePicturePage } from '../pages/take-picture/take-picture';
import {SendPhotoPage} from '../pages/send-photo/send-photo';
import {ProfilePage} from '../pages/profile/profile';

export const environment = {
  firebase:{
    apiKey: "AIzaSyAybxB1kZoYfZJ_rPDGiCtb_IPU0U5v_HU",
    authDomain: "fakegram-d2e45.firebaseapp.com",
    databaseURL: "https://fakegram-d2e45.firebaseio.com",
    projectId: "fakegram-d2e45",
    storageBucket: "fakegram-d2e45.appspot.com",
    messagingSenderId: "513049132554"
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PhotosPage,
    TakePicturePage,
    SendPhotoPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, 
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PhotosPage,
    TakePicturePage,
    SendPhotoPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
