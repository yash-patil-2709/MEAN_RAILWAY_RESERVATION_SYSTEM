import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { from } from 'rxjs';

import {Admin} from './admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedAdmin: Admin = new Admin;
  admins: Admin[];

  private baseURL="http://localhost:7070/admin/trains";

  private putURL="http://localhost:7070/admin";
  private deleteURL='http://localhost:7070/admin';

  private adminViewAllBookings="http://localhost:7070/admin/bookings";

  constructor(private http:HttpClient) { }

  postAdmin(ad: Admin){
    return this.http.post<any>(this.baseURL,ad);
  }



  getAdminList(){
    return this.http.get<any>(this.baseURL);
  }

  putAdmin(ad:Admin){
    return this.http.put<any>(this.putURL+`/${ad._id}`,ad);
  }

  deleteAdmin(trainname:any){
    return this.http.delete<any>(this.deleteURL+`/${trainname}`)
  }

  getAllBookings(){
    return this.http.get<any>(this.adminViewAllBookings);
  }
}
