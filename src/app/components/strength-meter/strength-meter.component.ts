import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-strength-meter',
  templateUrl: './strength-meter.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass]
})
export class StrengthMeterComponent implements OnChanges {
  @Input() strength: number = 0;
  strengthLabel: string = '';
  strengthClass: 'bg-green-500' | 'bg-yellow-500' | 'bg-red-500' | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['strength'].currentValue) {
      this.calculateStrengthClass(this.strength);
    }
  }

  calculateStrengthClass(strength: number) {
    if (strength <= 2) {
      this.strengthClass = 'bg-red-500';
      this.strengthLabel = 'Weak';
    } else if (strength <= 4) {
      this.strengthClass = 'bg-yellow-500';
      this.strengthLabel = 'Medium';
    } else {
      this.strengthClass = 'bg-green-500';
      this.strengthLabel = 'Strong';
    }
  }
}
