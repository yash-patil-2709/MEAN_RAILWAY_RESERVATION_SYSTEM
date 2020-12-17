import { BrowserModule } from '@angular/platform-browser';
 import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './auth.service';
import { AuthGuard } from './auth.guard';
import { TrainsComponent } from './trains/trains.component';
import { PlacesComponent } from './places/places.component';
import { HotelsComponent } from './hotels/hotels.component';
import { ContactComponent } from './contact/contact.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { TrainService } from './train.service';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';
import { FindtrainComponent } from './findtrain/findtrain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingPassengerComponent } from './booking-passenger/booking-passenger.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { ViewCancelBookingComponent } from './view-cancel-booking/view-cancel-booking.component';
import { PnrComponent } from './pnr/pnr.component';
import { AdminallbookingsComponent } from './adminallbookings/adminallbookings.component';
import { TicketgenComponent } from './ticketgen/ticketgen.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminloginComponent,
    TrainsComponent,
    PlacesComponent,
    HotelsComponent,
    ContactComponent,
    AdminComponent,
    BookingComponent,
    FindtrainComponent,
    BookingPassengerComponent,
    DialogExampleComponent,
    ViewCancelBookingComponent,
    PnrComponent,
    AdminallbookingsComponent,
    TicketgenComponent
  ],
  entryComponents:[DialogExampleComponent],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  providers: [AuthService,AuthGuard, TrainService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
