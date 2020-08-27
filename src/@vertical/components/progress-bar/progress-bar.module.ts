import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RootProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [RootProgressBarComponent],
  imports: [CommonModule, RouterModule, MatProgressBarModule],
  exports: [RootProgressBarComponent],
})
export class RootProgressBarModule {}
