import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
declare var M:any;

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  isLoginError=false;
  errorMsg1='';
  errorMsg2='';
  submitted=false;

  loginAdminData={
    adminname:'',
    password:''
  };
  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit(): void {
  }

  loginAdmin(){
    // console.log(this.loginUserData);
    this._auth.loginAdmin(this.loginAdminData)
      .subscribe(
        res=>{
          console.log(res)
        localStorage.setItem('token',res.token)
        this._router.navigate(['/adminedit']);
        M.toast({html:"Logged In successfully",classes:"rounded"});
      },
        err=>{
          console.log(err);
          this.isLoginError=true;
          console.log(this.isLoginError);
          this.errorMsg1=err.error.errors.adminname;
          this.errorMsg2=err.error.errors.password;
          this.ngOnInit();
        }
      )
  }
}
