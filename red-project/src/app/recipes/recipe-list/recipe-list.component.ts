import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'Simple a test', 'https://bit.ly/3SnSwGZ', [
      new Ingredient('egg', 0),
      new Ingredient('tomato', 0),
    ]),
    new Recipe('A test recipe 2', 'Simple a test 2', 'https://bit.ly/3IQH2ss', [
      new Ingredient('onion', 0),
      new Ingredient('avocado', 0),
    ]),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
