import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewSessionPage } from './new-session';

@NgModule({
  declarations: [
    NewSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(NewSessionPage),
  ],
  exports: [
    NewSessionPage
  ]
})
export class NewSessionPageModule {}
