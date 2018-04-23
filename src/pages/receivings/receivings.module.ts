import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceivingsPage } from './receivings';

@NgModule({
  declarations: [
    ReceivingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceivingsPage),
  ],
})
export class ReceivingsPageModule {}
