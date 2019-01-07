import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ReceivingsPage } from "./receivings";
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
  declarations: [ReceivingsPage],
  imports: [
    IonicPageModule.forChild(ReceivingsPage),
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
export class ReceivingsPageModule {}
