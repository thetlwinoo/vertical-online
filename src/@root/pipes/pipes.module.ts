import { NgModule } from '@angular/core';

import { EllipsisPipe } from './ellipsis.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
    declarations: [
        EllipsisPipe,
        SafePipe
    ],
    imports: [],
    exports: [
        EllipsisPipe,
        SafePipe
    ]
})
export class RootPipesModule {
}
