import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsComponent } from './elements.component';
import { FormComponent } from './form/form.component';
import { FormPasswordComponent } from './form-password/form-password.component';

const routes: Routes = [
  {
    path: '',
    component: ElementsComponent,
    children: [
      {
        path: '',
        component: FormComponent,
        children: [
          { path: '', component: FormPasswordComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementsRoutingModule { }
