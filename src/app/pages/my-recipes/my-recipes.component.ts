import { Component, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarHelper } from '../../utils/snack-bar-helper';
import { AuthService } from '../../services/auth.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeResponse } from '../../models/recipe-response.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EditRecipeComponent } from '../../components/edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-my-recipes',
  standalone: false,
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss',
})
export class MyRecipesComponent {
  recipes: Recipe[] = [];

  private readonly _recipeService = inject(RecipeService);
  private readonly _authService = inject(AuthService);
  private readonly _snackbar = inject(MatSnackBar);
  private readonly _dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadRecipes();
  }

  editRecipe(recipe: Recipe): void {
    const dialogRef = this._dialog.open(EditRecipeComponent, {
      data: recipe,
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe(saved => {
      if (saved) {
        this.loadRecipes();
        SnackBarHelper.showMessage(this._snackbar, 'Receita atualizada com suceso');
      }
    });
  }

  openDetails(recipe: RecipeResponse | Recipe) {
    this._dialog.open(DialogComponent, {
      data: recipe,
      width: '1200px',
    });
  }

  deleteRecipe(recipe: Recipe): void {
    this._recipeService.deleteRecipe(recipe.id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(r => r.id !== recipe.id);
        SnackBarHelper.showMessage(this._snackbar, 'Receita excluída com suceso');
      },
      error: () => {
        SnackBarHelper.showMessage(this._snackbar, 'Erro ao excluir a receita');
      },
    })
  }

  loadRecipes() {
    const user = this._authService.getUser();

    if (user) {
      this._recipeService.getRecipesByUser(user.id).subscribe({
        next: (data) => {
          this.recipes = data;
        },
        error: () => {
          SnackBarHelper.showMessage(this._snackbar, 'Erro ao carregar as receitas')
        },
      });
    }
  }
}
