import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        //  const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.put('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
         this.http.get('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json')
         .map(
            (response: Response) => {
                const recipeData: Recipe[] = response.json();
                for (const recipe of recipeData) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                        console.log(recipe);
                    }
                }
                return recipeData;
            }
         )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}
