import './vendor.ts';
import 'bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgrxModule } from 'app/ngrx/ngrx.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from 'app/layout/layout.module';
import { RootSharedModule } from '@root/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    NgrxModule,
    RootSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
