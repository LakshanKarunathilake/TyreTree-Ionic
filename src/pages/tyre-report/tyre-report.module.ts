import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TyreReportPage } from "./tyre-report";
import { MatExpansionModule } from "@angular/material";
import { ComponentsModule } from "../../components/components.module";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [TyreReportPage],
  imports: [
    IonicPageModule.forChild(TyreReportPage),
    MatExpansionModule,
    ComponentsModule,
    MatCardModule
  ]
})
export class TyreReportPageModule {}
