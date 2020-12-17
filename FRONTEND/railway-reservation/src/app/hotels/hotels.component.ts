import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  h1:string='assets/images/h1.jpg';
  h2:string='assets/images/h2.jpg';
  h3:string='assets/images/h3.jpg';
  h4:string='assets/images/h4.jpg';
  h5:string='assets/images/h5.jpg';
  h6:string='assets/images/h6.jpg';
  h7:string='assets/images/h7.jpg';
  h8:string='assets/images/h8.jpg';
  h9:string='assets/images/h9.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
