import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService) {}

    storeRecipes() {

        // standard "put" request (doesnt not return upload/download progress)
        // return this.httpClient.put('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json',
        // this.recipeService.getRecipes(), {
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        // });


        // bespoke "put" request => returns upload/download progress (loaded / total = progress bar)
        const req = new HttpRequest('PUT', 'https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            reportProgress: true
        });
        return this.httpClient.request(req);
    }

    fetchRecipes() {

         this.httpClient.get<Recipe[]>('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
          })
            .map(
                (recipes) => {
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                })
                .subscribe(
                    (recipes: Recipe[]) => {
                        this.recipeService.setRecipes(recipes);
                });
    }
}