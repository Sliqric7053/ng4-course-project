import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        // tslint:disable-next-line:max-line-length
        return this.http.put('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();

         this.http.get('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json?auth=' + token)
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
