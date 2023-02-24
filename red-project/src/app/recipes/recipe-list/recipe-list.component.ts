import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe("A test recipe", "Simple a test", "https://bit.ly/3SnSwGZ"),
    new Recipe("A test recipe 2", "Simple a test 2", "https://bit.ly/3IQH2ss"),
  ];
}
