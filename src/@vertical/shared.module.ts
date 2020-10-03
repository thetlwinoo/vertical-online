import { NgModule } from '@angular/core';
import { ResourceSharedLibsModule } from './shared-libs.module';
import { VSPanelComponent } from './components/panel/panel.component';
import { VSPanelListComponent } from './components/panel-list/panel-list.component';
import { WebImagesPipe } from '@vertical/pipes/web-images.pipe';

const COMPONENTS = [VSPanelComponent, VSPanelListComponent];

@NgModule({
  imports: [ResourceSharedLibsModule],
  declarations: [...COMPONENTS],
  providers: [WebImagesPipe],
  exports: [ResourceSharedLibsModule, ...COMPONENTS],
  entryComponents: [],
})
export class RootSharedModule {}
