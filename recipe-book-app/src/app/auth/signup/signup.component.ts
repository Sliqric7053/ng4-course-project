import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms/src/directives';

import { Store } from '@ngrx/store';
import * as fromApp from '../../app-store/app.reducers';
import * as AuthActions from '../auth-store/auth.actions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TrySignUp({ username: email, password: password }));

    this.store.select('userAuth').subscribe(user => {
      if (user.authenticated) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}
