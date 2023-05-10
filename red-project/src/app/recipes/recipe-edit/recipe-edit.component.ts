import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) {}
  
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
                'name': new FormControl<string>(ingredient.name, Validators.required),
                'amount': new FormControl<Number>(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^\d*$/),
                ]),
              })
              );
            }
          }
        }
        
        this.recipeForm = new FormGroup({
          'name': new FormControl<string>(recipeName, Validators.required),
          'imagePath': new FormControl<string>(recipeImagePath, Validators.required),
          'description': new FormControl<string>(recipeDescription, Validators.required),
          'ingredients': recipeIngredients,
        });
      }
      
  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void {
    const values = this.recipeForm.value;
    if (this.editMode) {
      this.recipeService.udpateRecipe(this.id, values);
    }
    else {
      this.recipeService.addRecipe(values);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl<string>(null, Validators.required),
        amount: new FormControl<Number>(null, [
          Validators.required,
          Validators.pattern(/^\d*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  get controls(): FormControl[] {
    return (this.recipeForm.get('ingredients') as FormArray<FormControl>)
      .controls;
  }
}
