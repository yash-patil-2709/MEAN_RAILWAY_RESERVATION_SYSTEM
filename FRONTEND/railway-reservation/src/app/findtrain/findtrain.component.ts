import { Component, OnInit } from '@angular/core';
import {FindtrainsService} from '../shared/findtrains.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-findtrain',
  templateUrl: './findtrain.component.html',
  styleUrls: ['./findtrain.component.css']
})
export class FindtrainComponent implements OnInit {
   // trainResult=[];
   trainResult:any;
  constructor(public findTrains:FindtrainsService,private route:ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    const source=this.route.snapshot.paramMap.get('source');
    const destination=this.route.snapshot.paramMap.get('destination');

    this.findTrains.findTrain(source,destination)
        .subscribe(
          (res)=>{
            console.log(res);
            this.trainResult=res;
            if(this.trainResult.length==0){
              alert('No trains found');
              this._router.navigate(['/booking']);
            }
          },(err)=>{
            console.log(err);
          }
        );
  }

  bookNow(tr:any){
    this._router.navigate(['/bookTrain',tr.trainname])
  }


}
