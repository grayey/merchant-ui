import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Inject,
} from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { AppService } from "src/services/app.service";
import { processErrors } from "src/utils/helpers";
import { fadeInRightAnimation } from "../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../@fury/animations/fade-in-up.animation";

@Component({
  selector: 'fury-refund-transactions',
  templateUrl: './refund-transactions.component.html',
  styleUrls: ['./refund-transactions.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class RefundTransactionsComponent implements OnInit {

  loaders = {
    processing:false
  }
  constructor(@Inject(MAT_DIALOG_DATA) public transaction: any, 
  private dialogRef: MatDialogRef<RefundTransactionsComponent>,
  private appService:AppService,
  private toastrService:ToastrService
  ){
      // console.log('DEFAULTS', this.transaction)
  
  }

  ngOnInit(): void {
  }
  confirmRefund = () =>{
    this.loaders.processing = true;
    const { merchantTransactionReference } = this.transaction;
    this.appService.confirmRefund({ merchantTransactionReference }).subscribe(
      (confirmResponse) =>{
        this.loaders.processing = false;
        this.toastrService.success(`Transaction sent for refund.`)
        this.closeDialog();
      },
      (error) =>{
    this.loaders.processing = false;
        this.toastrService.error(processErrors(error))
      }
    )

  }

  closeDialog = () =>{
    this.dialogRef.close();
  }
}
