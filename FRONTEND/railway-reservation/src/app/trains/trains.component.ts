import { Component, OnInit } from '@angular/core';
import {FindtrainsService} from '../shared/findtrains.service';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {
  submitted=false;
  name='';
  ifClick=false;
  ifEmpty=false;
  trainResultName:any;
  constructor(public findTrains:FindtrainsService) { }

  ngOnInit(): void {
  }

  search(trainname:any){

    this.findTrains.findTrainByName(trainname)
        .subscribe(
          (res)=>{
            console.log(res);
            this.trainResultName=res;
            console.log(this.trainResultName);
            this.ifClick=true;
            if(this.trainResultName.length==0){
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
