import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppiListActions from './shopping-list.action';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Carrots', 5),
        new Ingredient('Potatoes', 7)
      ]
};

export function shoppingListReducer(state = initialState, action: ShoppiListActions.ShoppiListActions) {
switch (action.type) {
    case ShoppiListActions.ADD_INGREDIENT:
        return {
            ...state,
            ingredients: [...state.ingredients, action]
        };
    default:
        return state;
    }
}
