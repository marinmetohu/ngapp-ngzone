import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { App1Component } from './app.component';


@NgModule({
  declarations: [
    App1Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [App1Component]
})
export class App1Module { }
