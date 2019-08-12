import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootSharedModule } from '@root/shared.module';
import { RootSidebarModule } from '@root/components/sidebar/sidebar.module';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarContentComponent
  ],
  imports: [
    CommonModule,    
    RootSharedModule,
    DashboardRoutingModule,
    RootSidebarModule,
  ]  
})
export class DashboardModule { }
