import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Findtrains} from '../shared/findtrains.model';

@Injectable({
  providedIn: 'root'
})
export class FindtrainsService {
  uid = '';
  trains:Findtrains[]=[];
  pnr:any;


    passName: '';
    passNo: '';


  private getURL="http://localhost:2222/booking";

  private getURLtrain="http://localhost:2222/b";

  private postBookingURL="http://localhost:2222/booking";

  private viewBookingURL="http://localhost:2222/bookings";

  private deleteBookingURL="http://localhost:2222/cancelling";

  private getPnrURL="http://localhost:2222/booking";
  constructor(private http:HttpClient) { }

  // findTrain(tr:Findtrains){
  //   return this.http.get<any>(this.getURL+`/${tr.source}`+`/${tr.destination}`)
  // }

  findTrain(source: any,destination:any){
    return this.http.get<any>(this.getURL+`/${source}`+`/${destination}`)
  }

  findTrainByName(trainname:any){
    return this.http.get<any>(this.getURLtrain+`/${trainname}`)
  }

//post booking
  bookTicket(trains:any){
    console.log(this.uid);

    return this.http.post<any>(this.postBookingURL+`/${this.uid}`+`/${trains}`,trains);
  }

  //view booking
  viewYourBooking(){
    return this.http.get<any>(this.viewBookingURL+`/${this.uid}`);
  }

  deleteYourBooking(pnr:any){
    return this.http.delete<any>(this.deleteBookingURL+`/${pnr}`)
  }

  getPNR(pnr:any){
    return this.http.get<any>(this.getPnrURL+`/${pnr}`)
  }

}
