import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@eps/shared.module';

import {
    ActionNotificationComponent,
    AlertComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent
} from './content/crud';
import { ProductBoxComponent, ProductCardComponent, GhostItemComponent } from './products';


@NgModule({
    declarations: [
        ActionNotificationComponent,
        AlertComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        ProductBoxComponent,
        ProductCardComponent,
        GhostItemComponent
    ],
    exports: [
        ActionNotificationComponent,
        AlertComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        ProductBoxComponent,
        ProductCardComponent,
        GhostItemComponent
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