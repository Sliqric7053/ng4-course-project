import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as jsPDF from 'jsPDF';

import { Subscription } from 'rxjs/Rx';

import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions';

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

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

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
      // this.shoppingListService.updateIngredient(this.itemEditedIndex, newIngredient);
      this.store.dispatch(new shoppingListActions.UpdateIngredient({index: this.itemEditedIndex, ingredient: newIngredient}));
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
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
    // this.shoppingListService.deleteIngredient(this.itemEditedIndex);
    this.store.dispatch(new shoppingListActions.DeleteIngredient(this.itemEditedIndex));
    this.onClear();
  }

  onDownload() {
    const doc = new jsPDF();
    const elementHandler = {
      '#ignorePDF': function (element, renderer) {
        return true;
      }
    };
    doc.setTextColor(100);
    const source = window.document.getElementsByTagName('body')[0];
    doc.fromHTML(
      source,
      15,
      15,
      {
        'elementHandlers': elementHandler
      });
      doc.save('Recipe-list.pdf');
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
