import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import { RecipeService } from '../recipe.service';
import { AuthService } from 'app/auth/auth.service';

import { Observable, Observer, Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedItem: Recipe;
  id: number;

  constructor(
    private store: Store<any>,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.route.params.
    subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selectedItem = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
      this.store.dispatch(new ShoppingListActions.AddIngredients(this.selectedItem.ingredients));
  }

  onEditRecipe() {
    if (this.authService.token != null) {
      this.router.navigate(['edit'], {relativeTo: this.route});
    } else {
      window.alert('You must be signed in to edit a recipe!');
    }
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
