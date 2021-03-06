import { Component } from '@angular/core';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-athlete-details',
  templateUrl: 'athlete-details.html'
})


export class AthleteDetailsPage {
  elements: FirebaseListObservable<any>;
    constructor(public navCtrl: NavController, af: AngularFireDatabase, public alertCtrl: AlertController, 
      public actionSheetCtrl: ActionSheetController) {
      this.elements = af.list('/elements');    
  }  
}