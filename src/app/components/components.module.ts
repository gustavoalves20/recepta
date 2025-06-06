import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { RecipeTableComponent } from './recipe-table/recipe-table.component';
import { DialogComponent } from './dialog/dialog.component';
import { PipeModule } from '../pipes/pipes.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SelectComponent } from './select/select.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';


@NgModule({
  declarations: [
    InputComponent,
    SidebarComponent,
    ButtonComponent,
    CardComponent,
    RecipeTableComponent,
    DialogComponent,
    ToolbarComponent,
    SelectComponent,
    EditRecipeComponent,
    SelectMultipleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterLink,
    RouterLinkActive,
    PipeModule
  ],
  exports: [
    InputComponent,
    SidebarComponent,
    ButtonComponent,
    CardComponent,
    RecipeTableComponent,
    ToolbarComponent,
    SelectComponent,
    EditRecipeComponent,
    SelectMultipleComponent
  ],
})
export class ComponentsModule {}
