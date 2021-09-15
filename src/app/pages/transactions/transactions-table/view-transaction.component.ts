import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
    OnInit,
    Inject,
  } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { fadeInRightAnimation } from "../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../@fury/animations/fade-in-up.animation";


@Component({
    selector: "view-transactions",
    templateUrl: "./view-transaction.component.html",
    styleUrls: ["./view-transaction.component.scss"],
    animations: [fadeInRightAnimation, fadeInUpAnimation],
  })
export class ViewTransactionComponent implements OnInit{
  
  
    constructor(@Inject(MAT_DIALOG_DATA) public transaction: any, private dialogRef: MatDialogRef<ViewTransactionComponent>,){}
  
    ngOnInit ():void {}

    public printTransaction(containerId) {
      
        document.getElementById('print_button').remove()
        const mywindow = window.open('', 'PRINT', 'height=400,width=600');
        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title  + '</h1>');
        mywindow.document.write(document.getElementById(containerId).innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        mywindow.close();
        return true;

      }
  
  }