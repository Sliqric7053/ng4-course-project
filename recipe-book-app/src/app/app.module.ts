import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

import { Recipe } from './recipes/recipe.model';

import { AppReducers } from '../app/app-store/app.reducers';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AuthEffects } from './auth/auth-store/auth.effects';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
