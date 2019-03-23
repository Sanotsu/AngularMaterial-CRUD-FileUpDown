import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/_page/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', children: [
      {
        path: '',
        loadChildren: './_router/login/login.module#LoginModule'
      }
    ]
  },
  {
    path: 'material',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './_router/material-demo/material-demo.module#MaterialDemoModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
