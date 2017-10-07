import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms/src/directives';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(username, password);
  }

}
