import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as AuthActions from '../../auth/auth-store/auth.actions';
import * as recipeActions from '../../recipes/recipes-store/recipe.actions';

import * as fromApp from 'app/app-store/app.reducers';
import * as fromAuth from '../../auth/auth-store/auth.reducer';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class  HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.authState = this.store.select('userAuth');
    }

    onSave() {
        this.store.dispatch(new recipeActions.StoreRecipe());
    }

    onFetch() {
        this.store.dispatch(new recipeActions.FetchRecipe());
    }

    onLogOut() {
        this.store.dispatch(new AuthActions.LogOut());
    }
}
