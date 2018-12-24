import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusAddPage } from './bus-add';

@NgModule({
  declarations: [
    BusAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BusAddPage),
  ],
})
export class BusAddPageModule {}
