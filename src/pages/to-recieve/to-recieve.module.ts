import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToRecievePage } from './to-recieve';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ToRecievePage,
  ],
  imports: [
    IonicPageModule.forChild(ToRecievePage),
    ComponentsModule
  ],
})
export class ToRecievePageModule {}
