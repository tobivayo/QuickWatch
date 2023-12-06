import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ContentLayoutComponent,
    MatSnackBarModule
  ],
  providers: [MatSnackBarConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
