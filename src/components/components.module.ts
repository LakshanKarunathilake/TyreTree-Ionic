import { NgModule } from "@angular/core";
import { TyreStatusAccordionComponent } from "./tyre-status-accordion/tyre-status-accordion";
import { MatExpansionModule } from "@angular/material";
@NgModule({
  declarations: [TyreStatusAccordionComponent],
  imports: [MatExpansionModule],
  exports: [TyreStatusAccordionComponent]
})
export class ComponentsModule {}
