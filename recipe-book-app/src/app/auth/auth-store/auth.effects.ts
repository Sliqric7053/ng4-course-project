import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignUp) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
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
    .map((action: AuthActions.TrySignUp) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));      // .catch(error => {
      //   console.log('errrrr', error)
      //   throw error;
      // });
      // .catch(error => Observable.of(new AuthActions.SignInErrorAction({ error: error })));
      // .catch(error => Observable.of(console.log('errrrrror', error)));
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

  @Effect({ dispatch: false })
  authLogout = this.actions$
    .ofType(AuthActions.LOG_OUT)
    .do(() => {
      this.router.navigate(['/']);
    });

  constructor(private actions$: Actions, private router: Router) {
  }
}





// import { Injectable } from '@angular/core';
// import { Effect, Actions } from '@ngrx/effects';
// import * as firebase from 'firebase';

// import * as AuthActions from '../auth-store/auth.actions';
// import { fromPromise } from 'rxjs/observable/fromPromise';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthEffects {

//     @Effect()
//     authSignup = this.actions$
//         .ofType(AuthActions.TRY_SIGNUP)
//         .map((action: AuthActions.TrySignUp) => {
//             return action.payload;
//         })
//         .switchMap((authData: {username: string, password: string}) => {
//             return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
//         })
//         .switchMap(() => {
//             return fromPromise(firebase.auth().currentUser.getIdToken());
//         })
//         .mergeMap((token: string) => {
//             this.router.navigate(['/']);
//             return [
//                 {
//                     type: AuthActions.SIGN_UP
//                 },
//                 {
//                     type: AuthActions.SET_TOKEN,
//                     payload: token
//                 }
//             ];
//         });

//     @Effect()
//     authSignin = this.actions$
//     .ofType(AuthActions.TRY_SIGNIN)
//     .map((action: AuthActions.TrySignIn) => {
//         return action.payload;
//     })
//     .switchMap((authData: {username: string, password: string}) => {
//         return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
//     })
//     .switchMap(() => {
//         return fromPromise(firebase.auth().currentUser.getIdToken());
//     })
//     .mergeMap((token: string) => {
//         this.router.navigate(['/']);
//         return [
//             {
//                 type: AuthActions.SIGN_IN
//             },
//             {
//                 type: AuthActions.SET_TOKEN,
//                 payload: token
//             }
//         ];
//     });

//     @Effect({dispatch: false})
//     authLogOut = this.actions$
//     .ofType(AuthActions.LOG_OUT)
//     .switchMap(() => {
//         this.router.navigate(['/']);
//         return fromPromise(firebase.auth().signOut());
//     });

//     constructor(private actions$: Actions, private router: Router) {}
// };
