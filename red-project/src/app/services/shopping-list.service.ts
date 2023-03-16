import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.addIngredients([ingredient]);
  }

  addIngredients(ingredients: Ingredient[]): void {
    const response = this.validateNotRepeatIngredients(ingredients);
    if (response.length > 0) {
      this.ingredients.push(...response);
    }
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  validateNotRepeatIngredients(ingredients: Ingredient[]): Ingredient[] {
    let ingredientsValidated: Ingredient[] = [];

    for (let ingredient of ingredients) {
      let repeat = false;
      for (let [i, ingredientSaved] of this.ingredients.entries()) {
        if (ingredientSaved.name === ingredient.name) {
          repeat = true;
          this.ingredients[i] = new Ingredient(ingredientSaved.name, ingredient.amount + ingredientSaved.amount);
          break;
        }
      }
      if (!repeat) {
        ingredientsValidated.push(ingredient);
      }
    }

    return ingredientsValidated;
  }
}
