import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';
import { RecipeResponse } from '../../models/recipe-response.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Recipe } from '../../models/recipe.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { SnackBarHelper } from '../../utils/snack-bar-helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserWithRecipes } from '../../models/user-with-recipes.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*', display: 'block' })),
      transition('expanded <=> collapsed', animate('300ms ease')),
    ]),
  ],
})
export class HomeComponent {
  totalCategories: number = 0;
  totalRecipes: number = 0;
  recipesResponse: RecipeResponse[] = [];
  categories: string[] = [];
  categorySelected: string = '';
  userRecipes: any[] = [];

  private readonly _categoryService = inject(CategoryService);
  private readonly _recipesService = inject(RecipeService);
  private readonly _dialog = inject(MatDialog);
  private readonly _snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadCategoryService();
    this.loadUserWithRecipes();
  }

  openDetails(recipesResponse: Recipe | RecipeResponse) {
    this._dialog.open(DialogComponent, {
      data: {
        ...recipesResponse,
        categories: Array.isArray(recipesResponse.categories)
          ? recipesResponse.categories.join(',\n')
          : '',
      },
      width: '1200px',
    });
  }

  onCategoryChange(): void {
    if (!this.categorySelected) {
      this.loadUserWithRecipes();
      return;
    }

    this._recipesService.getRecipesByCategory(this.categorySelected).subscribe({
      next: (data) => {
        const enriched = data.map((recipe) => ({
          ...recipe,
          name: recipe.author,
          email: recipe.email,
        }));

        this.userRecipes = [...enriched];
        this.totalRecipes = enriched.length;
      },
      error: () => {
        SnackBarHelper.showMessage(
          this._snackbar,
          'Erro ao carregar receitas por categorias'
        );
      },
    });
  }

  loadCategoryService() {
    this._categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map((cat) => cat.name);
        this.totalCategories = data.length;
      },
      error: () => {
        SnackBarHelper.showMessage(
          this._snackbar,
          'Erro ao carregar categorias'
        );
      },
    });
  }

  loadUserWithRecipes() {
    this._recipesService.getUsersWithTheirRecipes().subscribe({
      next: (data) => {
        console.log('API response:', data);

        const flattened = data
          .filter((user) => !!user.recipe)
          .map((user) => ({
            recipeName: user.recipe.recipeName,
            preparationTime: user.recipe.preparationTime,
            ingredients: user.recipe.ingredients,
            preparationMethod: user.recipe.preparationMethod,
            categories: user.recipe.categories,
            id: user.recipe.id,
            authorId: user.recipe.authorId,
            name: user.name,
            email: user.email,
          }));

        console.log('Flattened:', flattened);

        this.userRecipes = [...flattened];
        this.totalRecipes = flattened.length;
      },
      error: () => {
        SnackBarHelper.showMessage(this._snackbar, 'Erro ao carregar receitas');
      },
    });
  }
}
