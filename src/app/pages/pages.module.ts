import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RegisterRecipesComponent } from './register-recipes/register-recipes.component';
import { CategoriesComponent } from './categories/categories.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MyRecipesComponent,
    RegisterRecipesComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    MatSelectModule
  ],
  exports: [LoginComponent, RegisterComponent, HomeComponent, MatSelectModule],
})
export class PagesModule {}
