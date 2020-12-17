import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import {FindtrainsService} from '../shared/findtrains.service';
declare var M:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError=false;
  errorMsg1='';
  errorMsg2='';
  loginUserData={
    username:'',
    password:''
  };
  submitted=false;
  constructor(private _auth:AuthService, private _router:Router,public findTrains:FindtrainsService) { }

  ngOnInit(): void {
  }

  loginUser(){
    // console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res=>{
          console.log(res);
          var tokenObj={
            token:res.token,
            uid:res.uid
          }
          this.findTrains.uid=res.uid;
        localStorage.setItem('token',JSON.stringify(tokenObj));
        this._router.navigate(['/']);
        M.toast({html:"Logged In successfully",classes:"rounded"});
      },
        err=>{
          console.log(err);
          this.isLoginError=true;
          console.log(this.isLoginError);
          this.errorMsg1=err.error.errors.username;
          this.errorMsg2=err.error.errors.password;
          this.ngOnInit();
        }
      )
  }

}
