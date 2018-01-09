import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Recipe } from '../../recipes/recipe.model';

import { DataStorageService } from '../../shared/data-storage.service';

import * as AuthActions from '../../auth/auth-store/auth.actions';

import * as fromApp from 'app/app-store/app.reducers';
import * as fromAuth from '../../auth/auth-store/auth.reducer';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class  HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private dataStorageService: DataStorageService,
                private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.authState = this.store.select('userAuth');
    }

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
        this.store.dispatch(new AuthActions.LogOut());
    }
}
