import { Component } from '@angular/core';
import { UsaBooking } from '../../models/usa-booking.model';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UsaBookingUiComponent } from '../usa-booking-ui/usa-booking-ui.component';

@Component({
  selector: 'app-usa-booking-list',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,


    UsaBookingUiComponent
  ],
  templateUrl: './usa-booking-list.component.html',
  styleUrl: './usa-booking-list.component.css'
})
export class UsaBookingListComponent {
  public page = 1;
  public pageSize = 10;

  usaBookings:Array<UsaBooking> = [];

  constructor(private bookingService:BookingService){

    this.bookingService.usaBookings.subscribe(
      bookings=>{

        this.usaBookings = bookings;

       


      }
    );
  }
}
