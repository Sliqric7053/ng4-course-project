import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRecipe from '../../recipes/recipes-store/recipe.reducers';
import * as fromAuth from '../../auth/auth-store/auth.reducer';

import { AuthActions } from 'app/auth/auth-store/auth.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as recipeActions from '../recipes-store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;
  authState: Observable<fromAuth.State>;

  constructor(
    private store: Store<fromRecipe.RecipesFeatureState>,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipeFeature');
        }
      );
    this.authState = this.store.select('userAuth');
  }

  onAddToShoppingList() {
    this.store.select('recipeFeature')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients)
        );
      });
  }

  onEditRecipe() {
    this.authState
      .take(1)
      .subscribe((state) => {
        state.token ?
          (this.router.navigate(['edit'], { relativeTo: this.route })) :
          (window.alert('You must be signed in to edit a recipe!'));
      });
  }

  onDeleteRecipe() {
    this.store.dispatch(new recipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
