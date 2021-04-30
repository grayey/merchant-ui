import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'fury-secure-redirect',
  templateUrl: './secure-redirect.component.html',
  styleUrls: ['./secure-redirect.component.scss']
})
export class SecureRedirectComponent implements OnInit {

  showError:boolean = false;
  errorMessage = "AN UNKNOWN ERROR OCCURRED. PLEASE RETRY OR CONTACT YOUR BANK.";
  private status:string;
  private transactionId:string

  constructor(
    private appService: AppService,
    private activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.queryParams.subscribe((param)=>{
      const { status, transactionId } = param;
      this.status = status;
      this.transactionId = transactionId;
      if(status && transactionId && status=="AUTHORIZED"){
        this.getSecureRedirect(transactionId);
      }else{
        this.showError = true;
      }
      console.log({ param })
    })
  }

  ngOnInit(): void {
  }



  getSecureRedirect = (transactionId) =>{
    
    this.appService.getSecureRedirect(transactionId).subscribe(
      (redirectResponse) =>{
        console.log({ redirectResponse })
        if(redirectResponse.code=="00"){
          const { webhookUrl } = redirectResponse.data;
          const url = `${webhookUrl}?transactionId=${this.transactionId}&status=${this.status}`;
          window.location.href = url;
        }
        else{
          this.showError = true;
          this.errorMessage = redirectResponse.message;
        } 
      },
      (error) =>{
        this.showError = true;
       
      }
    )
  }

}
