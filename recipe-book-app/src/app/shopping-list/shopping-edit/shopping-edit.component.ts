import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editingMode = false;
  itemEditedIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.itemEditedIndex = index;
        this.editingMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editingMode === true) {
      this.shoppingListService.updateIngredient(this.itemEditedIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
     }
     this.editingMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset({
      'name': '',
      'amount': ''
    });
    this.editingMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.itemEditedIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
