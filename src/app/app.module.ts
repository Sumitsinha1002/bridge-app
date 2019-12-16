import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {
  MatPaginatorModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { SchoolComponent } from './school/school.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BatterylistComponent } from './batterylist/batterylist.component';


@NgModule({
  declarations: [
    AppComponent,
    SchoolComponent,
    BatterylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
