import { Action } from '@ngrx/store';

export const SIGN_UP = 'SIGN_UP';

export class SignUp implements Action {
    readonly type =  SIGN_UP;
    constructor(public payload) {}
};

export const SIGN_IN = 'SIGN_IN';

export class SignIn implements Action {
    readonly type = SIGN_IN;
    constructor(public payload) {}
};
