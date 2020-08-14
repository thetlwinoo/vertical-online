import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import {
    MyProfileComponent,
    myProfileRoute
} from './';

const ENTITY_STATES = [...myProfileRoute];

@NgModule({
    imports: [
        RootSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MyProfileComponent
    ],
    entryComponents: [
        MyProfileComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyProfileModule{}