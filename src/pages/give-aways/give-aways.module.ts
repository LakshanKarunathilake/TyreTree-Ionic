import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiveAwaysPage } from './give-aways';

@NgModule({
  declarations: [
    GiveAwaysPage,
  ],
  imports: [
    IonicPageModule.forChild(GiveAwaysPage),
  ],
})
export class GiveAwaysPageModule {}
