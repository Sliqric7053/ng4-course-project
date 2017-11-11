import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
    imports: [],
    exports: [
        DropdownDirective,
        CommonModule
    ],
    declarations: [
        DropdownDirective,
    ],
    providers: [],
})
export class SharedModule { }
