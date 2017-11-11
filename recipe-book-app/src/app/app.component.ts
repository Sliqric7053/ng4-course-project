import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  onFeatureSelected(selectedFeature: string) {
    this.loadedFeature = selectedFeature;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCjCkqsUDVksYb5WBfcBmZRAVVCxqPjLms',
      authDomain: 'ng4-recipe-book-3d9d9.firebaseapp.com',
    });
  }
}
