import { RegisterModule } from './auth/register.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RecipesModule } from './recipes/recipes.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { Recipe } from './recipes/recipe.model';

import { DataStorageService } from './shared/data-storage.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthGuard } from 'app/auth/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    RecipesModule,
    ShoppingListModule,
    RegisterModule
  ],
  providers: [RecipeService, ShoppingListService, DataStorageService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
