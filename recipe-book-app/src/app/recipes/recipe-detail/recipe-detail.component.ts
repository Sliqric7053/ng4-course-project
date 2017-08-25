import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedItem: Recipe;

  constructor(private  shoppingListService: ShoppingListService) {}

  ngOnInit() {
  }

  onAddToShoppingList() {
    this.selectedItem.ingredients.forEach(ingredient => {
      this.shoppingListService.addIngredient(ingredient);
    });
  }
}
