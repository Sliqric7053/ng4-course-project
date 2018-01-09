import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as firebase from 'firebase';

import * as fromApp from '../app-store/app.reducers';
import * as AuthActions from '../auth/auth-store/auth.actions';

@Injectable()
export class AuthService {

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
        ) { }


    logOut() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.LogOut());
        this.router.navigate(['/']);
    }

}
