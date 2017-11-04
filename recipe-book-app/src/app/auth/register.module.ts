import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RegistrRoutingModule } from './registery-routing.module';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
    imports: [
        FormsModule,
        RegistrRoutingModule
    ],
    exports: [],
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    providers: [],
})
export class RegisterModule { }
