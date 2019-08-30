import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@root/shared.module';

import {
    ActionNotificationComponent,
    AlertComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent
} from './content/crud';
import { ProductBoxComponent, ProductCardComponent } from './products';

@NgModule({
    declarations: [
        ActionNotificationComponent,
        AlertComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        ProductBoxComponent,
        ProductCardComponent
    ],
    exports: [
        ActionNotificationComponent,
        AlertComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        ProductBoxComponent,
        ProductCardComponent
    ],
    imports: [
        RootSharedModule,
        RouterModule
    ],
    entryComponents: [
        ActionNotificationComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent
    ],
})
export class PartialsModule {
}