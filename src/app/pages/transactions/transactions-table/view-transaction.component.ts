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
  
  
    constructor(@Inject(MAT_DIALOG_DATA) public transaction: any, private dialogRef: MatDialogRef<ViewTransactionComponent>,){
  
    }
  
    ngOnInit ():void {
  
      console.log('DEFAULTS', this.transaction)
  
    }
  
  }