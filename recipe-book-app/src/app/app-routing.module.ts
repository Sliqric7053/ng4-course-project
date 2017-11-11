import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './core/homepage/homepage.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
