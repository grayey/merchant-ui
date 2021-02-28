import { Component, OnInit } from "@angular/core";
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { RefundsService } from "../../../services/refunds/refunds.service";


@Component({
    selector: 'app-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    animations: [fadeInUpAnimation]
  })
export class RefundsComponent implements OnInit {


    public allRefunds:any[] = [];

    constructor(private refundService:RefundsService){

    }

    ngOnInit = () =>{

    }

    /**]
     * This methods gets a list of all refunded transactions
     */
    public getAllRefunds = async () => {
        
        this.refundService.getAllRefunds().subscribe(
            (refundsResponse)=>{
                console.log({ refundsResponse })
        },
        (error)=>{

        })


    }
}