import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TyrePage } from './tyre';

@NgModule({
  declarations: [
    TyrePage,
  ],
  imports: [
    IonicPageModule.forChild(TyrePage),
  ],
})
export class TyrePageModule {}
