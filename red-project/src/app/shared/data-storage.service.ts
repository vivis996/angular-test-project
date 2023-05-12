import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../services/recipe.service";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private urlDatabaseFirebase: string = 'https://angular-the-complete-gui-3c98a-default-rtdb.firebaseio.com/';
  private endPoint: string = 'recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.urlDatabaseFirebase + this.endPoint, recipes)
      .subscribe(response =>  console.log(response));
  }
}