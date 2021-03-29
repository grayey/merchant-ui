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

@Component({
  selector: 'fury-uploads-detail',
  templateUrl: './uploads-detail.component.html',
  styleUrls: ['./uploads-detail.component.scss']
})
export class UploadsDetailComponent implements OnInit {
  

  public tableHeaders;
  public uploadContent:any;
  constructor(@Inject(MAT_DIALOG_DATA) public uploadRow: any, private dialogRef: MatDialogRef<UploadsDetailComponent>, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.transformContent();
  }



  private transformContent = () =>{
    try{
      this.uploadContent = JSON.parse(this.uploadRow?.content);
      this.tableHeaders = Object.keys(this.uploadContent[0]).filter((key) => key !=='id');
    }catch(e){
      this.toastrService.error('Invalid content!');
      this.dialogRef.close();
    }

  }

}
