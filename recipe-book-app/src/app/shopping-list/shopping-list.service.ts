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

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) {
          return this.ingredients[index];
      }

      addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.ingredientChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
      }

    }
