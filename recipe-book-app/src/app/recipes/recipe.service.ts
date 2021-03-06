import { Subject } from 'rxjs/Rx';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
      // @To-Do: Add loggerService to log the instantiation of each components
      recipesChanged = new Subject<Recipe[]>();

 private recipes: Recipe[] = [
    new Recipe('Spicy Wrap', 'Try this casual hand-held-food entertaining idea, with..',
     'https://www.spar.co.za/getattachment/5d2a2985-ee85-421a-8ae3-3488de83d49f/SPICY-WRAPS.aspx', [
      new Ingredient('Freshline wraps', 2),
      new Ingredient('Large red onion', 1),
      new Ingredient('Red chillies', 2)
     ]),
    new Recipe('Eggs In Summer Sauce', 'An economical way to make use of protein-rich eggs..',
     'https://www.spar.co.za/getattachment/5fa48ad2-da84-40b7-a810-3079ad42fa58/EGGS-IN-SUMMER-SAUCE.aspx', [
      new Ingredient('Hard-boiled eggs', 8),
      new Ingredient('Celery sticks', 3),
      new Ingredient('Hard-cling peaches', 2)
     ]),
    new Recipe('Thai-Style Crab Balls', 'Crab sticks are used in this recipe to give you crab..',
     'https://www.spar.co.za/getattachment/f2a1feca-b600-4fe9-b2ff-f5e30e1a49d5/THAI-STYLE-CRAB-BALLS.aspx', [
      new Ingredient('Crab flavoured sticks', 1),
      new Ingredient('Fish sauce', 10),
      new Ingredient('Large egg', 1)
     ])
  ];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        // this.recipes.splice(index, 1, newRecipe);
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
