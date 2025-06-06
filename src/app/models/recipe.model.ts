export interface Recipe {
  id: string;
  recipeName: string;
  ingredients: string;
  preparationMethod: string;
  authorID: string;
  preparationTime: string;
  categories: string[];
}
