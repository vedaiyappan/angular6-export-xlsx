import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ExcelService } from './services/excel.service';
import {DataDSService} from "./data-ds.service";
import {HttpClientModule} from "@angular/common/http";
import { Test1Component } from './test1/test1.component';
import {Test1Service} from "./test1.service";
import {PaginationModule} from "ngx-bootstrap";

@NgModule({
  imports:      [ BrowserModule, FormsModule , HttpClientModule ,
    PaginationModule.forRoot(),
  ],
  declarations: [ AppComponent, HelloComponent, Test1Component ],
  bootstrap:    [ AppComponent ],
  providers: [ExcelService ,DataDSService, Test1Service]
})
export class AppModule { }
