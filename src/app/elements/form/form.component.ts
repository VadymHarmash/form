import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StrengthCheckService } from '../shared/services/strength-check.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  constructor(
    private strengthCheckService: StrengthCheckService,
    private formBuilder: FormBuilder
  ) { }

  public form!: FormGroup
  public password: FormControl = new FormControl('')
  public currentMessage!: string

  private _subscription!: Subscription

  ngOnInit(): void {
    this.buildForm()
    this._subscription = this.password.valueChanges.subscribe((value: string) => {
      this.strengthCheckService.checkStrength(value)
      this.currentMessage = this.strengthCheckService.showMessage(this.currentMessage)
    })
  }

  public buildForm(): void {
    this.form = this.formBuilder.group({
      password: this.password
    })
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
