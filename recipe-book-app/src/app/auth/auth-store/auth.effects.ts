import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as firebase from 'firebase';

import * as AuthActions from '../auth-store/auth.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignUp) => {
            return action.payload;
        })
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: AuthActions.SIGN_UP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        });

    @Effect()
    authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignIn) => {
        return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
            {
                type: AuthActions.SIGN_IN
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }
        ];
    });

    constructor(private actions$: Actions, private router: Router) {}
};
