import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'Simple a test', 'https://bit.ly/3SnSwGZ', [
      new Ingredient('egg', 0),
      new Ingredient('tomato', 0),
    ]),
    new Recipe('A test recipe 2', 'Simple a test 2', 'https://bit.ly/3IQH2ss', [
      new Ingredient('onion', 0),
      new Ingredient('avocado', 0),
    ]),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
