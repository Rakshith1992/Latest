import { Component } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { ProcessedDataService } from './processed-data.service';
//import {DataTableComponent} from '../data-table/data-table.component';
import { readFile, read} from 'xlsx';
import { from } from 'rxjs';
//import { readFileSync } from 'fs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ProcessedDataService]
})
export class AppComponent  {
  name = 'Angular';
  processedData : any;
  temp= []
  //jsonData: any;
  //file:any;
  //csvData: any;
  //processedData: any
  //process =  new ProcessedDataService()
  //uploadDocument();
  

  // this.process.uploadDocument(this.file);
constructor (private dataService: ProcessedDataService){
}

ngOnInit(){
  
}

arrayBuffer:any;
file:File;
incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  }

  upload() {
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          workbook.Sheets.Sheet1.A1.w = 'Expense'
          workbook.Sheets.Sheet1.C1.w = 'Tax'
          workbook.Sheets.Sheet1.B1.w = workbook.Sheets.Sheet1.B1.w.trim()
          //console.log(workbook.Sheets.Sheet1.B1.w)
          var first_sheet_name = workbook.SheetNames[0];
          //console.log(first_sheet_name)
          var worksheet = workbook.Sheets[first_sheet_name];
          //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
          this.processedData = XLSX.utils.sheet_to_json(worksheet);
          this.processedData.forEach(item => {
            this.temp.push(item);
          });
      }
      fileReader.readAsArrayBuffer(this.file);
      //console.log(this.temp.sort())
      //console.log(this.temp.sort(this.sortByProperty('Amount')))

      
}

sortByProperty(property){  
  return function(a,b){  
     if(a[property] > b[property])  
        return 1;  
     else if(a[property] < b[property])  
        return -1;  
 
     return 0;  
  }  
}

















 /* fileChanged(e) {
  console.log(e.target)
  this.file = e.target.files[0];
  var reader = new FileReader();
  let workbook
  reader.onload = function(e) {
    console.log(reader.result)
    // var data = new Uint8Array(reader.result);
    //workbook = read(reader.result, {type: 'array'});
    
  //   /* DO SOMETHING WITH workbook HERE */
 // };
  //console.log(workbook)
  //reader.readAsArrayBuffer(f);
  
//}
// uploadDocument(file) {
//   let fileReader = new FileReader();
//   let csvData;
//   fileReader.onload = (e) => {
//     console.log(fileReader.result);
//     csvData = fileReader.result;
//     return csvData
//     // this.jsonData = this.csvJSON(csvData);
//     // console.log("Data converted to JSON" + this.jsonData);
//   }
//   // fileReader.readAsText(this.file);
// }

//processFile() {
  //console.log(this.file)
  //const wb = readFile(this.file);
  //console.log(wb)
  
  //let fileReader = new FileReader();
  // //let csvData;
  //fileReader.onloadend = (e) => {
    // console.log(fileReader.result);
  //   this.csvData = fileReader.result;
  //   //return csvData
   //}
  //const csvData = this.uploadDocument(this.file)
  //console.log(this.csvData)
  //this.processedData = this.process.csvJSON(wb)
  //console.log(this.processedData)
//} 
 
}
