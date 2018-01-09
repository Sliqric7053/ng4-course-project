import { Subscription, Observable } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'app/auth/auth.service';

import { Store } from '@ngrx/store';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../app-store/app.reducers';
import * as fromAuth from '../../auth/auth-store/auth.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    );
    this.recipes = this.recipeService.getRecipes();
    // this.store.dispatch(new shoppingListActions.ADD_INGREDIENTS;
  }

  onNewRecipe() {
    let userAuth: Observable<fromAuth.State>;

    userAuth = this.store.select('userAuth').do((state) => {
      return state.authenticated;
    });

    userAuth.take(1).subscribe((state) => {
      state.token ? this.router.navigate(['new'], {relativeTo: this.route}) : window.alert('You must be signed in to create a new recipe!')
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
