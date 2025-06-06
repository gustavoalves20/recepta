import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { MyRecipesComponent } from './pages/my-recipes/my-recipes.component';
import { RegisterRecipesComponent } from './pages/register-recipes/register-recipes.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    title: 'Home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'register-recipes',
    title: 'Cadastrar receitas',
    canActivate: [AuthGuard],
    component: RegisterRecipesComponent,
  },
  {
    path: 'my-recipes',
    title: 'Minhas receitas',
    canActivate: [AuthGuard],
    component: MyRecipesComponent,
  },
  {
    path: 'my-categories',
    title: 'Categorias',
    canActivate: [AuthGuard],
    component: CategoriesComponent,
  },
  {
    path: '**',
    title: 'Not found',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
