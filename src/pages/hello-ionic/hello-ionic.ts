import { Component } from '@angular/core';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AthleteDetailsPage } from '../athlete-details/athlete-details';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})


export class HelloIonicPage {
  elements: FirebaseListObservable<any>;
    constructor(public navCtrl: NavController, af: AngularFireDatabase, public alertCtrl: AlertController, 
      public actionSheetCtrl: ActionSheetController) {
      this.elements = af.list('/elements');    
  }  


addElement(){
  let prompt = this.alertCtrl.create({
    title: 'Element Name',
    message: 'Enter a name for the element to add',
    inputs: [
      {
        name: 'title',
        placeholder: 'Name'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.elements.push({
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();  
}

showOptions(elementId, elementTitle){
  let actionSheet = this.actionSheetCtrl.create({
    title: 'What do you want to do?',
    buttons:[
      {
        text: 'Delete element',
        role: 'destructive',
        handler: () => {
          this.removeElement(elementId);
        }
      },
      {
       text: 'Update element',
       handler: () => {
         this.updateElement(elementId, elementTitle);
       } 
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Action cancelled');
        }
      }
    ]
  });
  actionSheet.present();
}

removeElement(elementId: string){
  this.elements.remove(elementId);
}

updateElement(elementId, elementTitle){
  let prompt = this.alertCtrl.create({
    title: 'Element name',
    message: 'Update the name for this element',
    inputs: [
      {
        name: 'title',
        placeholder: 'name',
        value: elementTitle
      },      
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Action cancelled');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.elements.update(elementId, {title: data.title});
        }
      }
    ]
  });
  prompt.present();
}

goToPage(){
  this.navCtrl.push(AthleteDetailsPage);
}
}