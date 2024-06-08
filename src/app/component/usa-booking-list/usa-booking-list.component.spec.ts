import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaBookingListComponent } from './usa-booking-list.component';

describe('UsaBookingListComponent', () => {
  let component: UsaBookingListComponent;
  let fixture: ComponentFixture<UsaBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsaBookingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsaBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
