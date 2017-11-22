import { Subject } from 'rxjs/Rx';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Carrots', 5),
        new Ingredient('Potatoes', 7)
      ];

      getIngredient(index: number) {
          return this.ingredients[index];
      }

      getIngredients() {
          return this.ingredients.slice();
      }

      // addIngredient(newIngredient: Ingredient) {
      //   this.ingredients.push(newIngredient);
      //   this.ingredientChanged.next(this.ingredients.slice());
      // } REPLACED BY: this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
      }
    }
