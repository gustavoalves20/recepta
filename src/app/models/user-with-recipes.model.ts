import { RecipeResponse } from './recipe-response.model';

export interface UserWithRecipes {
  id: string;
  name: string;
  email: string;
  recipe: RecipeResponse;
}
