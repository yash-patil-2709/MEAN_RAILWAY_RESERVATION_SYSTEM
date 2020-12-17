import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  mumbai:string='assets/images/mumbai.jpg';
  delhi:string='assets/images/delhi.jpg';
  bengal:string='assets/images/bengal.jpg';
  andhra:string='assets/images/andhra.jpg';
  lucknow:string='assets/images/lucknow.jpg';
  kanpur:string='assets/images/kanpur.jpg';
  goa:string='assets/images/goa.jpg';
  nagpur:string='assets/images/nagpur.jpg';
  jaisalmer:string='assets/images/jaisalmer.jpg';
  
  constructor() { }

  ngOnInit(): void {
  }

}
