import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './Api';
import { AuthService } from './auth.service';
import { UsaBooking } from '../models/usa-booking.model';

const API  = BASE_URL+"/api";
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private deliveryManId!:string;

  private _bookingData:Array<Booking> = [];
  private _bookings: BehaviorSubject<Array<Booking>> = new BehaviorSubject<Array<Booking>>([]);
  public readonly bookings: Observable<Array<Booking>> = this._bookings.asObservable();

  private _usaBookingData:Array<UsaBooking> = [];
  private _usaBookings: BehaviorSubject<Array<UsaBooking>> = new BehaviorSubject<Array<UsaBooking>>([]);
  public readonly usaBookings: Observable<Array<UsaBooking>> = this._usaBookings.asObservable();

  constructor(private http:HttpClient, private authService:AuthService,) {
    this.setDeliveryManId(localStorage.getItem("id")|| '');
    this.loadAllBookings(this.deliveryManId);
   }

   setDeliveryManId(deliveryManId:string){
    this.deliveryManId = deliveryManId;
   }




  loadAllBookings(deliveryManId:string)
  {


      if(this.authService.isMmDelivery()){
        this.http.get<Booking[]>(API+"/delivery-man-status/"+deliveryManId)
        .subscribe(bookings=>{
          this._bookingData = bookings;
          this.emitChange();
        });
      }else{

        this.http.get<UsaBooking[]>(API+"/usa-delivery-man-status")
        .subscribe(usaBookings=>{
          this._usaBookingData = usaBookings;
          this.usaEmitChange();
        });

      }
  }

  getDeliveryManId()
  {
    return this.deliveryManId;
  }

  private emitChange() {
    this._bookings.next(this._bookingData);
  }

  private usaEmitChange() {
    this._usaBookings.next(this._usaBookingData);
  }

  getBookingById(id:number)
  {
    return this._bookingData.find(booking=>booking.id==id);
  }

  getUsaBookingById(id:number)
  {
    return this._usaBookingData.find(booking=>booking.id==id);
  }

  changeState(booking:Booking){
    this.http.put<Booking>(API+"/delivery-man-status/"+booking.id,booking).subscribe((book:any)=>{

      this.loadAllBookings(this.deliveryManId);
    });

  }

  usaChangeState(booking:UsaBooking){
    this.http.put<UsaBooking>(API+"/usa-delivery-man-status/"+booking.id,booking).subscribe((book:any)=>{

      this.loadAllBookings(this.deliveryManId);
    });

  }

  getBookingByBookingNumber(bookingNumber:string){

    return this.http.get<Booking>(API+"/delivery-man-statu/"+bookingNumber);

  }

  getUsaBookingByBookingNumber(bookingNumber:string){

    return this.http.get<UsaBooking>(API+"/usa-delivery-man-statu/"+bookingNumber);

  }

}
