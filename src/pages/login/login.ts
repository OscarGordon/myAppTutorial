import { Component } from '@angular/core';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { IonicPage, LoadingController, Loading, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
//import home page to push users there
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
//import email validator
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


export class LoginPage {
  public loginForm:FormGroup;
  public loading:Loading;

  elements: FirebaseListObservable<any>;
  
    constructor(public navCtrl: NavController, af: AngularFireDatabase, public alertCtrl: AlertController, 
      public actionSheetCtrl: ActionSheetController, public authData: AuthProvider, public formBuilder: FormBuilder,
      public loadingCtrl: LoadingController) {
      //this.elements = af.list('/elements');    
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
      });
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount(){
    this.navCtrl.push(SignupPage);
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot(HelloIonicPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }  
}