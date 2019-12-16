import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterylistComponent } from './batterylist.component';

describe('BatterylistComponent', () => {
  let component: BatterylistComponent;
  let fixture: ComponentFixture<BatterylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatterylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatterylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
