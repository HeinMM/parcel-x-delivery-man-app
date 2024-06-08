import { Component, Input } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { log } from 'console';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent {
  @Input() id!:number;
  bookingDetail?: Booking;
  bookings:Array<Booking> = [];

  currentState:number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookingService:BookingService,
    private router:Router
  ) {
    this.bookingService.bookings.subscribe(
      bookings=>{
        console.log(bookings);

        this.bookings = bookings;
        this.bookingDetail = this.bookings.find(booking=>booking.id==this.id);


        this.bookingCurrentState(this.bookingDetail);
      }
    );
  }


  ngOnInit(){
    this.bookingService.loadAllBookings( this.bookingService.getDeliveryManId());
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      //console.log('Test ID:', this.id);

    });

    console.log("deliver id ----> "+this.id);


      let data:any = this.bookingService.getBookingById(this.id) ;

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

  bookingCurrentState(booking?: Booking){
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

  nextStateForRoad(booking?:Booking){
    let json:any = booking;
    json.status_id = 3;
    console.log("JSON => "+json.status_id);
    this.bookingService.changeState(json);
  }

  nextStateForComplete(booking?:Booking){
    let json:any = booking;
    json.status_id = 4;
    console.log("JSON => "+json.status_id);
    this.bookingService.changeState(json);
    this.router.navigate(['/booking-list']);
  }



}
