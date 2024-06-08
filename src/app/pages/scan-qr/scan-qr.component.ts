import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LOAD_WASM, NgxScannerQrcodeComponent, NgxScannerQrcodeModule, NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-scan-qr',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxScannerQrcodeModule,
    CommonModule,
  ],
  templateUrl: './scan-qr.component.html',
  styleUrl: './scan-qr.component.css',
})

export class ScanQrComponent implements AfterViewInit {

  isMmDelivery:boolean = false;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    },

  };

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  constructor(private bookingService:BookingService,private router:Router,private authService:AuthService){

  }

  ngOnInit(): void {
    this.isMmDelivery = this.authService.isMmDelivery();
  }

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      // this.handle(this.action, 'start');
    });
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  reloadDataForMm(result:any){
    console.log(result);
    let data = result.map(
      (item:any) => {
        return item.value
      }
    )
    let bookingNumber:string = data[0].substring(37)
    console.log("Booking Number ---->"+bookingNumber);

    this.bookingService.getBookingByBookingNumber(bookingNumber).subscribe(
      booking => {
        this.gotoBookingDetail(booking.id);
      }
    );
  }

  reloadDataForUsa(result:any){
    console.log(result);
    let data = result.map(
      (item:any) => {
        return item.value
      }
    )
    let bookingNumber:string = data[0].substring(37)
    console.log("Usa Booking Number ---->"+bookingNumber);

    this.bookingService.getUsaBookingByBookingNumber(bookingNumber).subscribe(
      {
        next: booking => {
        this.gotoBookingDetail(booking.id);
      },
      error: (error: any) => {
        console.log("There is no Data, Please Check Your Data");

      },

    }

    );
  }

  gotoBookingDetail(id:number){
    if (this.isMmDelivery) {
      this.router.navigate(['/booking-details',id]);
    }
    if (!this.isMmDelivery) {
      this.router.navigate(['/usa-booking-details',id]);
    }

  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // e && action && action.pause();
    console.log(e);
  }

}
