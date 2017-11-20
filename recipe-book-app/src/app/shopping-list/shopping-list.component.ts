import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{ingredients: Ingredient[]}>) { }

  ngOnInit() {
    // this.shoppingListState = this.store.select('shoppingList');
      }

      onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
      }

      ngOnDestroy() {
        this.subscription.unsubscribe();
      }
  }
