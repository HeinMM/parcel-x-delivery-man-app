import { Component, Input } from '@angular/core';
import { UsaBooking } from '../../models/usa-booking.model';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tr[app-usa-booking-ui]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './usa-booking-ui.component.html',
  styleUrl: './usa-booking-ui.component.css'
})
export class UsaBookingUiComponent {
  @Input('usaBooking') usaBooking!:UsaBooking;

  constructor(private router:Router,private bookingService:BookingService) {
  }

  gotoBookingDetail(){
    this.router.navigate(['/usa-booking-details',this.usaBooking.id]);
  }
}
