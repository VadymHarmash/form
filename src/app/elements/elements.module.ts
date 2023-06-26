import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
import { FormComponent } from './form/form.component';
import { ElementsComponent } from './elements.component';
import { FormPasswordComponent } from './form-password/form-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndicatorsComponent } from './shared/indicators/indicators.component';


@NgModule({
  declarations: [
    ElementsComponent,
    FormComponent,
    FormPasswordComponent,
    IndicatorsComponent
  ],
  imports: [
    CommonModule,
    ElementsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ElementsModule { }
