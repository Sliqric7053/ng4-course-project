import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2015/03/24/00/28/cuisine-686905_960_720.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
