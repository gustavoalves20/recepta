export interface RecipeResponse {
  id?: string;
  recipeName: string;
  ingredients: string;
  preparationMethod: string;
  preparationTime: number;
  categories: string[];
  authorId?: string;
  author?: string;
  email?: string;
}
