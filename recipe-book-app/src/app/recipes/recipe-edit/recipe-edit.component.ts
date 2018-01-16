import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import * as fromRecipe from '../recipes-store/recipe.reducers';
import * as recipeActions from '../recipes-store/recipe.actions';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeState: Observable<fromRecipe.State>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.RecipesFeatureState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.recipeState = this.store.select('recipeFeature');
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new recipeActions.UpdateRecipe({index: this.id, updatedRecipe: this.recipeForm.value}));
    } else {
      this.store.dispatch(new recipeActions.AddRecipes(this.recipeForm.value));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ] )
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
     let recipeName = '';
     let recipeImagePath = '';
     let recipeDescription = '';
     const recipeIngredients = new FormArray([]);

     if (this.editMode) {
       this.recipeState
        .take(1)
          .subscribe((recipeState) => {
            const recipe = recipeState.recipes[this.id];
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            if (recipe['ingredients']) {
              for (const ingredient of recipe.ingredients) {
                recipeIngredients.push(
                  new FormGroup({
                    'name': new FormControl(ingredient.name, Validators.required),
                    'amount': new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                  })
                );
              }
            }
          });
     }

     this.recipeForm = new FormGroup({
       'name': new FormControl(recipeName, Validators.required),
       'recipeImagePath': new FormControl(recipeImagePath, Validators.required),
       'recipeDescription': new FormControl(recipeDescription, Validators.required),
       'ingredients': recipeIngredients
     });
  }
}
