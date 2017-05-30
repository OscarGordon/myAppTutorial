import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { IonicPage, LoadingController, Loading, NavController, AlertController, ActionSheetController } from 'ionic-angular';

//Pages
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the CreateProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {

  public profileForm:FormGroup;
  public loading:Loading;
  profiles: FirebaseListObservable<any>;
  public currentUserId;

  constructor(public navCtrl: NavController, af: AngularFireDatabase, public alertCtrl: AlertController, 
      public actionSheetCtrl: ActionSheetController, public authData: AuthProvider, public formBuilder: FormBuilder,
      public loadingCtrl: LoadingController, public afAuth: AngularFireAuth) {
    this.profileForm = formBuilder.group({
        name: [''],
        surname: [''],
        birthdate: [''],
        gender: [''],
        height: [''],
        weight: ['']
      });
    this.profiles = af.list('/userProfiles');
    this.currentUserId = afAuth.auth.currentUser.uid;
    console.log('current user', this.currentUserId);
  }

createProfile(){
    console.log('Entering create-profile function');
    if (!this.profileForm.valid){
      console.log('formulario inválido:', this.profileForm.value);
    } else {
      //this.profiles.push(this.profileForm);
      this.profiles.update(this.currentUserId, {name: this.profileForm.value.name,
        surname: this.profileForm.value.surname,
        birthdate: this.profileForm.value.birthdate,
        gender: this.profileForm.value.gender,
        height: this.profileForm.value.height,
        weight: this.profileForm.value.weight}).then( afAuth => { this.navCtrl.setRoot(HelloIonicPage);
        console.log('paso por el update');
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


  //ionViewDidLoad() {
    //console.log('ionViewDidLoad CreateProfilePage');
  //}

}
