import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TyreAddPage } from './tyre-add';

@NgModule({
  declarations: [
    TyreAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TyreAddPage),
  ],
})
export class TyreAddPageModule {}
