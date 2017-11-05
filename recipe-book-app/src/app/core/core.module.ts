import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from 'app/app-routing.module';

import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    declarations: [
        HeaderComponent,
        HomepageComponent
    ],
    providers: [],
})
export class CoreModule { }
