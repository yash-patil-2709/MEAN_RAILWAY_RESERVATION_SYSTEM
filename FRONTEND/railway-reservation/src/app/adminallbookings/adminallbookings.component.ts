import { Component, OnInit } from '@angular/core';
import {FindtrainsService} from '../shared/findtrains.service';
import {AdminService} from '../shared/admin.service';

@Component({
  selector: 'app-adminallbookings',
  templateUrl: './adminallbookings.component.html',
  styleUrls: ['./adminallbookings.component.css']
})
export class AdminallbookingsComponent implements OnInit {
  bookingResult:any;

  constructor(public findTrains:FindtrainsService,public adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllBookings()
      .subscribe(
        (res)=>{
          console.log(res);
          this.bookingResult=res;
        },(err)=>{
          console.log(err);
        }
      );
  }

}
