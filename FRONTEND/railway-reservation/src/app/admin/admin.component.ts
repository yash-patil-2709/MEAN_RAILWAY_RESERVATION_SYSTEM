import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {AdminService} from '../shared/admin.service';
declare var M:any;
import {Router} from '@angular/router';

import {Admin} from '../shared/admin.model';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[AdminService]
})
export class AdminComponent implements OnInit {

  private isEdit=false;

  constructor(public adminService:AdminService, private route:Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshAdminList();
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.adminService.selectedAdmin={
        _id: "",
        trainno:0,
        trainname:"",
        source:"",
        destination:"",
        seatavail:0,
        depttime:"",
        arrivename:"",
        fare:0,
      }
    }
  }

  onSubmit(form: NgForm){
    if(!this.isEdit){
    this.adminService.postAdmin(form.value).subscribe((res)=>{
        console.log("testing");
        this.resetForm(form);
        this.refreshAdminList();
        M.toast({html:"Saved successfully",classes:"rounded"});

      },(err)=>{
        console.log(err);
      });
    }
    else{
      this.adminService.putAdmin(form.value).subscribe((res)=>{
          this.resetForm(form);
          this.refreshAdminList();
          this.isEdit=false;
          M.toast({html:"Updated successfully",classes:"rounded"});
        },(err)=>{
          console.log(err);
        });
    }
  }

  refreshAdminList(){
    this.adminService.getAdminList().subscribe((res)=>{
      this.adminService.admins=res as Admin[];
    })
  }

  onEdit(ad:Admin){
    this.isEdit=true;
    this.adminService.selectedAdmin=ad;
  }

  onDelete(trainname:string,form:NgForm){
    if(confirm('Are you sure want to delete the train?')==true){
      this.adminService.deleteAdmin(trainname).subscribe((res)=>{
        this.refreshAdminList();
        this.resetForm(form);
        M.toast({html:"Deleted successfully",classes:"rounded"});
      })
    }
  }


  viewAllBookings(){
    this.route.navigate(['/allBookings']);
  }
}
