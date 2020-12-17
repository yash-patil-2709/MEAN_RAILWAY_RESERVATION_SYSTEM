import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl="http://localhost:5555/user"
  private _loginUrl="http://localhost:5555/user/login"
  private _adminUrl="http://localhost:7070/admin/login"

  constructor(private http:HttpClient,private _router:Router) { }

  registerUser(user: {}){
    return this.http.post<any>(this._registerUrl,user)
  }

  loginUser(user: {}){
    return this.http.post<any>(this._loginUrl,user)
  }

  loginAdmin(admin: {}){
    return this.http.post<any>(this._adminUrl,admin)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
