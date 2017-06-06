import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
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

// import Firebase
import { AngularFireAuth } from 'angularfire2/auth';

// import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  //rootPage = HelloIonicPage;
  
  // Before going to home page we need to verify user auth
  //rootPage = LoginPage;
  rootPage: any;
  
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth
  ) {
    //create the subscribe function
    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HelloIonicPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Athlete Details', component: AthleteDetailsPage },
      { title: 'Login Page', component: LoginPage },
      { title: 'Signup Page', component: SignupPage },
      { title: 'Reset Password', component: ResetPasswordPage },
      { title: 'Create Profile', component: CreateProfilePage },
      { title: 'Select Exercises', component: SelectExercisesPage },
      { title: 'New Session', component: NewSessionPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }
}
