import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootSharedModule } from '@eps/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';

@NgModule({
  declarations: [DashboardComponent, SidebarContentComponent],
  imports: [CommonModule, RootSharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
