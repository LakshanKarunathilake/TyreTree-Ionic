import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TyreAddPage } from "./tyre-add";
import {
  MatChipsModule,
  MatSelectModule,
  MatNativeDateModule
} from "@angular/material/";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
  declarations: [TyreAddPage],
  imports: [
    IonicPageModule.forChild(TyreAddPage),
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class TyreAddPageModule {}
