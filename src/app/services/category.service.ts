import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _categoriesUrl = '/categories';
  private readonly _httpClient = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(this._categoriesUrl).pipe(take(1));
  }
}
