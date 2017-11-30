import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredietIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Carrots', 5),
        new Ingredient('Potatoes', 7)
      ],
      editedIngredient: null,
      editedIngredietIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        };
    case ShoppingListActions.ADD_INGREDIENTS:
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload]
        };
    case ShoppingListActions.UPDATE_INGREDIENT:
    const ingredient = state.ingredients[state.editedIngredietIndex];
    console.log('state.ingredients[action.payload.index]', ingredient);
    const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
    };
    const ingredients = [...state.ingredients];
    ingredients[state.editedIngredietIndex] = updatedIngredient;
        return {
            ...state,
            ingredients: ingredients,
            editedIngredient: null,
            editedIngredietIndex: -1
        };
    case ShoppingListActions.DELETE_INGREDIENT:
    const oldIngredients = [...state.ingredients];
    oldIngredients.splice(state.editedIngredietIndex   , 1);
        return {
            ...state,
            ingredients: oldIngredients,
            editedIngredient: null,
            editedIngredietIndex: -1
        };
        case ShoppingListActions.START_EDIT:
        const editedIngredient = {...state.ingredients[action.payload]};
        return {
            ...state,
            editedIngredient: editedIngredient,
            editedIngredietIndex: action.payload
        };
        case ShoppingListActions.STOP_EDIT:
        return {
            ...state,
            editedIngredient: null,
            editedIngredietIndex: -1
        };
    default:
        return state;
    }
}
