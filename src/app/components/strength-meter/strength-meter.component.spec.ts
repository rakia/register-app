import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrengthMeterComponent } from './strength-meter.component';
import { SimpleChanges } from '@angular/core';

describe('StrengthMeterComponent', () => {
  let component: StrengthMeterComponent;
  let fixture: ComponentFixture<StrengthMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrengthMeterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StrengthMeterComponent);
    component = fixture.componentInstance;
  });

  it('should create the StrengthMeter component', () => {
    const fixture = TestBed.createComponent(StrengthMeterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set "bg-red-500" and "Weak" for strength <= 2', () => {
    const changes: SimpleChanges = {
      strength: {
        currentValue: 2,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    };

    component.ngOnChanges(changes);

    expect(component.strengthClass).toBe('bg-red-500');
    expect(component.strengthLabel).toBe('Weak');
  });

  it('should set "bg-yellow-500" and "Medium" for strength <= 4 and > 2', () => {
    const changes: SimpleChanges = {
      strength: {
        currentValue: 3,
        previousValue: 2,
        firstChange: false,
        isFirstChange: () => false,
      },
    };

    component.ngOnChanges(changes);

    expect(component.strengthClass).toBe('bg-yellow-500');
    expect(component.strengthLabel).toBe('Medium');
  });

  it('should set "bg-green-500" and "Strong" for strength > 4', () => {
    jest.spyOn(component, 'calculateStrengthClass');
    const changes: SimpleChanges = {
      strength: {
        currentValue: 5,
        previousValue: 3,
        firstChange: false,
        isFirstChange: () => false,
      },
    };
    component.ngOnChanges(changes);

    expect(component.calculateStrengthClass).toHaveBeenCalled();
    expect(component.strengthClass).toBe('bg-green-500');
    expect(component.strengthLabel).toBe('Strong');
  });

  it('should not call calculateStrengthClass if strength is not in changes', () => {
    jest.spyOn(component, 'calculateStrengthClass');
    const changes: SimpleChanges = {
      otherProperty: {
        currentValue: 'test',
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    component.ngOnChanges(changes);

    expect(component.calculateStrengthClass).not.toHaveBeenCalled();
  });
});
