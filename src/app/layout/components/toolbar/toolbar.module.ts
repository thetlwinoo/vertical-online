import { NgModule } from '@angular/core';
import { RootSharedModule } from '@root/shared.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    RootSharedModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
