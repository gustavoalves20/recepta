import { NgModule } from "@angular/core";
import { RecipesPipe } from "./recipes.pipe";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [RecipesPipe],
  imports: [CommonModule],
  exports: [RecipesPipe],
})
export class PipeModule {}