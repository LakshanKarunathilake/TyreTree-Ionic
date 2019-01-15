import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TyreReportPage } from "./tyre-report";
import { MatExpansionModule } from "@angular/material";

@NgModule({
  declarations: [TyreReportPage],
  imports: [IonicPageModule.forChild(TyreReportPage), MatExpansionModule]
})
export class TyreReportPageModule {}
