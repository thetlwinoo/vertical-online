import { NgModule } from '@angular/core';
import { RootSharedModule } from '@eps/shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

@NgModule({
  declarations: [FooterComponent],
  imports: [RootSharedModule, RouterModule, NgxTwitterTimelineModule],
  exports: [FooterComponent],
})
export class FooterModule {}
