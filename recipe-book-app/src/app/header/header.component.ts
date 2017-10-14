import { AuthService } from '../auth/auth.service';
import { Response } from '@angular/http';
import { Component } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

import { Recipe } from 'app/recipes/recipe.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class  HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    onSave() {
        this.dataStorageService.storeRecipes()
        .subscribe(
            (response: Response) => {
                const data = response.json();
                console.log(data);
            },
        (error) => console.log(error)
        );
    }

    onFetch() {
        this.dataStorageService.fetchRecipes();
    }

    onLogOut() {
        this.authService.logOut();
    }
}
