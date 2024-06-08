import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaBookingUiComponent } from './usa-booking-ui.component';

describe('UsaBookingUiComponent', () => {
  let component: UsaBookingUiComponent;
  let fixture: ComponentFixture<UsaBookingUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsaBookingUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsaBookingUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
