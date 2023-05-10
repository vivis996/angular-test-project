import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log('Edit mode: ' + this.editMode);
        this.initForm();
      }
      );
    }
    
    private initForm(): void {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray([]);

      if (this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl<string>(ingredient.name),
                'amount': new FormControl<Number>(ingredient.amount),
              })
            );
          }
        }
      }
      
      this.recipeForm = new FormGroup({
        'name': new FormControl<string>(recipeName),
        'imagePath': new FormControl<string>(recipeImagePath),
        'description': new FormControl<string>(recipeDescription),
        'ingredients': recipeIngredients,
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm.value);
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push([
      new FormGroup({
        'name': new FormControl<string>(null),
        'amount': new FormControl<Number>(null),
      })
    ]);
  }
  
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
