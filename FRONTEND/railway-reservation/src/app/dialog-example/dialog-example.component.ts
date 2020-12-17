import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  viewBooking(){

    this._router.navigate(['/myBookings']);
  }
}
