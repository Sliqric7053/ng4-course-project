import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NgForm } from '@angular/forms/src/directives';

import * as fromApp from '../../app-store/app.reducers';
import * as AuthActions from '../auth-store/auth.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TrySignIn({ username: email, password: password }));

    this.store.select('userAuth').subscribe(user => {
      if (user.authenticated) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}
