import { Component, OnDestroy, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  suscription: Subscription;
  editMode = false;
  editItemIndex: number;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.suscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
      }
    );
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, Number(form.value.amount));
    this.slService.addIngredient(ingredient);
  }
}
