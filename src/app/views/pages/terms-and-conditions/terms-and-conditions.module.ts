import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Terms & Conditions',
    },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [TermsAndConditionsComponent],
  exports: [RouterModule],
})
export class TermsAndConditionsModule {}
