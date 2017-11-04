import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ShoppingListRoutingModule
    ],
    exports: [],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    providers: [],
})
export class ShoppingListModule { }
