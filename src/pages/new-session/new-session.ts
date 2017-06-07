import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { SelectExercisesPage } from '../select-exercises/select-exercises';
import { WodModel } from '../../models/wod-model';


@IonicPage()
@Component({
  selector: 'page-new-session',
  templateUrl: 'new-session.html',
})
export class NewSessionPage {
public exerciseList: any[] = [];
public todayDate = new Date().toISOString();
//Objetos para almacenar la información de la sesión
public sessionObject = new WodModel ('',false,'',false,'',0,0, this.exerciseList);
//COMENTARIO OSCAR: crear objeto tipo wodmodel simple, y un array vacío
//posteriormente crearemos instancias del obejto wodmodel que iremos añadiendo al array


//variable para almacenar el objetivo de cada wod
public wodGoal: string;
//variable para almacenar el número de wods que componen la sesión
public numWods = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    console.log("NavParameters: ", navParams);
    this.exerciseList = navParams.get('selectedExerciseList');
    //this.sessionObject[0].rounds.push(this.exerciseList);
    this.sessionObject.goal='amrap';
    console.log("NavParametersl loaded: ", this.exerciseList);
    console.log("session object: ", this.sessionObject);
  }


  selectGoal() {
    let radioOpen = true;
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecciona Objetivo');

    alert.addInput({
      type: 'radio',
      label: 'For Time',
      value: 'time'
    }); 

    alert.addInput({
      type: 'radio',
      label: 'AMRAP',
      value: 'amrap'
    }); 

    alert.addInput({
      type: 'radio',
      label: 'EMOM',
      value: 'emom'
    }); 

    alert.addInput({
      type: 'radio',
      label: 'Reps/Ladder',
      value: 'reps'
    }); 

    alert.addInput({
      type: 'radio',
      label: 'Rounds',
      value: 'rounds'
    }); 

    alert.addInput({
      type: 'radio',
      label: 'Fuerza',
      value: 'fuerza'
    }); 

    alert.addInput({
      type: 'radio',
      label: 'Estaciones',
      value: 'estaciones'
    }); 

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        radioOpen = false;
        this.wodGoal = data;
        this.navCtrl.push(SelectExercisesPage);
      }
    });

    alert.present().then(() => {
      radioOpen = true;
    });

  }
  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad NewSessionPage');
  //}

}
