import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  //email % pass login function
  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
  return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }
  //reset password function
  resetPassword(email: string): firebase.Promise<any> {
  return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  //logout function
  logoutUser(): firebase.Promise<any> {
  return this.afAuth.auth.signOut();
  }
  //create user function
  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
  //return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then( newUser => {
      firebase.database().ref('/userProfiles').child(newUser.uid).set({ email: newEmail, followers: {}, following: {}});
    });
  }

}
