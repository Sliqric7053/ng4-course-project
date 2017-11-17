import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();

        return this.httpClient.put('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json?auth=' + token,
        this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();

         this.httpClient.get<Recipe[]>('https://ng4-recipe-book-3d9d9.firebaseio.com/recipes.json?auth=' + token)
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
