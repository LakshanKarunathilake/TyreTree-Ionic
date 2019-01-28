import { NgModule } from "@angular/core";
import { TyreStatusAccordionComponent } from "./tyre-status-accordion/tyre-status-accordion";
import { MatExpansionModule, MatButtonModule } from "@angular/material";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [TyreStatusAccordionComponent],
  imports: [MatExpansionModule, MatButtonModule, CommonModule],
  exports: [TyreStatusAccordionComponent]
})
export class ComponentsModule {}
