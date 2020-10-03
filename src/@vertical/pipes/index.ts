import { NgModule } from '@angular/core';

import { EllipsisPipe } from './ellipsis.pipe';
import { SafePipe } from './safe.pipe';
import { WebImagesPipe } from './web-images.pipe';

export const PIPES = [SafePipe, EllipsisPipe, WebImagesPipe];

@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class RootPipesModule {}
