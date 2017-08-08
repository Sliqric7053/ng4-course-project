import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<Recipe>();

  // @To-Do: Add loggerService to log the instantiation of each components

 recipes: Recipe[] = [
    new Recipe('Spicy Wrap', 'Try this casual hand-held-food entertaining idea, with..', 'https://www.spar.co.za/getattachment/5d2a2985-ee85-421a-8ae3-3488de83d49f/SPICY-WRAPS.aspx'),
    new Recipe('Eggs In Summer Sauce', 'An economical way to make use of protein-rich eggs..', 'https://www.spar.co.za/getattachment/5fa48ad2-da84-40b7-a810-3079ad42fa58/EGGS-IN-SUMMER-SAUCE.aspx'),
    new Recipe('Thai-Style Crab Balls', 'Crab sticks are used in this recipe to give you crab..', 'https://www.spar.co.za/getattachment/f2a1feca-b600-4fe9-b2ff-f5e30e1a49d5/THAI-STYLE-CRAB-BALLS.aspx')
  ];

  constructor() { }

  ngOnInit() {
  }

  selectedRecipeItem(el: Recipe) {
    this.itemSelected.emit(el);
    // console.log(el);
  }

}
