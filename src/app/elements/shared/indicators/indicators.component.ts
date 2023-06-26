import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StrengthCheckService } from '../services/strength-check.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit, OnDestroy {
  constructor(private strengthCheckService: StrengthCheckService) { }

  public indicatorColors: string[] = ['#999999', '#999999', '#999999']

  private _subscription!: Subscription

  @Input() valueControl!: FormControl

  ngOnInit(): void {
    this._subscription = this.valueControl.valueChanges.subscribe(() => {
      this.indicatorColors = this.strengthCheckService.changeIndicators(this.indicatorColors)
    })
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
