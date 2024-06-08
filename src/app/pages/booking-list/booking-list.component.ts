import { Component } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { BookingUiComponent } from '../../component/booking-ui/booking-ui.component';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,

    BookingUiComponent,
  ],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {

  public page = 1;
  public pageSize = 10;

  bookings:Array<Booking> = [];

  constructor(private bookingService:BookingService){

    this.bookingService.bookings.subscribe(
      bookings=>{

        this.bookings = bookings;

      }
    );
  }

}
