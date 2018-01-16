import { SharedModule } from '../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

import { recipeReducer } from '../recipes/recipes-store/recipe.reducers';
import { RecipeEffects } from '../recipes/recipes-store/recipe.effects';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RecipesRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipeFeature', recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ],
    exports: [],
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeItemComponent,
    ],
    providers: [],
})
export class RecipesModule { }
