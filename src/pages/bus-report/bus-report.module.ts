import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusReportPage } from './bus-report';
import { ComponentsModule } from '../../components/components.module';
import {  MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    BusReportPage,
  ],
  imports: [
    IonicPageModule.forChild(BusReportPage),
    ComponentsModule,
    MatInputModule,
  ],
 
  
})
export class BusReportPageModule {}
