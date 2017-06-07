import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Pages
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { AthleteDetailsPage } from '../pages/athlete-details/athlete-details';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { SelectExercisesPage } from '../pages/select-exercises/select-exercises';
import { NewSessionPage } from '../pages/new-session/new-session';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

// Import the AngularFire2 modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


// AngularFire2 settings
export const firebaseConfig = {
  apiKey: "AIzaSyCDZyYbAze84Vfqw627aB-goromg7iVhaY",
  authDomain: "norep-3a7a5.firebaseapp.com",
  databaseURL: "https://norep-3a7a5.firebaseio.com",
  projectId: "norep-3a7a5",
  storageBucket: "norep-3a7a5.appspot.com",
  messagingSenderId: "920657672761"
};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    AthleteDetailsPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    CreateProfilePage,
    SelectExercisesPage,
    NewSessionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    }),
    // angularfiremodule initialization
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    AthleteDetailsPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    CreateProfilePage,
    SelectExercisesPage,
    NewSessionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
