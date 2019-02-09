import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusPage } from './bus';
import { MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    BusPage,
  ],
  imports: [
    IonicPageModule.forChild(BusPage),
    MatInputModule,
    MatButtonModule
  ],
})
export class BusPageModule {}
