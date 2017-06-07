import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ToastController  } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NewSessionPage } from '../new-session/new-session';



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
  //variable para almacenar la cadena de búsqueda
  public searchString = '';
  //variable para almacenar el valor del segmento
  public segmentValue = '';
  //Array para almacenar los ejercicios seleccionados
  public selectedExerciseList: any[] = [];
  //Variable para contar el número de ejercicios seleccionados
  public numExercises = 0;
  //Variable para habilitar el botón "siguiente"
  public nextDisabled=true;

  
  constructor(public navCtrl: NavController, public af: AngularFireDatabase, public alertCtrl: AlertController, 
      public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
        //Recuperamos la lista de ejercicios del backend
        this.exercises = af.list('/exercises', {
          query: {
            orderByChild: 'exercise'
          }
        });
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
          console.log("next deshabilitado: ", this.nextDisabled);              
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
          return (exercise.exercise.toLowerCase().indexOf(val.toLowerCase()) > -1 && exercise.type.toLowerCase().indexOf(this.segmentValue) > -1)
      })
    }

  }

  selectedWeight(){
    this.segmentValue = 'weightlifting';
    //console.log("search string: ", this.searchString);
    this.initializeExercises();
    this.exerciseList = this.exerciseList.filter((exercise) => {        
        return (exercise.type.toLowerCase().indexOf("weightlifting") > -1 && exercise.exercise.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1)
    })
  }

  selectedGymnastics(){
    this.segmentValue = 'gymnastics';
    //console.log("search string: ", this.searchString);
    this.initializeExercises();
    this.exerciseList = this.exerciseList.filter((exercise) => {        
        return (exercise.type.toLowerCase().indexOf("gymnastics") > -1 && exercise.exercise.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1)
    })
  }

  selectedEndurance(){
    this.segmentValue = 'endurance';
    //console.log("search string: ", this.searchString);
    this.initializeExercises();
    this.exerciseList = this.exerciseList.filter((exercise) => {        
        return (exercise.type.toLowerCase().indexOf("endurance") > -1 && exercise.exercise.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1)
    })
  }

  selectItem(exerciseId, exerciseName, exerciseType){
    console.log("entro en funcion selectItem");
    
    var item = {
      id: exerciseId,
      name: exerciseName,
      type: exerciseType,
      index: this.numExercises
    };
    this.selectedExerciseList.push(item);
    this.numExercises++;
    console.log("llista de ejercicios seleccionados:", this.selectedExerciseList);
    
  }

  goToNextPage(){
    if(this.numExercises == 0){
      let toast = this.toastCtrl.create({
        message: 'Por favor, selecciona al menos un ejercicio',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      this.navCtrl.push(NewSessionPage, {
        selectedExerciseList: this.selectedExerciseList
      });
    }
  }

  goToPreviousPage(){
  this.navCtrl.pop();
  }

  //ionViewDidLoad() {
  //console.log('ionViewDidLoad SelectExercisesPage');
  //}

}
