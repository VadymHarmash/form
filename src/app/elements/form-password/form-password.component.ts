import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPasswordComponent),
      multi: true
    }
  ]
})
export class FormPasswordComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() passwordInput: FormControl = new FormControl('')

  public password: string = '';

  private _subscription!: Subscription
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (fn: any) => void = () => { };

  ngOnInit() {
    if (this.onChangeCallback) {
      this.onChangeCallback(this.password)
    }
  }

  get value(): string {
    return this.password;
  }

  set value(val: string) {
    if (val !== this.password) {
      this.password = val;
      this.onChangeCallback(val);
    }
  }

  writeValue(value: any) {
    if (value !== this.password) {
      this.password = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe()
  }
}
