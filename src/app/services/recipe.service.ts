import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { RecipeResponse } from '../models/recipe-response.model';
import { UserWithRecipes } from '../models/user-with-recipes.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly _recipesUrl = '/recipes';
  private readonly _recipesBycategory = '/recipes/filter';
  private readonly _httpClient = inject(HttpClient);

  getRecipes(): Observable<RecipeResponse[]> {
    return this._httpClient.get<RecipeResponse[]>(this._recipesUrl);
  }

  createRecipe(recipeData: Recipe): Observable<Recipe> {
    return this._httpClient.post<Recipe>(this._recipesUrl, recipeData);
  }

  updateRecipe(id: string, recipeData: Partial<Recipe>): Observable<Recipe> {
    return this._httpClient.put<Recipe>(`${this._recipesUrl}/${id}`, recipeData);
  }

  deleteRecipe(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this._recipesUrl}/${id}`);
  }

  getRecipesByCategory(category: string): Observable<RecipeResponse[]> {
    let params = new HttpParams().set('category', category);
    return this._httpClient.get<RecipeResponse[]>(this._recipesBycategory, { params });
  }

  getRecipesByUser(userId: string): Observable<Recipe[]> {
    return this._httpClient.get<Recipe[]>(`/users/${userId}/recipes`)
  }

  getUsersWithTheirRecipes(): Observable<UserWithRecipes[]> {
  return this._httpClient.get<UserWithRecipes[]>(this._recipesUrl);
}
}
