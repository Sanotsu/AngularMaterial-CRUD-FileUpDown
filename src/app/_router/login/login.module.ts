import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from 'src/app/_page/login-page/login-page.component';

import {
  MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSliderModule
} from '@angular/material';
import { ModalModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ModalModule,
    MatSliderModule
  ],
  declarations: [
    LoginPageComponent
  ],
  exports: [
    RouterModule
  ]
})
export class LoginModule { }
