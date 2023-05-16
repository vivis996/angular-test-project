import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

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

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.informUpdate();
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.informUpdate();
  }

  udpateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.informUpdate();
  }
  
  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.informUpdate();
  }

  informUpdate(): void {
    this.recipesChanged.next(this.getRecipes());
  }
}
