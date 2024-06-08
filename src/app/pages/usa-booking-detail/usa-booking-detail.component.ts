import { Component, Input } from '@angular/core';
import { UsaBooking } from '../../models/usa-booking.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-usa-booking-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './usa-booking-detail.component.html',
  styleUrl: './usa-booking-detail.component.css'
})
export class UsaBookingDetailComponent {
  @Input() id!:number;
  bookingDetail?: UsaBooking;
  bookings:Array<UsaBooking> = [];

  currentState:number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookingService:BookingService,
    private router:Router
  ) {
    this.bookingService.usaBookings.subscribe(
      bookings=>{

        this.bookings = bookings;
        this.bookingDetail = this.bookings.find(booking=>booking.id==this.id);


        this.bookingCurrentState(this.bookingDetail);
      }
    );
  }


  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      //console.log('Test ID:', this.id);

    });

      let data:any = this.bookingService.getUsaBookingById(this.id) ;

        if(data){
          console.log("Do some thing");
          this.bookingDetail = data;
          this.bookingCurrentState(this.bookingDetail);
        }else{
          console.log("Data eapty Do some thing");
        }

  }

  onCheck(){
    console.log("id:",this.id);
  }

  bookingCurrentState(booking?: UsaBooking){
    if (booking?.assign_at==null && booking?.road_at==null && booking?.complete_at==null) {
      // console.log("state 1 booking state");
      this.currentState = 1;
    }
    if (booking?.assign_at!==null && booking?.road_at==null && booking?.complete_at==null) {
      //console.log("state 2 assign sate");
      this.currentState = 2;
    }
    if (booking?.assign_at!==null && booking?.road_at!==null && booking?.complete_at==null) {
      //console.log("state 3 road state");
      this.currentState = 3;
    }

    if (booking?.assign_at!==null && booking?.road_at!==null && booking?.complete_at!==null) {
      //console.log("state 4 complete state");
      this.currentState = 4;
    }
  }

  nextStateForAssign(booking?:UsaBooking){
    let json:any = booking;
    this.bookingService.usaChangeState(json);
  }

  nextStateForRoad(booking?:UsaBooking){
    let json:any = booking;
    this.bookingService.usaChangeState(json);
  }

  nextStateForComplete(booking?:UsaBooking){
    let json:any = booking;
    this.bookingService.usaChangeState(json);
    this.router.navigate(['/usa-booking-list']);
  }
}
