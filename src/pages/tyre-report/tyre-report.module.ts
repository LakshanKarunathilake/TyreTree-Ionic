import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TyreReportPage } from "./tyre-report";
import { MatExpansionModule } from "@angular/material";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [TyreReportPage],
  imports: [
    IonicPageModule.forChild(TyreReportPage),
    MatExpansionModule,
    ComponentsModule
  ]
})
export class TyreReportPageModule {}
