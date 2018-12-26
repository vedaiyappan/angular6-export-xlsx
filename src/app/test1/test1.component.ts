import { Component, OnInit } from '@angular/core';
import {Test1Service} from "../test1.service";
import {DataDSService} from "../data-ds.service";
import {Data1} from "../data1";

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  // name:string;
  // sName:string;
  // fileName:string;
  // excelFileName:string;
  // footer:string="@2018 sampl solutions ritghs reserved.";
  // blobType:string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // cols=["column1","column2","column3","column4","column5"];
  // data = [
  //   {col1: "a1",col2: "b1",col3: "c1",col4: "d1",col5: "e1"},
  //   {col1: "a2",col2: "b2",col3: "c2",col4: "d2",col5: "e2"},
  //   {col1: "a3",col2: "b3",col3: "c3",col4: "d3",col5: "e3"},
  //   {col1: "a4",col2: "b4",col3: "c4",col4: "d4",col5: "e4"},
  //   {col1: "a5",col2: "b5",col3: "c5",col4: "d5",col5: "e5"}];

  blogPosts : Data1[];
    collection = [];
  constructor(private test1Service:Test1Service ,private dataDSService: DataDSService) {

      for (let i = 1; i <= 100; i++) {
          this.collection.push(`item ${i}`);
      }
  }

  ngOnInit() {
      this.dataDSService.getData()
          .subscribe((data : any)  => {
              this.blogPosts  = data;
              console.log('toexcel server --- 11 ', this.blogPosts);
          });
  }

  exportAsXLSX() {

    // this.dataDSService.getData()
    //     .subscribe((data : any)  => {
    //       this.blogPosts  = data;
    //       console.log('toexcel server --- 1 ', this.blogPosts);
    //     });
    // console.log('local --- 1 -1 ', this.data);

    this.test1Service.exportToExcel(this.blogPosts);
  }

  }
