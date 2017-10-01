import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
         return this.http.put('https://ng4-recipe-book-3d9d9.firebaseio.com/store-recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
         this.http.get('https://ng4-recipe-book-3d9d9.firebaseio.com/get-recipes.json')
         .map(
            (response: Response) => {
                const recipeData: Recipe[] = response.json();
                for (const recipe of recipeData) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
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
