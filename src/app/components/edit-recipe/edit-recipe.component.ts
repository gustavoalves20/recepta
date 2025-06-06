import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeResponse } from '../../models/recipe-response.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-recipe',
  standalone: false,
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent {
  form!: FormGroup;
  categories: string[] = [];

  public data: RecipeResponse = inject(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<EditRecipeComponent>);
  private readonly _recipeService = inject(RecipeService);
  private readonly _categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.form = this._fb.group({
      recipeName: [this.data.recipeName],
      ingredients: [this.data.ingredients],
      preparationMethod: [this.data.preparationMethod],
      preparationTime: [this.data.preparationTime],
      categories: [this.data.categories || []],
    });
    this.loadCategories();
  }

  get recipeName(): FormControl {
    return this.form.get('recipeName') as FormControl;
  }
  
  get ingredients(): FormControl {
    return this.form.get('ingredients') as FormControl;
  }

  get preparationMethod(): FormControl {
    return this.form.get('preparationMethod') as FormControl;
  }

  get preparationTime(): FormControl {
    return this.form.get('preparationTime') as FormControl;
  }

  get categoriesControl(): FormControl {
    return this.form.get('categories') as FormControl;
  }

  private loadCategories(): void {
    this._categoryService.getCategories().subscribe(cat => {
      this.categories = cat.map(c => c.name);
    })
  }

  onCategoryChange(selected: string): void {
    this.categoriesControl.setValue(selected);
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const updateRecipe: Recipe = {
      ...this.data,
      ...this.form.value,
    };

    this._recipeService.updateRecipe(updateRecipe.id, updateRecipe).subscribe(() => {
      this._dialogRef.close(true);
    });
  }
}
