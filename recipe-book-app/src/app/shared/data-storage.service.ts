import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();

        // standard "put" request (doesnt not return upload/download progress)
        // return this.httpClient.put('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json',
        // this.recipeService.getRecipes(), {
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        // });


        // bespoke "put" request => returns upload/download progress (loaded / total = progress bar)
        const req = new HttpRequest('PUT', 'https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            reportProgress: true, params: new HttpParams().set('auth', token)
        });
        return this.httpClient.request(req);
    }

    fetchRecipes() {
        const token = this.authService.getToken();

         this.httpClient.get<Recipe[]>('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json', {
            params: new HttpParams().set('auth', token)
          }
        )
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