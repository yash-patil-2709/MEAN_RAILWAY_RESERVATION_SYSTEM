import { Component, OnInit } from '@angular/core';
import {FindtrainsService} from '../shared/findtrains.service';
import {ActivatedRoute, Router} from '@angular/router';
import { WindowRef } from '../window-ref.service';
import { AuthService } from '../auth.service';
import { NgZone } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';


@Component({
  selector: 'app-booking-passenger',
  templateUrl: './booking-passenger.component.html',
  styleUrls: ['./booking-passenger.component.css'],
  providers: [WindowRef]
})
export class BookingPassengerComponent implements OnInit {
  isEditable = false;
  trainResultName:any={};
  constructor(public findTrains:FindtrainsService,private route:ActivatedRoute,private _router:Router,private winRef: WindowRef,public _authService: AuthService,private zone: NgZone,public dialog:MatDialog) { }

  ngOnInit(): void {
    const trainname=this.route.snapshot.paramMap.get('trainname');

    this.findTrains.findTrainByName(trainname)
        .subscribe(
          (res)=>{
            console.log(res);
            this.trainResultName=res;
          },(err)=>{
            console.log(err);
          }
        );
  }

  passDetails:any= {
     passName: '',
     passNo: ''
  }

// totalFare:any=this.passDetails.passNo*this.trainResultName[0].fare;

  //booking method starts here
  onBookTicket(){
    var trains=this.trainResultName[0].trainname;
    console.log(trains);

    // let bookingObj={
    //   trains
    // }

    this.findTrains.bookTicket(trains)
      .subscribe(
        res=>{
          console.log(res);
          this.findTrains.pnr=res.pnr;

          //open dialog box
          // this.dialog.open(DialogExampleComponent);
        },
        err=>{
          console.log(err);

        }
      )
  }


  //payment method
  payWithRazor(){
    // console.log(this.passDetails.passNo);
    // console.log(this.trainResultName[0].fare);
    // console.log(this.totalFare);
      let options:any = {
          "key": "rzp_test_xImMUcn4IDz5l2",
          "amount":'',
          "name": "Indian Railways",
          "description": "Ticket Booking Payment",
          "modal": {
            "escape": false
          },
          "theme": {
            "color": "#663399"
          }
        };
        options.handler = ((response:any) => {
            console.log(response);
            this.zone.run(()=>{
              this.onBookTicket();
              //open dialog box
              this.dialog.open(DialogExampleComponent);
            // dialogRef.afterClosed().subscribe(result=>{
            //   console.log( `Dialog result:${result}`);

            })
        });
        options.amount=this.passDetails.passNo*this.trainResultName[0].fare*100;
        console.log(options.amount);
        options.modal.ondismiss = ((response:any) => {
            console.log(response);
        });
        let rzp = new this.winRef.nativeWindow.Razorpay(options);
        rzp.open();
    }


    store(passName:any,passNo:any){
      this.findTrains.passName=passName;
      this.findTrains.passNo=passNo;

      console.log(this.findTrains.passName);
    }
}
