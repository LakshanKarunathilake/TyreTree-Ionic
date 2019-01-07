import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { MyApp } from "./app.component";

const firebaseConfig = {
  apiKey: "AIzaSyBycA_PAAvjQGa_4LJ84KwhjDEVimVlB4U",
  authDomain: "kdmtravels-33ca8.firebaseapp.com",
  databaseURL: "https://kdmtravels-33ca8.firebaseio.com",
  projectId: "kdmtravels-33ca8",
  storageBucket: "kdmtravels-33ca8.appspot.com",
  messagingSenderId: "421108463878"
};

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
