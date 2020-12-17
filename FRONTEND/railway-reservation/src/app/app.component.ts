import { Component } from '@angular/core';
import { AuthService} from './auth.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RAILWAY RESERVATION SYSTEM';

  constructor(public _authService:AuthService) {}
}
