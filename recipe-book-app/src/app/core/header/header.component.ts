import { Component } from '@angular/core';

import { Recipe } from '../../recipes/recipe.model';

import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class  HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService,
                public authService: AuthService) {}

    onSave() {
        this.dataStorageService.storeRecipes()
        .subscribe(
            (response) => {
                console.log(response);
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
