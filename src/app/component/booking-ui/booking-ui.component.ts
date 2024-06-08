import { Component, Input } from '@angular/core';
import { Booking } from '../../models/booking.model';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'tr[app-booking-ui]',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './booking-ui.component.html',
  styleUrl: './booking-ui.component.css'
})
export class BookingUiComponent {
  @Input()
  booking!:Booking;

  constructor(private router:Router,private bookingService:BookingService) {
  }

  gotoBookingDetail(){
    this.router.navigate(['/booking-details',this.booking.id]);
  }
}
