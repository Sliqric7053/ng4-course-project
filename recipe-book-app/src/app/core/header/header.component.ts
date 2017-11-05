import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { Recipe } from 'app/recipes/recipe.model';

import { DataStorageService } from 'app/shared/data-storage.service';
import { RecipeService } from 'app/recipes/recipe.service';
import { AuthService } from 'app/auth/auth.service';

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
