import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import {FindtrainsService} from '../shared/findtrains.service';
import {Router} from '@angular/router';

// import {Findtrains} from '../shared/findtrains.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers:[FindtrainsService]
})
export class BookingComponent implements OnInit {
  options1: string[] = ['Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata','Pune','Delhi','Darbhanga','Kankavli'];
  options2: string[] = ['Delhi', 'Pune', 'Mumbai','Darbhanga','Bangalore','Hyderabad','Kolkata','Chennai','Kankavli'];
  bookImg:string='assets/images/booktrain.JPG';
  trainSearch={
    source:'',
    destination:''
  }
  isSearchError= false;
  trainResult:any;
  isTrainFound=true;
  constructor(public findTrains:FindtrainsService,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:any){


    if(form.source === form.destination){
      this.isSearchError = true;
      console.log(this.isSearchError);

    }
    else{
      this.findTrains.findTrain(form.source,form.destination)
          .subscribe(
            (res)=>{
              console.log(res);
              this.trainResult=res;
              if(this.trainResult.length==0){
                this.isTrainFound=false;
                // this.route.navigate(['/booking']);
              }
              else{
                this.route.navigate(['/findTrain',form.source,form.destination]);
              }
            },(err)=>{
              console.log(err);
            }
          );

    }
    // this.findTrains.findTrain(form)
    //     .subscribe(
    //       res=>{
    //         console.log(res)
    //         this.route.navigate(['/findTrain',form.value.source,form.value.destination])
    //       }
    //     )
  }
  swap(source: string, des: string){
    this.trainSearch.destination = source;
    this.trainSearch.source = des;
  }

}
