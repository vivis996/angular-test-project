import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { LogginService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;
  
  constructor(private slService: ShoppingListService,
              private loggingService: LogginService,
    ) {}
  
  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
      );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
    }
    
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    onEditItem(index: number): void {
      this.slService.startEditing.next(index);
    }
  }
