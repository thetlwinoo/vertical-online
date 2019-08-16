import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootPipesModule } from '@root/pipes';
import { ResourceSharedLibsModule } from './shared-libs.module';
import { ResourceSharedCommonModule } from './shared-common.module';
import { RootDirectivesModule } from '@root/directives/directives';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductBoxComponent } from './components/products/product-box/product-box.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';

import { JhiLoginModalComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ResourceSharedCommonModule,
        ResourceSharedLibsModule,
        RootDirectivesModule,
        RootPipesModule
    ],
    declarations: [
        ProductBoxComponent,
        ProductCardComponent,
        JhiLoginModalComponent
    ],
    entryComponents: [JhiLoginModalComponent],
    providers: [],
    exports: [
        CommonModule,
        FlexLayoutModule,
        ResourceSharedCommonModule,
        RootDirectivesModule,
        RootPipesModule,
        ProductBoxComponent,
        ProductCardComponent,
        JhiLoginModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RootSharedModule {
}
