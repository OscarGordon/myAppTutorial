import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController  } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-select-exercises',
  templateUrl: 'select-exercises.html',
})
export class SelectExercisesPage {
  exercises: FirebaseListObservable<any>;
  public exerciseList: Array<any>;
  public loadedExerciseList: Array<any>;
  public exerciseRef: firebase.database.Reference;

  //searchQuery: string ='';

  constructor(public navCtrl: NavController, public af: AngularFireDatabase, public alertCtrl: AlertController, 
      public actionSheetCtrl: ActionSheetController) {
        this.exercises = af.list('/exercises');
        this.exerciseRef = firebase.database().ref('/exercises');

        this.exerciseRef.on('value', exerciseList => {
          let exercises = [];
          exerciseList.forEach( exercise => {
            exercises.push(exercise.val());
            return false;
          });

          this.exerciseList = exercises;
          this.loadedExerciseList = exercises;
        }); 
        
  }

  initializeExercises(): void {
    //this.exercises = this.af.list('/exercises');
    this.exerciseList = this.loadedExerciseList;
    
    }
  

  getExercises(ev: any){
    // Reset items back to all of the items
    this.initializeExercises();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string then do not filter the items
    if (val && val.trim() != ''){
      console.log('entro por el if de cadena no vacia', val);
      this.exerciseList = this.exerciseList.filter((v) => {
        if(v.exercise && val){
          if (v.name.toLowerCase().indexOf(val.toLowerCase()) > -1){
            return true;
          }
          return false;
        }
      });
    }

  }

  //ionViewDidLoad() {
  //console.log('ionViewDidLoad SelectExercisesPage');
  //}

}
