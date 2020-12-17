import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
declare var M:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoginError=false;
  errorMsg='';

  registerUserData={
    username:'',
    password:'',
    fname:'',
    mname:'',
    lname:'',
    dob:'',
    phone:'',
    flatno:'',
    societyname:'',
    pincode:'',
    city:'',
    state:'',
    country:'India'
  };
  submitted=false;

  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){

    // console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res=>{
          console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/login']);
        M.toast({html:"Registered successfully. Check your text messages.",classes:"rounded"});

      },
        err=>{
          console.log(err);
          this.isLoginError=true;
          console.log(this.isLoginError);
          this.errorMsg=err.error.errors.username;
          this.ngOnInit();
        }
      )
  }
}
