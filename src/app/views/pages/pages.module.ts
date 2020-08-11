import { NgModule } from '@angular/core';
import { DashboardModule } from 'app/views/pages/dashboard/dashboard.module';
import { TermsAndConditionsModule } from 'app/views/pages/terms-and-conditions/terms-and-conditions.module';

@NgModule({
  imports: [DashboardModule, TermsAndConditionsModule],
  declarations: [],
})
export class PagesModule {}
