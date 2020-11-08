import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataBindingModule } from './data-binding/data-binding.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DataBindingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
