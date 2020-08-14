import { NgModule } from '@angular/core';
import { ResourceSharedLibsModule } from './shared-libs.module';
import { VSPanelComponent } from './components/panel/panel.component';
import { VSPanelListComponent } from './components/panel-list/panel-list.component';
import { VSAddressesUpdateComponent } from './components/addresses-update/addresses-update.component';

export const VS_COMPONENTS = [VSPanelComponent, VSPanelListComponent, VSAddressesUpdateComponent];

@NgModule({
  imports: [ResourceSharedLibsModule],
  declarations: [...VS_COMPONENTS],
  providers: [],
  exports: [ResourceSharedLibsModule, ...VS_COMPONENTS],
  entryComponents: [VSAddressesUpdateComponent],
})
export class RootSharedModule {}
