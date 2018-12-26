import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data1 } from './data1';
import {map} from "rxjs/operators";

@Injectable({

  providedIn: 'root'
})
export class DataDSService {

  URL: string = 'http://localhost:5001/toExcle';

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient
        .get<any>(this.URL)
        .pipe(map(data => data));
  }
}

