import { NgModule } from "@angular/core";
import { TyreStatusAccordionComponent } from "./tyre-status-accordion/tyre-status-accordion";
import { MatExpansionModule, MatButtonModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { QuickFabComponent } from './quick-fab/quick-fab';
import { IonicModule } from "ionic-angular";
@NgModule({
  declarations: [TyreStatusAccordionComponent,
    QuickFabComponent],
  imports: [MatExpansionModule, MatButtonModule, CommonModule,IonicModule],
  exports: [TyreStatusAccordionComponent,
    QuickFabComponent]
})
export class ComponentsModule {}
