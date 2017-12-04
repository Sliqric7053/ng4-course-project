import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromUserAuth from '../auth/auth-store/auth.reducer';

export interface AppState {
    shoppingList: fromShoppingList.State;
    userAuth: fromUserAuth.State;
  };

export const AppReducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  userAuth: fromUserAuth.authReducer
};
