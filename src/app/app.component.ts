import {Component, OnInit} from '@angular/core';
import {ExcelService} from './services/excel.service';
import {DataDSService} from "./data-ds.service";
import {Data1} from "./data1";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular 6';
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000,
    esal1: 1000

  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000,
    esal1: 1000

  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000,
    esal1: 3000
  }];

  // testdata : [];
  // testdata:  [];

  blogPosts : Data1[];
  // blogPosts: any ={};


  constructor(private excelService:ExcelService , private dataDSService: DataDSService){

  }
    ngOnInit() {
        // this.dataDSService.getData()
        //     .subscribe((data: any) => {
        //         this.blogPosts = data;
        //         console.log('toexcel server --- 1 ', this.blogPosts);
        //         // this.excelService.exportAsExcelFile(this.blogPosts , 'sample');
        //
        //     });
    }

  exportAsXLSX():void {
// debugger
//       this.dataDSService.getData()
//           .subscribe((data: any) => {
//               this.blogPosts = data;
//               console.log('toexcel server --- 1 ', this.blogPosts);
//               // this.excelService.exportAsExcelFile(this.blogPosts , 'sample');
//
//           });
      // console.log('local --- 1 -1 ', this.data);
    //   if (this.blogPosts.length > 0)
    //   {
    //       console.log('count',this.blogPosts.length)
    //       this.excelService.exportAsExcelFile(this.blogPosts, 'sample');
    // }
  }


  // getStudent() {
  //   this.dataDSService.getData()
  //       .subscribe(rdata => {
  //         this.testdata  = rdata;
  //       console.log('toexcel', rdata);
  //   });
  // }

  // public getEmployees() {
  //   this._employeeService.getEmployees()
  //       .subscribe((data: Employee[]) => {
  //         this.employees = data;
  //         console.log(data);
  //       });
  // }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    // var array = objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
  download(){
    // var myJsonString = JSON.stringify(this.blogPosts);
    // var json1 = this.blogPosts;

    this.dataDSService.getData()
        .subscribe((data: any ) => {
          this.blogPosts  = data;
          console.log('toexcel server --- 1 ', this.blogPosts);
        });
    console.log('local --- 1 -1 ', this.data);

    var csvData = this.ConvertToCSV(this.blogPosts);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'User_Results.csv';/* your file name*/
    a.click();
    return 'success';
  }
}
