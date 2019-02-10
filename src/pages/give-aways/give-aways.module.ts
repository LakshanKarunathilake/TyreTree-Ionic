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
import { ComponentsModule } from "../../components/components.module";

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
    MatDividerModule,
    ComponentsModule
  ]
})
export class GiveAwaysPageModule {}
