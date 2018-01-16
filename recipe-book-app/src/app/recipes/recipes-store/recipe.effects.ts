import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as recipeActions from './recipe.actions';
import * as fromRecipe from '../recipes-store/recipe.reducers';
import { Recipe } from 'app/recipes/recipe.model';

@Injectable()
export class RecipeEffects {
    recipeState: Observable<fromRecipe.State>;
    @Effect()
    recipeFetch = this.actions$
        .ofType(recipeActions.FETCH_RECIPE)
        .switchMap((ation: recipeActions.FetchRecipe) => {
            return this.httpClient.get<Recipe[]>('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json', {
                observe: 'body',
                responseType: 'json'
              });
        })
        .map(
            (recipes) => {
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: recipeActions.SET_RECIPES,
                    payload: recipes
                };
            });

    @Effect({dispatch: false})
    recipeStorage = this.actions$
    .ofType(recipeActions.STORE_RECIPE)
    .withLatestFrom(this.store.select('recipeFeature'))
    .switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json', state.recipes, {
            reportProgress: true
        });
        console.table('specialRecipe', state.recipes);
        return this.httpClient.request(req);
    });

    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromRecipe.RecipesFeatureState>) {}
}