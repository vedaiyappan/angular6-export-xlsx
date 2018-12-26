import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
import * as ExcelProper from 'ExcelJS'
import * as Excel from 'exceljs/dist/exceljs.min.js'
// import {Cell} from "ExcelJS";
// import *
//node_modules/exceljs/dist/exceljs.js

//https://www.youtube.com/watch?v=D8zBkHIqooI&t=329s
//npm install --save exceljs

// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class Test1Service {
name:string;
sName:string;
fileName:string;
excelFileName:string;
footer:string="@2018 sampl solutions ritghs reserved.";
blobType:string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
cols = ["column1","column2","column3","column4","column5"];
  datatest = [
    {col1: "a1",col2: "b1",col3: "c1",col4: "d1",col5: "e1"},
    {col1: "a2",col2: "b2",col3: "c2",col4: "d2",col5: "e2"},
    {col1: "a3",col2: "b3",col3: "c3",col4: "d3",col5: "e3"},
    {col1: "a4",col2: "b4",col3: "c4",col4: "d4",col5: "e4"},
    {col1: "a5",col2: "b5",col3: "c5",col4: "d5",col5: "e5"}];

  // colArray:any =[];
  colArray = [];

  constructor() {
    this.sName ='SheetTest';
    this.excelFileName ='TestExcelExport.xlsx';
}

  applyRowStyle(sheet) {
    sheet.eachRow(function (row, rowNumber) {
      if (rowNumber > 3) {
        row.eachCell({includeEmpty: true}, function (cell, colNumber) {
          sheet.getCell(cell.address.toString()).alignment = {wrapText: true, vertical: 'middle', horizontal: 'centre'};
          sheet.getCell(cell.address.toString()).border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'}
          };
          sheet.getCell(cell.address.toString()).font = {
            name: 'Tahoma',
            family: 2,
            size: 8
          };
        })
      }

    });
    return sheet;
  }
exportToExcel(data : any){

    console.log('toexcel server --- 22 data ', data);

    var workbook = new Excel.Workbook();
    workbook.creator ='Web';
    workbook.lastModifiedBy ='Web';
    workbook.created =new Date();
    workbook.modified =new Date();
    workbook.addWorksheet(this.sName,{views:[{state:'frozen',ySplit:3,xSplit:2,activeCell:'A1',showGridLines:false }]});
    var sheet = workbook.getWorksheet(1);
    var data1 = ["Exported Data"];
    sheet.addRow(data1);
    sheet.addRow("");

    // console.log('col count',data.length)
    //    //-----------------------
    var column;
    // let header = JSON.parse(data);
    // console.log('col column header----',header.toString());

    var locCols = [];
    var colNames= [];
    var FirstRow = data[0];
    for (var key in FirstRow) {
        if (FirstRow.hasOwnProperty(key)) {
            locCols.push({key: key});
            if(key === 'eid')
                colNames.push('selva');
            else
                colNames.push(key);

        }
    }
    console.log('colNames--',colNames);
    // for (var i = 1, j = data.length; i < j; i++) {
    //     var val = data[i][column];
    //     console.log('col column 2----',val);
    // }

    //-----------------------

    // sheet.getRow(3).values = this.cols;
    sheet.getRow(3).values = colNames;
    sheet.columns=locCols;
    // sheet.columns = [
    //   {key: 'eid'},
    //   {key: 'ename'},
    //   {key: 'esal'},
    //   {key: 'esal1'},
    //   {key: 'esal2'},
    // ];
    this.colArray = ['A3','B3','C3','D3','E3'];
    sheet.addRows(data);
    // console.log('data?????????????????',data)
    sheet=this.applyRowStyle(sheet);
    sheet.getCell('A1','A2').font={
      name:'Tahoma',
      family:2,
      size:18
    };
    this.colArray.map(key =>  {
    sheet.getCell(key).fill={
      type:'gradient',
      gradient:'angle',
      degree:0,
      stops:[
        {position:0,color:{argb:'d9f1fa'}},
        {position:0.5,color:{argb:'d9f1fa'}},
        {position:1,color:{argb:'d9f1fa'}}
      ]
    };
    sheet.getCell(key).alignment={wrapText:true,vertical:'middle',horizontal:'centre'};
    sheet.getCell(key).border={right:{style:'thin'},top:{style:'thin'}};
    sheet.getCell(key).font={
      name:'Tahoma',
      family:2,
      size:8,
      bold:true
    };
  });
    sheet.addRow([this.footer]);
    workbook.xlsx.writeBuffer().then(data => {
      var blob =new Blob([data],{type:this.blobType});
      FileSaver.saveAs(blob,this.excelFileName,true);
    });
 }
}
