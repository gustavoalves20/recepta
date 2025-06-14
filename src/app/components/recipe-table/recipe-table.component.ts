import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { RecipeResponse } from '../../models/recipe-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Recipe } from '../../models/recipe.model';
import { MatSort } from '@angular/material/sort';
import { UserWithRecipes } from '../../models/user-with-recipes.model';

@Component({
  selector: 'app-recipe-table',
  standalone: false,
  templateUrl: './recipe-table.component.html',
  styleUrl: './recipe-table.component.scss',
})
export class RecipeTableComponent {
  selected: string = '';
  columns: string[] = [];
  dataSource = new MatTableDataSource<RecipeResponse | Recipe>();

  @Input()
  dataRecipeResponse: RecipeResponse[] = [];
  @Input()
  dataRecipe: Recipe[] = [];
  @Input() showAuthorInfo = true;

  @Output()
  onEdit = new EventEmitter<Recipe>();
  @Output()
  onDelete = new EventEmitter<Recipe>();
  @Output()
  onView = new EventEmitter<RecipeResponse | Recipe>();

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'author':
          return item.name.toLowerCase();
        case 'email':
          return item.email.toLowerCase();
        case 'recipeName':
          return (
            item.recipes?.[0]?.recipeName?.toLowerCase() ||
            item.recipeName ||
            ''
          );
        case 'preparationTime':
          return item.recipes?.[0]?.preparationTime || item.preparationTime;
        default:
          return '';
      }
    };
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.dataRecipe;

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    this.columns = this.showAuthorInfo
      ? [
          'select',
          'author',
          'email',
          'recipeName',
          'preparationTime',
          'details',
        ]
      : ['recipeName', 'preparationTime', 'details', 'actions'];
  }

  emitRecipe(element: any): void {
    this.onView.emit(element);
  }
}
