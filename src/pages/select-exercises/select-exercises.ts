import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController  } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-select-exercises',
  templateUrl: 'select-exercises.html',
})
export class SelectExercisesPage {
  exercises: FirebaseListObservable<any>;
  //Array para almacenar la lista de ejercicios cargada desde Firebase
  public exerciseList: any[] = [];
  //Array para almacenar la lista inicial de ejercicios, y evitar consultas recurrentes
  public loadedExerciseList: any[] = [];
  

  constructor(public navCtrl: NavController, public af: AngularFireDatabase, public alertCtrl: AlertController, 
      public actionSheetCtrl: ActionSheetController) {
        //Recuperamos la lista de ejercicios del backend
        this.exercises = af.list('/exercises');
        // console.log ("listado de ejercicios: ", this.exercises);
        
        //Almacenamos la lista de ejercicios en un array
          this.exercises.subscribe( exercises => {
            exercises.forEach(exercise => {
              //console.log("ejercicio: ", exercise);
              this.exerciseList.push(exercise);
              //console.log("listado: ", this.exerciseList);
            });
            //Inicializamos array con los datos iniciales, para utilizar en función de inicialización
            this.loadedExerciseList = this.exerciseList;
            //console.log("listado cargado: ", this.loadedExerciseList);
          });
                         
  }

  initializeExercises(): void {
    this.exerciseList = this.loadedExerciseList;    
    }
  

  getExercises(ev: any){
    // Reset items back to all of the items
    this.initializeExercises();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string then do not filter the items
    if (val && val.trim() != ''){
      //console.log('entro por el if de cadena no vacia', val);
      this.exerciseList = this.exerciseList.filter((exercise) => {
          return (exercise.exercise.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }

  }

  selectedWeight(value){
    console.log('query: ', value);
    if (value == ''){
      console.log('inicializo lista: ', value);
    this.initializeExercises();
    }
    this.exerciseList = this.exerciseList.filter((exercise) => {        
        return (exercise.type.toLowerCase().indexOf("weightlifting") > -1)
    })
  }

  selectedGymnastics(){
    this.initializeExercises();
    this.exerciseList = this.exerciseList.filter((exercise) => {        
        return (exercise.type.toLowerCase().indexOf("gymnastics") > -1)
    })
  }

  selectedEndurance(){
    this.initializeExercises();
    this.exerciseList = this.exerciseList.filter((exercise) => {        
        return (exercise.type.toLowerCase().indexOf("endurance") > -1)
    })
  }

  //ionViewDidLoad() {
  //console.log('ionViewDidLoad SelectExercisesPage');
  //}

}
