// import { Ingredient } from '../../shared/ingredient.model';

// import * as ShoppingListActions from './shopping-list.actions';

// export interface AppState {
//     shoppingList: State;
//   }

// export interface State {
// ingredients: Ingredient[];
// }

// const initialState: State = {
//     ingredients: [
//         new Ingredient('Apples', 5),
//         new Ingredient('Carrots', 5),
//         new Ingredient('Potatoes', 7)
//       ]
// };

// export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
// switch (action.type) {
//     case ShoppingListActions.ADD_INGREDIENT:
//         return {
//             ...state,
//             ingredients: [...state.ingredients, action.payload]
//         };
//     default:
//         return state;
//     }
// }
