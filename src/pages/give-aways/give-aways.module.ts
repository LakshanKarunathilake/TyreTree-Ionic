import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GiveAwaysPage } from "./give-aways";
import {
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatButtonModule,
  MatListModule,
  MatDividerModule
} from "@angular/material";

@NgModule({
  declarations: [GiveAwaysPage],
  imports: [
    IonicPageModule.forChild(GiveAwaysPage),
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ]
})
export class GiveAwaysPageModule {}
