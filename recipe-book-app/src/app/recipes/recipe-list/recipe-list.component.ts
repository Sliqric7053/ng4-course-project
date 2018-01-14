import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Recipe } from '../recipe.model';

import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';

import { Store } from '@ngrx/store';
import * as fromApp from '../../app-store/app.reducers';
import * as fromAuth from '../../auth/auth-store/auth.reducer';
import * as fromRecipe from '../../recipes/recipes-store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<fromRecipe.State>;

  constructor(private store: Store<fromRecipe.RecipesFeatureState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipeFeature');
  }

  onNewRecipe() {
    let userAuth: Observable<fromAuth.State>;

    userAuth = this.store.select('userAuth').do((state) => {
      return state.authenticated;
    });

    userAuth.take(1).subscribe((state) => {
      state.token ? this.router.navigate(['new'], {relativeTo: this.route}) : window.alert('You must be signed in to create a new recipe!');
    });
  }
}
