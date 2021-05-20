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
  selector: 'fury-requery-transactions',
  templateUrl: './requery-transactions.component.html',
  styleUrls: ['./requery-transactions.component.scss']
})
export class RequeryTransactionsComponent implements OnInit {

  loaders = {
    processing:false
  }
  constructor(@Inject(MAT_DIALOG_DATA) public transaction: any, 
  private dialogRef: MatDialogRef<RequeryTransactionsComponent>,
  private appService:AppService,
  private toastrService:ToastrService
  ){
      // console.log('DEFAULTS', this.transaction)
  
  }

  ngOnInit(): void {
  }


  confirmRequery = () =>{
    this.loaders.processing = true;
    const { merchantTransactionReference } = this.transaction;
    this.appService.confirmRequery({ merchantTransactionReference }).subscribe(
      (confirmResponse) => {
        this.loaders.processing = false;
        const { code, message } = confirmResponse;
        this.toastrService.info(message)
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
