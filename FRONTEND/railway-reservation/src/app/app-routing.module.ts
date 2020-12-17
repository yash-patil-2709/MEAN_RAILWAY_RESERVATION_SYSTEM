import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LoginComponent } from './login/login.component';
import { PlacesComponent } from './places/places.component';
import { RegisterComponent } from './register/register.component';
import { TrainsComponent } from './trains/trains.component';
import {AdminComponent} from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';
import { FindtrainComponent } from './findtrain/findtrain.component';
import { BookingPassengerComponent } from './booking-passenger/booking-passenger.component';
import { ViewCancelBookingComponent } from './view-cancel-booking/view-cancel-booking.component';
import { PnrComponent } from './pnr/pnr.component';
import { AdminallbookingsComponent } from './adminallbookings/adminallbookings.component';
import { TicketgenComponent } from './ticketgen/ticketgen.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/booking',
    pathMatch:'full'
  },

  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'register',
    component:RegisterComponent
  },

  {
    path:'admin',
    component:AdminloginComponent
  },

  {
    path:'trains',
    component:TrainsComponent
  },

  {
    path:'places',
    component:PlacesComponent
  },

  {
    path:'hotels',
    component:HotelsComponent
  },

  {
    path:'contact',
    component:ContactComponent
  },

  {
    path:'adminedit',
    component:AdminComponent
  },

  {
    path:'booking',
    component:BookingComponent
  },

  // {
  //   path:'findtrain',
  //   component:FindtrainComponent
  // },

  {
    path:'findTrain/:source/:destination',
    component:FindtrainComponent,
    canActivate:[AuthGuard]
  },

  {
    path:'bookTrain/:trainname',
    component:BookingPassengerComponent
  },

  {
    path:'myBookings',
    component:ViewCancelBookingComponent,
    canActivate:[AuthGuard]
  },

  {
    path:'pnr',
    component:PnrComponent,
    canActivate:[AuthGuard]
  },

  {
    path:'allBookings',
    component:AdminallbookingsComponent
  },

  {
    path:'ticketgen/:trainname',
    component:TicketgenComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
