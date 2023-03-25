import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'Simple a test', 'https://bit.ly/3SnSwGZ', [
      new Ingredient('Egg', 2),
      new Ingredient('Tomato', 1),
    ]),
    new Recipe('A test recipe 2', 'Simple a test 2', 'https://bit.ly/3IQH2ss', [
      new Ingredient('Onion', 1),
      new Ingredient('Avocado', 3),
    ]),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }
}