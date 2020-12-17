import { Component, OnInit } from '@angular/core';
import {FindtrainsService} from '../shared/findtrains.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { Findtrains } from '../shared/findtrains.model';
declare var M:any;

@Component({
  selector: 'app-view-cancel-booking',
  templateUrl: './view-cancel-booking.component.html',
  styleUrls: ['./view-cancel-booking.component.css']
})
export class ViewCancelBookingComponent implements OnInit {
  bookingResult:any;

  constructor(public findTrains:FindtrainsService,private route:ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    this.findTrains.viewYourBooking()
        .subscribe(
          (res)=>{
            console.log(res);
            this.bookingResult=res;
            // console.log(this.bookingResult[0].train.trainNo);

          },(err)=>{
            console.log(err);
          }
        );

        this.refreshBookingList();

  }

  refreshBookingList(){
    this.findTrains.viewYourBooking()
        .subscribe(
          (res)=>{
            console.log(res);
            this.bookingResult=res;
            // console.log(this.bookingResult[0].train.trainNo);

          },(err)=>{
            console.log(err);
          }
        );
  }

  cancel(pnr:any){
    if(confirm('Are you sure want to delete your booking?')==true){
      this.findTrains.deleteYourBooking(pnr).subscribe((res)=>{
        this.refreshBookingList();
        M.toast({html:"Deleted successfully",classes:"rounded"});
      })
    }
  }

  view(trainname:any){
    this._router.navigate(['/ticketgen',trainname]);
  }


}
