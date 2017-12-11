import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from 'app/auth/auth.service';
import { Injectable } from '@angular/core';

import * as fromApp from '../app-store/app.reducers';
import * as fromAuth from '../auth/auth-store/auth.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted', req);
        return this.store.select('userAuth')
        .switchMap((authState: fromAuth.State) => {
            const copiedReq = req.clone({
                params: req.params.set('auth', authState.token)});
                return next.handle(copiedReq);
        });
    }
}
