import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../services/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private urlDatabaseFirebase: string = 'https://angular-the-complete-gui-3c98a-default-rtdb.firebaseio.com/';
  private endPoint: string = 'recipes.json';
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.urlDatabaseFirebase + this.endPoint, recipes)
      .subscribe(response =>  console.log(response));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.urlDatabaseFirebase + this.endPoint)
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }), tap(recipes => this.recipeService.setRecipes(recipes)));
  }
}