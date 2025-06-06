import { Component, inject } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { SnackBarHelper } from '../../utils/snack-bar-helper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories: string[] = [];

  private readonly _categoryService = inject(CategoryService);
  private readonly _snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(c => c.name);
      },
      error: () => {
        SnackBarHelper.showMessage(this._snackbar, 'Erro ao carregar categorias');
      },
    })
  }
}
