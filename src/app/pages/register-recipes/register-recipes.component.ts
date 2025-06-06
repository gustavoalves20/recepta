import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';
import { SnackBarHelper } from '../../utils/snack-bar-helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-recipes',
  standalone: false,
  templateUrl: './register-recipes.component.html',
  styleUrl: './register-recipes.component.scss',
})
export class RegisterRecipesComponent {
  recipeForm!: FormGroup;
  categories: string[] = [];

  private readonly _fb = inject(FormBuilder);
  private readonly _categoryService = inject(CategoryService);
  private readonly _recipeService = inject(RecipeService);
  private readonly _authService = inject(AuthService);
  private readonly _snackbar = inject(MatSnackBar);
  private readonly _router = inject(Router);

  get recipeName(): FormControl {
    return this.recipeForm.get('recipeName') as FormControl;
  }

  get ingredients(): FormControl {
    return this.recipeForm.get('ingredients') as FormControl;
  }

  get preparationMethod(): FormControl {
    return this.recipeForm.get('preparationMethod') as FormControl;
  }

  get preparationTime(): FormControl {
    return this.recipeForm.get('preparationTime') as FormControl;
  }

  get categoriesControl(): FormControl {
    return this.recipeForm.get('categories') as FormControl;
  }

  ngOnInit(): void {
    this.createForm();
    this._categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data.map(cat => cat.name)),
      error: (error) => console.log(error),
    });
  }

  private createForm(): void {
    this.recipeForm = this._fb.group({
      recipeName: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparationMethod: ['', Validators.required],
      preparationTime: ['', Validators.required],
      categories: [[], Validators.required],
    });
  }

  cancel(): void {
    this._router.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const user = this._authService.getUser();
    const authorId = user?.id ?? '';

    const recipeData: any = {
      recipeName: this.recipeName.value,
      ingredients: this.ingredients.value,
      preparationMethod: this.preparationMethod.value,
      preparationTime: this.preparationTime.value,
      authorId: authorId,
      categories: this.recipeForm.value.categories,
    };

    this._recipeService.createRecipe(recipeData).subscribe({
      next: () => {
        SnackBarHelper.showMessage(this._snackbar,'Receita cadastrada com sucesso');
        
        this.recipeForm.reset();

        Object.keys(this.recipeForm.controls).forEach(key => {
        this.recipeForm.get(key)?.setErrors(null);
        this.recipeForm.get(key)?.markAsPristine();
        this.recipeForm.get(key)?.markAsUntouched();
        });
      },
      error: () => {
        SnackBarHelper.showMessage(this._snackbar, 'Ocorreu um erro');
      },
    });
  }
}
