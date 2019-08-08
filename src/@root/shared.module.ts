import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootPipesModule } from '@root/pipes/pipes.module';
import { ResourceSharedLibsModule } from './shared-libs.module';
import { ResourceSharedCommonModule } from './shared-common.module';

@NgModule({
    imports: [
        CommonModule,
        ResourceSharedCommonModule,
        ResourceSharedLibsModule,
        RootPipesModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    exports: [
        CommonModule,
        ResourceSharedCommonModule,
        RootPipesModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RootSharedModule {
}
