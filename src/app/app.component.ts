import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './component/logout/logout.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgxScannerQrcodeModule,

    BookingListComponent,
    LogoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parcel-x-delivery-man-app';
   role:any = "";

  constructor(public authService:AuthService) {

  }


  ngOnInit()
  {

    this.authService.loadToken();
    if( localStorage.getItem("role")!=''&&localStorage.getItem("role")!=null){
        this.role = localStorage.getItem("role");
    }
  }
}
