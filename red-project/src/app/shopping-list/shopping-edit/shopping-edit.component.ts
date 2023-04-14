import { Component, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {

  constructor(private slService: ShoppingListService) {}

  onAddItem(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, Number(form.value.amount));
    this.slService.addIngredient(ingredient);
  }
}
