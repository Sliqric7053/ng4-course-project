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

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            user => {
                this.store.dispatch(new AuthActions.SignUp());
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => {
                        this.store.dispatch(new AuthActions.SetToken(token));
                    }
                );
            }
        )
        .catch(
            (error) => console.log(error)
        );
    }

    logOut() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.LogOut());
        this.router.navigate(['/']);
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            (response) => {
                this.store.dispatch(new AuthActions.SignIn());
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => {
                        this.store.dispatch(new AuthActions.SetToken(token));
                    }
                );
            }
        )
        .catch(
            (error) => console.log(error)
        );
    }
}
