import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { BusAddPage } from "./bus-add";
import { MatSelectModule, MatNativeDateModule } from "@angular/material/";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [BusAddPage],
  imports: [
    IonicPageModule.forChild(BusAddPage),
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatExpansionModule
  ]
})
export class BusAddPageModule {}
