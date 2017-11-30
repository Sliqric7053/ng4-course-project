import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromUserAuth from '../shopping-list/store/shopping-list.reducer';


export interface AppState {
    shoppingList: fromShoppingList.State;
    userAuth: fromUserAuth.State;
  };
