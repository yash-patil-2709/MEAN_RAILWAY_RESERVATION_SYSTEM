import { Component, OnInit } from '@angular/core';
import * as printJS from 'print-js';
import {FindtrainsService} from '../shared/findtrains.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-ticketgen',
  templateUrl: './ticketgen.component.html',
  styleUrls: ['./ticketgen.component.css']
})
export class TicketgenComponent implements OnInit {
  trainResultName:any={};

  constructor(public findTrains:FindtrainsService,private route:ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    const trainname=this.route.snapshot.paramMap.get('trainname');

    this.findTrains.findTrainByName(trainname)
        .subscribe(
          (res)=>{
            console.log(res);
            this.trainResultName=res;
            console.log(this.trainResultName);
          },(err)=>{
            console.log(err);
          }
        );
  }

  print(){
    printJS({
       printable: 'printJS-form',
        type: 'html',
        targetStyles: ['*']
      });
  }
}
