import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorModuleComponent } from './sensor-module.component';

describe('SensorModuleComponent', () => {
  let component: SensorModuleComponent;
  let fixture: ComponentFixture<SensorModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
