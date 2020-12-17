import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  h1:string='assets/images/train.png';

  constructor() { }

  ngOnInit(): void {
  }

}
