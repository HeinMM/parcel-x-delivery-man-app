import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaBookingDetailComponent } from './usa-booking-detail.component';

describe('UsaBookingDetailComponent', () => {
  let component: UsaBookingDetailComponent;
  let fixture: ComponentFixture<UsaBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsaBookingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsaBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
