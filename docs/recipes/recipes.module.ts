import { SharedModule } from '../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RecipesRoutingModule,
        SharedModule
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
