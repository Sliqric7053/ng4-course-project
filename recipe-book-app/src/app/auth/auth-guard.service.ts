import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app.reducers';
import * as fromAuth from '../auth/auth-store/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromApp.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('userAuth').map((authState: fromAuth.State) => {
            return authState.authenticated;
        });
    }
}
