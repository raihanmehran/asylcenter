import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css'],
})
export class TimepickerComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() label = 'Time';
  @Input() isMeridian = false;
  @Input() showSpinners = false;
  @Input() allowArrowKeys = true;
  myTime: Date = new Date();

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
