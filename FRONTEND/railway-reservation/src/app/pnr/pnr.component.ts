import { Component, OnInit } from '@angular/core';
import {FindtrainsService} from '../shared/findtrains.service';

@Component({
  selector: 'app-pnr',
  templateUrl: './pnr.component.html',
  styleUrls: ['./pnr.component.css']
})
export class PnrComponent implements OnInit {
  pnrResult:any;
  pnrno='';
  ifClick=false;
  ifEmpty=false;
  constructor(public findTrains:FindtrainsService) { }

  ngOnInit(): void {
  }

  checkPnr(pnr:any){
    this.findTrains.getPNR(pnr)
        .subscribe(
          (res)=>{
            console.log(res);
            this.pnrResult=res;
            console.log(this.pnrResult);
            this.ifClick=true;
            if(this.pnrResult===null){
              this.ifEmpty=true;
            }
            else{
              this.ifEmpty=false;
            }
          },(err)=>{
            console.log(err);
          }
        );
  }
}
